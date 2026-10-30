"""Turn issues, risks and log history into what the dashboard shows."""
from collections import Counter
from dataclasses import asdict
from datetime import datetime, timedelta

from .reconcile import find_issues
from .risk import preflight

GREEN, AMBER, RED = "GREEN", "AMBER", "RED"
WINDOWS = [("Last 24 hours", 1), ("Last 7 days", 7), ("Last 30 days", 30)]


def period_totals(planner, events, now):
    rows = []
    for label, days in WINDOWS:
        start = now - timedelta(days=days)
        sent = sum(1 for j in planner if j["status"] == "Sent to ERP"
                   and datetime.fromisoformat(j["status_changed_at"]) >= start)
        loaded = sum(1 for e in events if e.kind == "loaded" and e.ts >= start)
        rejected = sum(1 for e in events if e.level == "ERROR" and e.ts >= start)
        processed = loaded + rejected
        rows.append({"label": label, "sent": sent, "loaded": loaded, "rejected": rejected,
                     "reject_rate_pct": round(100 * rejected / processed, 1) if processed else 0.0})
    return rows


def reject_trend(events, now):
    """Reject rate for the last 7 days vs the 7 days before that."""
    def rate(a, b):
        window = [e for e in events if now - timedelta(days=a) < e.ts <= now - timedelta(days=b)]
        bad = sum(1 for e in window if e.level == "ERROR")
        done = sum(1 for e in window if e.kind == "loaded") + bad
        return round(100 * bad / done, 1) if done else 0.0, bad
    (this, bad_now), (prev, _) = rate(7, 0), rate(14, 7)
    # A single reject is noise, so "rising" needs at least two this week
    direction = ("rising" if this - prev > 1 and bad_now >= 2
                 else "falling" if prev - this > 1 else "flat")
    return {"this_week_pct": this, "prev_week_pct": prev, "direction": direction}


def top_rejected_fields(events, now, days=30):
    cutoff = now - timedelta(days=days)
    return Counter(e.field for e in events if e.level == "ERROR" and e.field and e.ts >= cutoff).most_common()


def traffic_light(issues, risks, totals, cfg):
    reds, ambers = [], []
    n = len(issues)
    oldest = max((i.age_hours for i in issues), default=0)
    rate7 = totals[1]["reject_rate_pct"]
    if n >= cfg["red_open_issues"]:
        reds.append(f"{n} open issues (red at {cfg['red_open_issues']})")
    if oldest >= cfg["red_oldest_issue_hours"]:
        reds.append(f"oldest open issue is {oldest:.0f} h old (red at {cfg['red_oldest_issue_hours']} h)")
    if rate7 >= cfg["red_reject_rate_pct"]:
        reds.append(f"7-day reject rate {rate7}% (red at {cfg['red_reject_rate_pct']}%)")
    if n:
        ambers.append(f"{n} open issue{'s' if n != 1 else ''}")
    if risks:
        ambers.append(f"{len(risks)} job{'s' if len(risks) != 1 else ''} likely to fail on the next send")
    if reds:
        return RED, reds + ambers
    if ambers:
        return AMBER, ambers
    return GREEN, ["No open issues, nothing at risk."]


def build_summary(planner, erp, events, lookups, now: datetime, cfg):
    issues = find_issues(planner, erp, events, lookups, now, cfg)
    risks = preflight(planner, events, lookups, now, cfg)
    totals = period_totals(planner, events, now)
    light, reasons = traffic_light(issues, risks, totals, cfg)
    pending = sum(1 for j in planner if j["status"] == "Sent to ERP"
                  and now - datetime.fromisoformat(j["status_changed_at"]) < timedelta(minutes=cfg["grace_minutes"]))
    counts = Counter(j["status"] for j in planner)
    return {
        "as_of": now.strftime("%Y-%m-%d %H:%M"),
        "light": light, "reasons": reasons,
        "issues": [asdict(i) for i in issues],
        "risks": [asdict(r) for r in risks],
        "totals": totals, "trend": reject_trend(events, now),
        "top_fields": top_rejected_fields(events, now),
        "pending": pending, "status_counts": dict(counts),
    }
