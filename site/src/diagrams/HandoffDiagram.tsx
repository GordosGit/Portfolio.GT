function Connector({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 60px", fontSize: 10, color: "var(--bone-dim)", textAlign: "center", lineHeight: 1.3 }}>
      {text}
    </div>
  );
}

function FlowBox({ variant, title, text }: { variant?: "amber" | "cyan" | "pink"; title: string; text: string }) {
  return (
    <div className={`diagram-box ${variant ?? ""}`} style={{ flex: "1 1 160px" }}>
      <h6>{title}</h6>
      <p>{text}</p>
    </div>
  );
}

export default function HandoffDiagram() {
  return (
    <div className="case-diagram">
      <div className="diagram-label" style={{ marginTop: 0 }}>1. Planning system: what the status says</div>
      <div style={{ display: "flex", gap: 1, background: "var(--line)", border: "1px solid var(--line)" }}>
        <FlowBox title="Draft" text="job created" />
        <FlowBox title="Ready to Send" text="marked ready" />
        <Connector text="every 15 min" />
        <FlowBox variant="amber" title="Scheduled job" text="writes a CSV to the drop folder" />
        <FlowBox variant="cyan" title="Sent" text="status set. Looks done." />
      </div>

      <div className="diagram-label">2. ERP: what actually happened, later and separately</div>
      <div style={{ display: "flex", gap: 1, background: "var(--line)", border: "1px solid var(--line)" }}>
        <FlowBox title="File picked up" text="by a separate ERP-side job" />
        <Connector text="async" />
        <FlowBox variant="cyan" title="Loaded" text="row is in the ERP job table" />
        <Connector text="or" />
        <FlowBox variant="pink" title="Rejected" text="e.g. lookup value not in master data. Row never arrives. Status still says Sent." />
      </div>

      <div className="diagram-label">3. Job Sync Watch: reads both sides and the log</div>
      <div style={{ display: "flex", gap: 1, background: "var(--line)", border: "1px solid var(--line)" }}>
        <FlowBox title="Planner extract" text="status per job" />
        <Connector text="+" />
        <FlowBox title="ERP job table" text="what really arrived" />
        <Connector text="+" />
        <FlowBox title="Loader log" text="why it failed" />
        <FlowBox variant="amber" title="One light" text="with the cause and a suggested fix" />
      </div>
    </div>
  );
}
