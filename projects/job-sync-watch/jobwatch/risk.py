"""Pre-flight checks: which not-yet-sent jobs look likely to be rejected?

These are rules, not machine learning. They encode what the loader is known to
reject (blank required fields, lookup values that are not an exact match in the
ERP master data) and what has been rejected recently. Each rule says why.
"""
from collections import Counter
from dataclasses import dataclass
from datetime import datetime, timedelta

from .reconcile import closest

HIGH, MEDIUM = "HIGH", "MEDIUM"


@dataclass
class Risk:
    job_id: str
    status: str
    level: str
    reasons: list


def recent_rejects(events, now, days=30):
    """Counter of (field, value) -> times the loader rejected it in the window."""
    cutoff = now - timedelta(days=days)
    return Counter((e.field, e.value) for e in events
                   if e.level == "ERROR" and e.kind == "lookup_not_found" and e.ts >= cutoff)


def preflight(planner, events, lookups, now: datetime, cfg):
    history = recent_rejects(events, now)
    risks = []
    for job in planner:
        if job["status"] not in ("Draft", "Ready to Send"):
            continue
        reasons, level = [], None

        for f in cfg["required_fields"]:
            if str(job.get(f) if job.get(f) is not None else "").strip() == "":
                reasons.append(f"{f} is blank")
                level = HIGH

        for f in cfg["lookup_fields"]:
            v = job.get(f)
            if v is None or str(v).strip() == "" or v in lookups.get(f, ()):
                continue
            tidy = str(v).strip().upper()
            if tidy in lookups.get(f, ()):
                reasons.append(f"{f} '{v}' only matches after trimming/upper-casing ({tidy}); the ERP lookup is exact")
                level = level or MEDIUM
            else:
                hint = closest(v, lookups.get(f, ()))
                msg = f"{f} '{v}' is not in the ERP master data"
                msg += f" (closest: {hint})" if hint else ""
                reasons.append(msg)
                level = HIGH
            n = history.get((f, str(v)), 0)
            if n:
                reasons.append(f"this exact value was rejected {n}x in the last 30 days")

        if reasons:
            risks.append(Risk(job["job_id"], job["status"], level, reasons))
    # Ready jobs go out at the next scheduler run, so they come first
    order = {("Ready to Send", HIGH): 0, ("Ready to Send", MEDIUM): 1, ("Draft", HIGH): 2, ("Draft", MEDIUM): 3}
    return sorted(risks, key=lambda r: (order.get((r.status, r.level), 9), r.job_id))
