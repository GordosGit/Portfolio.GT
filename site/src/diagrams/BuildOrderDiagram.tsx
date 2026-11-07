const steps = [
  {
    title: "Prove the boundary first",
    text: "Placeholder secrets, spreadsheet, and invoice file, confirmed untracked by git — before any real code existed."
  },
  {
    title: "Deterministic core, agent stays orchestration-only",
    text: "Spreadsheet writes, totals, the webhook call: plain code with no judgment baked in."
  },
  {
    title: "Boring logic before automation",
    text: "Entry, edit, delete, totals — tested against real numbers before anything scheduled sat on top."
  },
  {
    title: "Automate, then test it live",
    text: "The nudge and the scheduled task weren't trusted until they'd actually fired for real."
  },
  {
    title: "The draft stays a draft",
    text: "No code path sends the real invoice. That step stays manual, every time."
  }
];

export default function BuildOrderDiagram() {
  return (
    <div className="case-diagram">
      <div className="diagram-steps">
        {steps.map((step, i) => (
          <div className="diagram-step" key={step.title}>
            <div className="num">{String(i + 1).padStart(2, "0")}</div>
            <h5>{step.title}</h5>
            <p>{step.text}</p>
          </div>
        ))}
      </div>
      <div className="diagram-note">
        Each step shipped and was shown before the next one started. <strong>The order itself was the risk control</strong> — automation came
        last, after the parts it depends on were already proven correct.
      </div>
    </div>
  );
}
