const rows: { workaround: string; solves: string; cost: string; outcome: string; variant: "cyan" | "pink" | "none" }[] = [
  { workaround: 'Typed "add task" box on the page', solves: "Phone capture by typing", cost: "Breaks the view-and-tick guardrail, and is not voice", outcome: "Not built", variant: "none" },
  { workaround: "Chat on desktop, phone for viewing only", solves: "Keeps the custom list as designed", cost: 'Gives up "works on both" and voice capture', outcome: "Not chosen", variant: "none" },
  { workaround: "Voice into Todoist, sync into the custom list each morning", solves: "Voice capture from the phone", cost: "Two systems plus a sync job to maintain", outcome: "Rejected", variant: "pink" },
  { workaround: "Reach the build session from the phone", solves: "Writes to the list directly", cost: "Not possible: voice chat and the build environment are separate", outcome: "Ruled out", variant: "pink" },
  { workaround: "Make Todoist the backbone", solves: "Voice capture works today", cost: "Gives up owning the data", outcome: "Chosen", variant: "cyan" }
];

export default function WorkaroundsDiagram() {
  return (
    <div className="case-diagram">
      <div className="diagram-table-wrap">
        <table className="diagram-table">
          <thead>
            <tr>
              <th>Workaround</th>
              <th>What it would solve</th>
              <th>Cost</th>
              <th>Outcome</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.workaround}>
                <td style={{ color: r.variant === "cyan" ? "var(--cyan)" : "var(--white)" }}>{r.workaround}</td>
                <td style={{ color: "var(--bone-dim)" }}>{r.solves}</td>
                <td style={{ color: "var(--bone-dim)" }}>{r.cost}</td>
                <td>
                  <span className={`diagram-badge ${r.variant !== "none" ? r.variant : ""}`}>{r.outcome}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
