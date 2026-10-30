"""Render the report as one self-contained HTML page (Off-World Cockpit style).

Status colour mapping is functional, not decorative: GREEN = cyan, AMBER = amber,
RED = neon pink. Every state also carries a text label so colour is never the
only signal.
"""
from html import escape as e

LIGHT = {
    "GREEN": ("var(--cyan)", "ALL CLEAR", "Nothing to act on."),
    "AMBER": ("var(--amber)", "WATCH", "Something needs a look before it becomes a problem."),
    "RED": ("var(--neon-pink)", "ACTION NEEDED", "Jobs are failing or stuck right now."),
}
KIND_LABEL = {"NOT_LOADED": "Not loaded", "FIELD_MISMATCH": "Value mismatch", "STUCK_READY": "Stuck at ready"}

CSS = """
:root{--void:#08080a;--void-2:#0f0f13;--bone:#e8e4dc;--bone-dim:#8a8781;--amber:#ff8a1e;--amber-deep:#c25a00;
--cyan:#7fd4d4;--cyan-deep:#2b6b6b;--neon-pink:#ff3c8a;--neon-gold:#ffcb45;--line:rgba(232,228,220,.12)}
*{box-sizing:border-box;margin:0}
body{background:var(--void);color:var(--bone);font:400 13px/1.55 'IBM Plex Mono',monospace;letter-spacing:.02em;
background-image:radial-gradient(900px 500px at 85% -10%,rgba(255,138,30,.10),transparent 60%),radial-gradient(700px 500px at -10% 30%,rgba(127,212,212,.07),transparent 60%);
background-attachment:fixed;min-height:100vh}
main{max-width:1120px;margin:0 auto;padding:40px 24px 64px}
h1,h2{font-family:'Space Grotesk',sans-serif;font-weight:300;letter-spacing:-.01em}
h1{font-size:44px;line-height:1.1;margin:10px 0 6px}
.eyebrow{font-size:10px;text-transform:uppercase;letter-spacing:.28em;color:var(--amber);display:flex;align-items:center;gap:10px}
.eyebrow:before{content:"";width:22px;height:1px;background:var(--amber)}
.sub{color:var(--bone-dim);max-width:70ch}
.asof{color:var(--cyan);margin-top:14px}
.sec{margin-top:52px}
.sec-head{display:flex;align-items:baseline;gap:14px;padding-bottom:12px;border-bottom:1px solid var(--line);position:relative;margin-bottom:20px}
.sec-head:after{content:"";position:absolute;left:0;bottom:-1px;width:56px;height:1px;background:var(--amber);box-shadow:0 0 10px var(--amber)}
.sec-head .n{color:var(--amber);font-size:12px}
h2{font-size:26px}
.status{display:grid;grid-template-columns:150px 1fr 320px;gap:28px;align-items:center}
.housing{width:96px;margin:0 auto;padding:14px;border:1px solid var(--line);background:var(--void-2);display:grid;gap:12px;justify-items:center}
.lamp{width:56px;height:56px;border-radius:50%;border:1px solid var(--line);background:#14141a}
.lamp.on{background:var(--c);box-shadow:0 0 28px var(--c),0 0 70px color-mix(in srgb,var(--c) 45%,transparent);border-color:var(--c)}
.verdict{font-family:'Space Grotesk',sans-serif;font-size:34px;font-weight:300;color:var(--c);line-height:1.1}
.reasons{list-style:none;padding:0;margin-top:14px;color:var(--bone-dim)}
.reasons li:before{content:"> ";color:var(--amber)}
.panel{position:relative;border:1px solid var(--line);padding:18px 18px 10px;background:rgba(15,15,19,.7)}
.panel:before,.panel:after{content:"";position:absolute;width:14px;height:14px;border:1px solid var(--amber)}
.panel:before{left:-1px;top:-1px;border-right:0;border-bottom:0}
.panel:after{right:-1px;bottom:-1px;border-left:0;border-top:0}
.row{display:flex;justify-content:space-between;gap:12px;padding:7px 0;border-bottom:1px dashed var(--line)}
.row:last-child{border-bottom:0}
.row span:first-child{color:var(--bone-dim)}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border:1px solid var(--line)}
.card{background:var(--void);padding:18px}
.type{display:flex;align-items:center;gap:8px;font-size:10px;text-transform:uppercase;letter-spacing:.2em;color:var(--bone-dim);margin-bottom:12px}
.led{width:7px;height:7px;border-radius:50%;background:var(--cyan);box-shadow:0 0 8px var(--cyan)}
.led.amber{background:var(--amber);box-shadow:0 0 8px var(--amber)}
.big{font-family:'Space Grotesk',sans-serif;font-size:40px;font-weight:300;line-height:1;margin-bottom:10px}
table{width:100%;border-collapse:collapse}
th{font-size:10px;text-transform:uppercase;letter-spacing:.2em;color:var(--bone-dim);font-weight:500;text-align:left;padding:8px 12px 8px 0;border-bottom:1px solid var(--line)}
td:nth-child(-n+3){white-space:nowrap}
td{padding:10px 12px 10px 0;border-bottom:1px dashed var(--line);vertical-align:top}
.tag{display:inline-block;border:1px solid var(--cyan-deep);color:var(--cyan);padding:1px 8px;font-size:11px;white-space:nowrap}
.tag.amber{border-color:var(--amber-deep);color:var(--amber)}
.tag.pink{border-color:var(--neon-pink);color:var(--neon-pink)}
.dim{color:var(--bone-dim)}
.cols{display:grid;grid-template-columns:1.4fr 1fr;gap:28px}
.bar{display:grid;grid-template-columns:130px 1fr 28px;gap:10px;align-items:center;margin:8px 0}
.bar i{display:block;height:8px;background:var(--amber);box-shadow:0 0 8px rgba(255,138,30,.5)}
.empty{color:var(--bone-dim);padding:14px 0}
footer{margin-top:56px;padding-top:14px;border-top:1px solid var(--line);color:var(--bone-dim);font-size:11px}
@media(max-width:860px){.status,.cols,.grid3{grid-template-columns:1fr}}
@media(prefers-reduced-motion:no-preference){.lamp.on{animation:pulse 3s ease-in-out infinite}}
@keyframes pulse{50%{filter:brightness(.82)}}
"""


def _hrs(h):
    return f"{h * 60:.0f} min" if h < 1 else f"{h:.1f} h" if h < 48 else f"{h / 24:.1f} d"


def _issue_rows(issues):
    if not issues:
        return '<p class="empty">No open issues.</p>'
    rows = "".join(
        f"<tr><td>{e(i['job_id'])}</td><td><span class='tag {'pink' if i['kind'] == 'NOT_LOADED' else 'amber'}'>"
        f"{KIND_LABEL.get(i['kind'], i['kind'])}</span></td><td>{_hrs(i['age_hours'])}</td>"
        f"<td>{e(i['cause'])}<div class='dim'>{e(i['detail'])}</div></td><td>{e(i['suggested_fix'])}</td></tr>"
        for i in issues)
    return ("<table><tr><th>Job</th><th>Problem</th><th>Open for</th><th>What happened</th>"
            f"<th>Suggested fix</th></tr>{rows}</table>")


def _risk_rows(risks):
    if not risks:
        return '<p class="empty">Nothing in Draft or Ready looks likely to fail.</p>'
    rows = "".join(
        f"<tr><td>{e(r['job_id'])}</td><td>{e(r['status'])}</td>"
        f"<td><span class='tag {'pink' if r['level'] == 'HIGH' else 'amber'}'>{r['level']}</span></td>"
        f"<td>{'<br>'.join(e(x) for x in r['reasons'])}</td></tr>"
        for r in risks)
    return f"<table><tr><th>Job</th><th>Status</th><th>Risk</th><th>Why</th></tr>{rows}</table>"


def render_html(r, theme_css=""):
    """theme_css: optional CSS appended after the built-in styles, so a theme can override them."""
    color, label, blurb = LIGHT[r["light"]]
    lamps = "".join(
        f"<div class='lamp{' on' if r['light'] == name else ''}' style='--c:{LIGHT[name][0]}'></div>"
        for name in ("RED", "AMBER", "GREEN"))
    reasons = "".join(f"<li>{e(x)}</li>" for x in r["reasons"])
    sc = r["status_counts"]
    cards = "".join(
        f"<div class='card'><div class='type'><span class='led{' amber' if t['reject_rate_pct'] >= 5 else ''}'></span>{e(t['label'])}</div>"
        f"<div class='big'>{t['sent']}</div><div class='dim'>sent by planner</div>"
        f"<div class='row'><span>Loaded by ERP</span><span>{t['loaded']}</span></div>"
        f"<div class='row'><span>Rejected</span><span>{t['rejected']}</span></div>"
        f"<div class='row'><span>Reject rate</span><span>{t['reject_rate_pct']}%</span></div></div>"
        for t in r["totals"])
    top = r["top_fields"]
    mx = max((n for _, n in top), default=1)
    bars = "".join(f"<div class='bar'><span>{e(f)}</span><i style='width:{100 * n / mx:.0f}%'></i><span>{n}</span></div>"
                   for f, n in top) or "<p class='empty'>No rejects in 30 days.</p>"
    tr = r["trend"]
    return f"""<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Job Sync Watch</title>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;700&display=swap" rel="stylesheet">
<style>{CSS}</style>{f'<style>{theme_css}</style>' if theme_css else ''}</head><body><main>
<div class="eyebrow">Integration monitor</div>
<h1>Job Sync Watch</h1>
<p class="sub">Planner to ERP job hand-off. Compares both sides, reads the loader log for the cause, and flags jobs likely to fail before they go out.</p>
<p class="asof">AS OF {e(r['as_of'])} &middot; SYNTHETIC DATA</p>

<section class="sec"><div class="sec-head"><span class="n">// 01</span><h2>Status</h2></div>
<div class="status" style="--c:{color}">
<div class="housing">{lamps}</div>
<div><div class="verdict">{label}</div><div class="dim">{blurb}</div><ul class="reasons">{reasons}</ul></div>
<div class="panel">
<div class="row"><span>Open issues</span><span>{len(r['issues'])}</span></div>
<div class="row"><span>Likely to fail next send</span><span>{len(r['risks'])}</span></div>
<div class="row"><span>Sent, inside grace window</span><span>{r['pending']}</span></div>
<div class="row"><span>Draft / Ready</span><span>{sc.get('Draft', 0)} / {sc.get('Ready to Send', 0)}</span></div>
</div></div></section>

<section class="sec"><div class="sec-head"><span class="n">// 02</span><h2>Period totals</h2></div>
<div class="grid3">{cards}</div></section>

<section class="sec"><div class="sec-head"><span class="n">// 03</span><h2>Open issues</h2></div>
{_issue_rows(r['issues'])}</section>

<section class="sec"><div class="sec-head"><span class="n">// 04</span><h2>Early warning</h2></div>
<div class="cols"><div>{_risk_rows(r['risks'])}</div>
<div class="panel"><div class="type"><span class="led amber"></span>Reject trend</div>
<div class="row"><span>This 7 days</span><span>{tr['this_week_pct']}%</span></div>
<div class="row"><span>Previous 7 days</span><span>{tr['prev_week_pct']}%</span></div>
<div class="row"><span>Direction</span><span>{tr['direction']}</span></div>
<div class="type" style="margin-top:18px">Rejects by field, 30 days</div>{bars}</div></div></section>

<footer>Rules-based checks, not a model. Thresholds live in config.json. Snapshot generated at the time above.</footer>
</main></body></html>"""
