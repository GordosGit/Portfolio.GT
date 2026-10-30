#!/usr/bin/env python3
"""Generate synthetic data for job-sync-watch.

Produces four files in --out:
  planner_jobs.json  what the planning system's API would return
  erp.db             SQLite stand-in for the ERP jobs table
  lookups.json       the ERP's valid lookup values (its master data)
  integration.log    the ERP-side loader log

Everything is invented. Two scenarios:
  messy  a realistic bad day: open rejects, a silent mismatch, a stuck job,
         and drafts that are about to fail
  clean  history has a few old rejects, all fixed; nothing open
"""
import argparse
import json
import random
import sqlite3
from collections import defaultdict
from datetime import datetime, timedelta
from pathlib import Path

LOOKUPS = {
    "customer_code": [f"C-{i:04d}" for i in range(1, 61)],
    "site_code": [f"S-{i:03d}" for i in range(1, 41)],
    "equipment_class": ["CRN-100T", "CRN-250T", "CRN-500T", "RIG-SPMT", "RIG-GANTRY", "HAUL-MULTI"],
    "cost_center": [f"CC-{1100 + 10 * i}" for i in range(10)],
}
# Typos people actually make. Customer has a small pool so some bad values recur.
BAD_VALUES = {
    "customer_code": ["C-0999", "C-0999", "C-0912"],
    "site_code": ["S-999", "S-310"],
    "equipment_class": ["CRN-250", "CRN-100", "CRANE-250T"],
    "cost_center": ["CC-1105", "CC-1999"],
}
FIELDS = list(LOOKUPS)
JOB_COLUMNS = ["job_id", *FIELDS, "start_date", "est_weight_t"]


def iso(t):
    return t.strftime("%Y-%m-%dT%H:%M:%S")


def ceil15(t):
    """The next 15-minute scheduler run at or after t (always moves forward)."""
    t = t.replace(second=0, microsecond=0)
    return t + timedelta(minutes=15 - t.minute % 15)


def floor15(t):
    t = t.replace(second=0, microsecond=0)
    return t - timedelta(minutes=t.minute % 15)


class World:
    def __init__(self, rng, now):
        self.rng, self.now = rng, now
        self.jobs, self.erp, self.log = [], {}, []
        self.batches = defaultdict(int)
        self.next_id = 10000

    def new_job(self, changed, status="Draft", **override):
        self.next_id += 1
        r = self.rng
        job = {
            "job_id": f"J-{self.next_id}",
            **{f: r.choice(LOOKUPS[f]) for f in FIELDS},
            "start_date": (changed + timedelta(days=r.randint(3, 40))).strftime("%Y-%m-%d"),
            "est_weight_t": round(r.uniform(5, 420), 1),
            "status": status,
            "status_changed_at": iso(changed),
        }
        job.update(override)
        self.jobs.append(job)
        return job

    def write_log(self, ts, level, job_id, kind, **kv):
        extra = "".join(f" {k}={v}" for k, v in kv.items())
        self.log.append((ts, f"{iso(ts)} {level} job={job_id} {kind}{extra}"))

    def send(self, job, sent, outcome, fix_prob=0.0):
        """Mark a job sent at `sent`, then play out what the ERP loader did."""
        job["status"] = "Sent to ERP"
        job["status_changed_at"] = iso(sent)
        self.batches[sent] += 1
        land = sent + timedelta(minutes=self.rng.randint(3, 10))
        if land > self.now:
            return  # consumer has not picked it up yet
        if outcome == "reject":
            bad = job["_bad"]
            self.write_log(land, "ERROR", job["job_id"], "lookup_not_found", field=bad, value=job[bad])
            if fix_prob and self.rng.random() < fix_prob:
                # Someone found it in the logs, fixed the value, reset the status
                fixed_at = sent + timedelta(hours=self.rng.randint(3, 20), minutes=self.rng.randint(0, 59))
                job[bad] = self.rng.choice(LOOKUPS[bad])
                job.pop("_bad")
                self.send(job, ceil15(fixed_at), "ok")
            return
        row = {c: job[c] for c in JOB_COLUMNS}
        if outcome == "mismatch":  # silent: loader shifts the date, logs success
            d = datetime.strptime(row["start_date"], "%Y-%m-%d") + timedelta(days=1)
            row["start_date"] = d.strftime("%Y-%m-%d")
        self.erp[job["job_id"]] = row
        self.write_log(land, "INFO", job["job_id"], "loaded")

    def corrupt(self, job, field):
        job[field] = self.rng.choice(BAD_VALUES[field])
        job["_bad"] = field


def build(scenario, now, seed, days):
    rng = random.Random(seed)
    w = World(rng, now)
    clean = scenario == "clean"

    # Background history: weekday jobs, mostly fine
    for offset in range(days, 0, -1):
        day = (now - timedelta(days=offset)).replace(hour=0, minute=0, second=0, microsecond=0)
        if day.weekday() >= 5:
            continue
        for _ in range(rng.randint(8, 15)):
            ready = day + timedelta(hours=rng.randint(7, 16), minutes=rng.randint(0, 59))
            sent = ceil15(ready)
            if sent > now - timedelta(hours=1):
                continue
            job = w.new_job(ready)
            age_days = (now - sent).total_seconds() / 86400
            roll = rng.random()
            if roll < 0.035 and (not clean or age_days > 4):
                w.corrupt(job, rng.choice(FIELDS))
                # old rejects usually get fixed by hand; clean scenario fixes all
                w.send(job, sent, "reject", fix_prob=1.0 if age_days > 1.5 else 0.0)
            elif roll > 0.97 and not clean and age_days < 3:
                w.send(job, sent, "mismatch")
            else:
                w.send(job, sent, "ok")

    if not clean:
        m = lambda n: now - timedelta(minutes=n)
        # Open rejects of different ages
        for mins, field in [(130, "customer_code"), (360, "cost_center"), (30 * 60, "site_code")]:
            job = w.new_job(m(mins + 60))
            w.corrupt(job, field)
            w.send(job, floor15(m(mins)), "reject")
        # Silent mismatch from yesterday
        w.send(w.new_job(m(20 * 60 + 60)), floor15(m(20 * 60)), "mismatch")
        # Marked ready 50 minutes ago, scheduler never picked it up
        w.new_job(m(50), status="Ready to Send")
        # Sent 4 minutes ago, consumer has not picked it up yet (normal)
        w.send(w.new_job(m(10)), floor15(m(4)), "ok")
        # Drafts and ready jobs that will fail if nobody looks
        job = w.new_job(m(10), status="Ready to Send"); job["equipment_class"] = "CRN-250"
        job = w.new_job(m(5), status="Ready to Send"); job["cost_center"] = ""
        job = w.new_job(m(90), status="Draft"); job["customer_code"] = " c-0042"
        job = w.new_job(m(40), status="Draft"); job["customer_code"] = "C-0999"
        w.new_job(m(25), status="Draft")  # a healthy draft
    else:
        w.new_job(now - timedelta(minutes=25), status="Draft")
        w.new_job(now - timedelta(minutes=8), status="Ready to Send")

    for sent, n in w.batches.items():
        if sent + timedelta(seconds=1) <= now:
            w.log.append((sent, f"{iso(sent + timedelta(seconds=1))} INFO batch file=jobs_{sent:%Y%m%d_%H%M}.csv rows={n}"))
    return w


def write(w, out):
    out = Path(out)
    out.mkdir(parents=True, exist_ok=True)
    jobs = sorted(w.jobs, key=lambda j: j["job_id"])
    clean_jobs = [{k: v for k, v in j.items() if not k.startswith("_")} for j in jobs]
    (out / "planner_jobs.json").write_text(json.dumps(clean_jobs, indent=1) + "\n")
    (out / "lookups.json").write_text(json.dumps(LOOKUPS, indent=1) + "\n")
    (out / "integration.log").write_text("\n".join(line for _, line in sorted(w.log, key=lambda x: x[1])) + "\n")
    db = out / "erp.db"
    db.unlink(missing_ok=True)
    con = sqlite3.connect(db)
    con.execute("CREATE TABLE jobs (job_id TEXT PRIMARY KEY, customer_code TEXT, site_code TEXT, "
                "equipment_class TEXT, cost_center TEXT, start_date TEXT, est_weight_t REAL)")
    con.executemany("INSERT INTO jobs VALUES (?,?,?,?,?,?,?)",
                    [tuple(r[c] for c in JOB_COLUMNS) for r in w.erp.values()])
    con.commit()
    con.close()


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--out", required=True)
    p.add_argument("--scenario", choices=["messy", "clean"], default="messy")
    p.add_argument("--now", default=iso(datetime.now().replace(microsecond=0)))
    p.add_argument("--seed", type=int, default=7)
    p.add_argument("--days", type=int, default=30)
    a = p.parse_args()
    w = build(a.scenario, datetime.fromisoformat(a.now), a.seed, a.days)
    write(w, a.out)
    print(f"{a.scenario}: {len(w.jobs)} planner jobs, {len(w.erp)} ERP rows -> {a.out}")


if __name__ == "__main__":
    main()
