const sections = [
  "Problem statement",
  "Goals",
  "Users",
  "User stories",
  "Acceptance criteria",
  "Inputs and outputs",
  "Rules and constraints",
  "Timing and priority",
  "Requested features",
  "Open questions"
];

export default function SpecStructureDiagram() {
  return (
    <div className="case-diagram">
      <div className="diagram-row" style={{ gridTemplateColumns: "1.4fr 1fr", alignItems: "stretch" }}>
        <div className="diagram-bracket">
          <ol className="diagram-ordered">
            {sections.map(s => (
              <li key={s}>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "var(--line)" }}>
          <div className="diagram-box cyan">
            <h6>Stamped automatically</h6>
            <p>The requester's name and the date</p>
          </div>
          <div className="diagram-box cyan">
            <h6>Where nothing was discussed</h6>
            <p>It says "Not discussed" and never invents content</p>
          </div>
          <div className="diagram-box amber">
            <h6>What it can't know</h6>
            <p>Goes under Open Questions, not into the requirements</p>
          </div>
        </div>
      </div>
      <div className="diagram-note">Redrawn from the skill's description. This is the structure, not the spec from the test run.</div>
    </div>
  );
}
