function GapPanel({ variant, tag, wanted, found, happened }: { variant: "cyan" | "amber" | "pink"; tag: string; wanted: string; found: string; happened: string }) {
  return (
    <div className="diagram-compare-panel">
      <div className={`diagram-badge ${variant}`} style={{ marginBottom: 16 }}>{tag}</div>
      <div className="diagram-field">
        <div className="k">Wanted</div>
        <div className="v">{wanted}</div>
      </div>
      <div className="diagram-field">
        <div className="k">Found</div>
        <div className="v">{found}</div>
      </div>
      <div className="diagram-field">
        <div className="k">Happened</div>
        <div className="v">{happened}</div>
      </div>
    </div>
  );
}

export default function ClosingGapsDiagram() {
  return (
    <div className="case-diagram">
      <div className="diagram-compare">
        <GapPanel
          variant="cyan"
          tag="Reworded"
          wanted="Hands-on financial reconciliation work."
          found="A prior role included exactly that, described differently."
          happened="The fix was rewording, not fabrication."
        />
        <GapPanel
          variant="amber"
          tag="Added"
          wanted="A specific delivery methodology."
          found="That experience genuinely existed from earlier in the career."
          happened="It was added to the resume."
        />
        <GapPanel
          variant="pink"
          tag="Left open"
          wanted="A certification that doesn't exist."
          found="No matching experience to reword or add."
          happened="Stayed flagged as an open gap, and was never mentioned in the letter."
        />
      </div>
    </div>
  );
}
