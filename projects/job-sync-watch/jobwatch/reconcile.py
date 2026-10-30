"""Find jobs where the planning system and the ERP disagree, and say why."""
from dataclasses import dataclass
from datetime import datetime, timedelta
from difflib import get_close_matches

NOT_LOADED = "NOT_LOADED"          # sent, past the grace window, not in the ERP
FIELD_MISMATCH = "FIELD_MISMATCH"  # in the ERP but a value differs
STUCK_READY = "STUCK_READY"        # "Ready to Send" for longer than the scheduler should allow


@dataclass
class Issue:
    job_id: str
    kind: str
    since: str          # ISO time the clock started (sent, or marked ready)
    age_hours: float
    detail: str
    cause: str
    suggested_fix: str


def same(a, b):
    """Compare values the way a person would: trim text, tolerate float noise."""
    try:
        return abs(float(a) - float(b)) < 0.01
    except (TypeError, ValueError):
        return str(a if a is not None else "").strip() == str(b if b is not None else "").strip()


def closest(value, valid):
    m = get_close_matches(str(value).strip().upper(), sorted(valid), n=1, cutoff=0.75)
    return m[0] if m else None


def _explain_reject(job, events, sent_at, lookups):
    """Latest ERROR for this job since it was last sent."""
    errs = [e for e in events if e.job_id == job["job_id"] and e.level == "ERROR" and e.ts >= sent_at]
    if not errs:
        return ("No loader error logged. The file may not have been picked up, or the "
                "loader failed before reading this row.",
                "Check the consumer job and the drop folder, then reset the status to 'Ready to Send'.")
    e = max(errs, key=lambda x: x.ts)
    if e.kind == "lookup_not_found":
        hint = closest(e.value, lookups.get(e.field, ()))
        fix = f"Correct {e.field} in the planner"
        fix += f" (closest valid value: {hint})" if hint else ""
        return (f"{e.field} '{e.value}' is not in the ERP master data.",
                fix + ", then reset the status to 'Ready to Send'.")
    return (f"Loader reported '{e.kind}'.", "Read the loader log for this job, fix the data, reset the status.")


def find_issues(planner, erp, events, lookups, now: datetime, cfg):
    grace = timedelta(minutes=cfg["grace_minutes"])
    stuck = timedelta(minutes=cfg["stuck_minutes"])
    cycle = cfg["scheduler_interval_minutes"]
    issues = []
    for job in planner:
        changed = datetime.fromisoformat(job["status_changed_at"])
        status = job["status"]
        if status == "Sent to ERP":
            if now - changed < grace:
                continue  # the consumer is asynchronous; give it time
            hrs = round((now - changed).total_seconds() / 3600, 1)
            row = erp.get(job["job_id"])
            if row is None:
                cause, fix = _explain_reject(job, events, changed, lookups)
                issues.append(Issue(job["job_id"], NOT_LOADED, job["status_changed_at"], hrs,
                                    "Marked 'Sent to ERP' but not in the ERP jobs table.", cause, fix))
                continue
            diffs = [f"{f}: planner '{job[f]}' vs ERP '{row.get(f)}'"
                     for f in cfg["compare_fields"] if not same(job.get(f), row.get(f))]
            if diffs:
                issues.append(Issue(job["job_id"], FIELD_MISMATCH, job["status_changed_at"], hrs,
                                    "; ".join(diffs),
                                    "Loaded without an error but the values differ. Likely a transform or mapping issue.",
                                    "Compare the CSV column mapping for these fields, then correct the ERP row or re-send."))
        elif status == "Ready to Send" and now - changed > stuck:
            mins = (now - changed).total_seconds() / 60
            issues.append(Issue(job["job_id"], STUCK_READY, job["status_changed_at"],
                                round(mins / 60, 3),
                                f"'Ready to Send' for {int(mins)} min; the scheduler has run about {int(mins // cycle)} times since.",
                                "The scheduled job did not pick this record up.",
                                "Check the scheduler run history and whether the record is locked or filtered out."))
    return sorted(issues, key=lambda i: -i.age_hours)
