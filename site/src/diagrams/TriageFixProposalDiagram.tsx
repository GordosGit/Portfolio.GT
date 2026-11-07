const steps: { title: string; text: string; tag?: string; variant?: "amber" | "cyan" }[] = [
  { title: "", tag: "TRIAGE", variant: "amber", text: "Mock-run just this record through the load. Capture the failure." },
  { title: "Analyse", text: "Cause, log evidence, proposed correction" },
  { title: "", tag: "REVIEW 1", variant: "cyan", text: "A person reads the analysis and approves or rejects" },
  { title: "", tag: "FIX IT", variant: "amber", text: "Apply the correction in the mock run. Confirm it loads." },
  { title: "", tag: "REVIEW 2", variant: "cyan", text: "A person sees the mock success and approves the live change" },
  { title: "Live fix", text: "Correct the record, reset to Ready to Send, confirm on the next run" }
];

export default function TriageFixProposalDiagram() {
  return (
    <div className="case-diagram">
      <div className="diagram-steps" style={{ gridTemplateColumns: "repeat(6, 1fr)" }}>
        {steps.map((s, i) => (
          <div className={`diagram-step ${s.variant ?? ""}`} key={i}>
            {s.tag && <div className={`diagram-badge ${s.variant}`} style={{ marginBottom: 10 }}>{s.tag}</div>}
            {s.title && <h5>{s.title}</h5>}
            <p>{s.text}</p>
          </div>
        ))}
      </div>
      <div className="diagram-compare" style={{ marginTop: 20 }}>
        <div className="diagram-compare-panel">
          <div className="diagram-label" style={{ marginTop: 0, color: "var(--amber)" }}>Audit trail (illustrative)</div>
          <div className="diagram-log">
            <div>10:12:04 <span className="tag amber">TRIAGE</span> J-10264 mock run failed: site_code 'S-310' not in master</div>
            <div>10:12:40 <span className="tag">REVIEW</span> J-10264 approved by reviewer: S-310 → S-031</div>
            <div>10:13:02 <span className="tag">FIX_MOCK</span> J-10264 mock run loaded</div>
            <div>10:13:30 <span className="tag">REVIEW</span> J-10264 approved by reviewer for live</div>
            <div>10:13:31 <span className="tag">FIX_LIVE</span> J-10264 site_code S-310 → S-031, status reset to Ready to Send</div>
          </div>
        </div>
        <div className="diagram-compare-panel">
          <div className="diagram-label" style={{ marginTop: 0 }}>Guardrails</div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {[
              "Nothing touches live data before the second approval.",
              "Only known fix types are proposed. Anything else goes to a person with the evidence attached.",
              "Every step is logged: who, when, before and after values.",
              "Needs a safe mock target, such as a test client or a validate-only load path. I don't know if one exists."
            ].map(item => (
              <li key={item} style={{ fontSize: 12.5, color: "var(--white)", padding: "9px 0", borderTop: "1px dashed var(--line)" }}>
                <span style={{ color: "var(--cyan)", marginRight: 8 }}>{">"}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="diagram-note">Proposed enhancement. Not built yet.</div>
    </div>
  );
}
