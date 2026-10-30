"""Small hand-built fixtures: each test sets up two or three jobs and checks one rule."""
import json
from datetime import datetime
from pathlib import Path

from jobwatch.loaders import LogEvent
from jobwatch.reconcile import FIELD_MISMATCH, NOT_LOADED, STUCK_READY, find_issues
from jobwatch.risk import HIGH, MEDIUM, preflight
from jobwatch.summary import AMBER, GREEN, RED, build_summary, reject_trend

CFG = json.loads((Path(__file__).parent.parent / "config.json").read_text())
NOW = datetime(2026, 10, 30, 9, 30)
LOOKUPS = {"customer_code": {"C-0001", "C-0042"}, "site_code": {"S-001"},
           "equipment_class": {"CRN-250T"}, "cost_center": {"CC-1100"}}


def job(job_id, status="Sent to ERP", changed="2026-10-30T07:00:00", **kw):
    base = {"job_id": job_id, "customer_code": "C-0001", "site_code": "S-001",
            "equipment_class": "CRN-250T", "cost_center": "CC-1100",
            "start_date": "2026-11-10", "est_weight_t": 100.0,
            "status": status, "status_changed_at": changed}
    return {**base, **kw}


def erp_row(j, **kw):
    return {**{k: j[k] for k in ("job_id", "customer_code", "site_code", "equipment_class",
                                  "cost_center", "start_date", "est_weight_t")}, **kw}


def test_matching_job_is_not_an_issue():
    j = job("J-1")
    assert find_issues([j], {"J-1": erp_row(j)}, [], LOOKUPS, NOW, CFG) == []


def test_recently_sent_job_gets_grace_period():
    j = job("J-1", changed="2026-10-30T09:10:00")  # 20 min ago, grace is 30
    assert find_issues([j], {}, [], LOOKUPS, NOW, CFG) == []


def test_missing_job_is_flagged_with_cause_and_closest_value():
    j = job("J-1", customer_code="C-0043")
    ev = [LogEvent(datetime(2026, 10, 30, 7, 5), "ERROR", "J-1", "lookup_not_found", "customer_code", "C-0043")]
    [i] = find_issues([j], {}, ev, LOOKUPS, NOW, CFG)
    assert i.kind == NOT_LOADED
    assert "C-0043" in i.cause
    assert "C-0042" in i.suggested_fix


def test_old_error_before_resend_is_ignored():
    j = job("J-1", changed="2026-10-30T08:00:00")
    ev = [LogEvent(datetime(2026, 10, 29, 12, 0), "ERROR", "J-1", "lookup_not_found", "site_code", "S-999")]
    [i] = find_issues([j], {}, ev, LOOKUPS, NOW, CFG)
    assert "No loader error logged" in i.cause


def test_silent_mismatch_is_flagged():
    j = job("J-1")
    [i] = find_issues([j], {"J-1": erp_row(j, start_date="2026-11-11")}, [], LOOKUPS, NOW, CFG)
    assert i.kind == FIELD_MISMATCH and "start_date" in i.detail


def test_whitespace_and_float_noise_are_not_mismatches():
    j = job("J-1")
    row = erp_row(j, customer_code="C-0001 ", est_weight_t=100.004)
    assert find_issues([j], {"J-1": row}, [], LOOKUPS, NOW, CFG) == []


def test_stuck_ready_job():
    [i] = find_issues([job("J-1", "Ready to Send", "2026-10-30T08:40:00")], {}, [], LOOKUPS, NOW, CFG)
    assert i.kind == STUCK_READY
    assert find_issues([job("J-2", "Ready to Send", "2026-10-30T09:20:00")], {}, [], LOOKUPS, NOW, CFG) == []


def test_preflight_levels():
    jobs = [job("J-1", "Draft"),
            job("J-2", "Ready to Send", site_code="S-999"),
            job("J-3", "Draft", customer_code=" c-0042"),
            job("J-4", "Ready to Send", cost_center=""),
            job("J-5", "Sent to ERP", site_code="S-999")]  # already sent: not a pre-flight concern
    risks = {r.job_id: r for r in preflight(jobs, [], LOOKUPS, NOW, CFG)}
    assert set(risks) == {"J-2", "J-3", "J-4"}
    assert risks["J-2"].level == HIGH and risks["J-4"].level == HIGH
    assert risks["J-3"].level == MEDIUM


def test_preflight_mentions_recurring_bad_value():
    ev = [LogEvent(datetime(2026, 10, 20, 9, 0), "ERROR", f"J-{n}", "lookup_not_found", "site_code", "S-999")
          for n in range(3)]
    [r] = preflight([job("J-9", "Draft", site_code="S-999")], ev, LOOKUPS, NOW, CFG)
    assert any("3x" in x for x in r.reasons)


def test_traffic_light_green_amber_red():
    ok = job("J-1")
    erp = {"J-1": erp_row(ok)}
    assert build_summary([ok], erp, [], LOOKUPS, NOW, CFG)["light"] == GREEN
    risky = job("J-2", "Draft", site_code="S-999")
    assert build_summary([ok, risky], erp, [], LOOKUPS, NOW, CFG)["light"] == AMBER
    missing = [job(f"M-{n}") for n in range(4)]
    assert build_summary([ok, *missing], erp, [], LOOKUPS, NOW, CFG)["light"] == RED


def test_old_open_issue_turns_light_red():
    old = job("J-1", changed="2026-10-29T06:00:00")  # 27 h, not loaded
    assert build_summary([old], {}, [], LOOKUPS, NOW, CFG)["light"] == RED


def test_one_reject_is_not_a_rising_trend():
    ev = [LogEvent(datetime(2026, 10, 28, 9, 0), "ERROR", "J-1", "lookup_not_found", "site_code", "S-999"),
          LogEvent(datetime(2026, 10, 28, 9, 5), "INFO", "J-2", "loaded")]
    assert reject_trend(ev, NOW)["direction"] == "flat"


def test_theme_css_is_appended_after_builtin_styles():
    from jobwatch.render import render_html
    report = build_summary([job("J-1")], {"J-1": erp_row(job("J-1"))}, [], LOOKUPS, NOW, CFG)
    plain, themed = render_html(report), render_html(report, "body{background:#fff}/*THEME*/")
    assert "THEME" not in plain
    assert themed.index("THEME") > themed.index("<style>") and themed.count("<style>") == 2
