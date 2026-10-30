"""Usage:
  python -m jobwatch build --data DIR [--now ISO] [--out dashboard.html] [--json report.json] [--theme theme.css]
  python -m jobwatch serve --data DIR [--port 8080] [--now ISO] [--theme theme.css]
"""
import argparse
import json
from datetime import datetime
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path

from .loaders import load_all, load_config
from .render import render_html
from .summary import build_summary

ROOT = Path(__file__).resolve().parent.parent


def make_report(data_dir, config, now):
    planner, erp, lookups, events = load_all(data_dir)
    return build_summary(planner, erp, events, lookups, now, load_config(config))


def read_theme(path):
    return Path(path).read_text() if path else ""


def parse_now(s):
    return datetime.fromisoformat(s) if s else datetime.now().replace(microsecond=0)


def cmd_build(a):
    report = make_report(a.data, a.config, parse_now(a.now))
    Path(a.out).write_text(render_html(report, read_theme(a.theme)))
    if a.json:
        Path(a.json).write_text(json.dumps(report, indent=1) + "\n")
    print(f"{report['light']}: {len(report['issues'])} open issues, "
          f"{len(report['risks'])} at risk -> {a.out}")


def cmd_serve(a):
    class Handler(BaseHTTPRequestHandler):
        def do_GET(self):
            # Rebuilt on every request, so a refresh is always current
            body = render_html(make_report(a.data, a.config, parse_now(a.now)), read_theme(a.theme)).encode()
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)

        def log_message(self, *args):
            pass

    print(f"Serving on http://127.0.0.1:{a.port}  (Ctrl+C to stop)")
    HTTPServer(("127.0.0.1", a.port), Handler).serve_forever()


def main():
    p = argparse.ArgumentParser(prog="jobwatch")
    sub = p.add_subparsers(dest="cmd", required=True)
    for name, fn in (("build", cmd_build), ("serve", cmd_serve)):
        s = sub.add_parser(name)
        s.add_argument("--data", required=True, help="folder with the four input files")
        s.add_argument("--config", default=str(ROOT / "config.json"))
        s.add_argument("--now", help="ISO time to treat as 'now' (default: the real current time)")
        s.add_argument("--theme", help="CSS file appended after the built-in styles")
        if name == "build":
            s.add_argument("--out", default="dashboard.html")
            s.add_argument("--json", help="also write the report as JSON")
        else:
            s.add_argument("--port", type=int, default=8080)
        s.set_defaults(fn=fn)
    a = p.parse_args()
    a.fn(a)


if __name__ == "__main__":
    main()
