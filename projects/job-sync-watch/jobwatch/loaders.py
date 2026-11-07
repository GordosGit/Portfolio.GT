"""Read the four inputs. Swap these for real API / SQL / log readers; nothing else changes."""
import json
import re
import sqlite3
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path

LOG_LINE = re.compile(r"^(\S+) (INFO|WARN|ERROR) job=(\S+) (\w+)(.*)$")
KV = re.compile(r"(\w+)=(\S+)")


@dataclass
class LogEvent:
    ts: datetime
    level: str
    job_id: str
    kind: str  # "loaded", "lookup_not_found", ...
    field: str = ""
    value: str = ""


def load_config(path):
    return json.loads(Path(path).read_text())


def load_planner(path):
    """Stand-in for the planning system's job extract API."""
    return json.loads(Path(path).read_text())


def load_erp(path):
    """Stand-in for `SELECT * FROM jobs` against the ERP job tables."""
    con = sqlite3.connect(path)
    con.row_factory = sqlite3.Row
    try:
        return {r["job_id"]: dict(r) for r in con.execute("SELECT * FROM jobs")}
    finally:
        con.close()


def load_lookups(path):
    return {k: set(v) for k, v in json.loads(Path(path).read_text()).items()}


def parse_log(path):
    """Keep per-job lines. Batch summary lines and anything unrecognised are skipped."""
    events = []
    for line in Path(path).read_text().splitlines():
        m = LOG_LINE.match(line)
        if not m:
            continue
        ts, level, job_id, kind, rest = m.groups()
        kv = dict(KV.findall(rest))
        events.append(LogEvent(datetime.fromisoformat(ts), level, job_id, kind,
                               kv.get("field", ""), kv.get("value", "")))
    return events


def load_all(data_dir):
    d = Path(data_dir)
    return (load_planner(d / "planner_jobs.json"), load_erp(d / "erp.db"),
            load_lookups(d / "lookups.json"), parse_log(d / "integration.log"))
