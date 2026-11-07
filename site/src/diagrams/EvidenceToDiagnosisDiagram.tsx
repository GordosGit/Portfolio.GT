export default function EvidenceToDiagnosisDiagram() {
  return (
    <div className="case-diagram">
      <div className="diagram-label" style={{ marginTop: 0 }}>Sample artifact · job J-10264 (synthetic)</div>
      <div className="diagram-row">
        <div className="diagram-box">
          <h6>Planning system says</h6>
          <div className="diagram-field"><div className="k">job_id</div><div className="v">J-10264</div></div>
          <div className="diagram-field"><div className="k">status</div><div className="v" style={{ color: "var(--cyan)" }}>Sent to ERP</div></div>
          <div className="diagram-field"><div className="k">changed</div><div className="v">2026-10-29T03:30:00</div></div>
          <div className="diagram-field"><div className="k">site_code</div><div className="v" style={{ color: "var(--amber)" }}>S-310</div></div>
        </div>
        <div className="diagram-box">
          <h6>ERP job table has</h6>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            SELECT count(*) FROM jobs
            <br />
            WHERE job_id = 'J-10264'
          </p>
          <div className="diagram-badge pink" style={{ marginTop: 10 }}>0 rows</div>
        </div>
        <div className="diagram-box">
          <h6>Loader log says</h6>
          <div className="diagram-log">
            <div><span className="tag">2026-10-29T03:30:01 INFO</span> batch file=jobs_20261029_0330.csv rows=1</div>
            <div style={{ marginTop: 8 }}><span className="tag" style={{ color: "var(--neon-pink)" }}>2026-10-29T03:38:00 ERROR</span> job=J-10264 lookup_not_found field=site_code value=S-310</div>
          </div>
        </div>
      </div>
      <div className="diagram-bracket" style={{ marginTop: 1, borderColor: "rgba(255,60,138,0.4)" }}>
        <div className="heading">What the tool reports</div>
        <div className="diagram-field"><div className="k">problem</div><div className="v">Not loaded, open for 30.0 h</div></div>
        <div className="diagram-field"><div className="k">cause</div><div className="v">site_code 'S-310' is not in the ERP master data.</div></div>
        <div className="diagram-field"><div className="k">fix</div><div className="v" style={{ color: "var(--cyan)" }}>Correct site_code in the planner (closest valid value: S-031), then reset the status to 'Ready to Send'.</div></div>
      </div>
    </div>
  );
}
