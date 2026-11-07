const rows: { criterion: string; status: "Passed" | "Failed" | "Not assessed"; variant: "cyan" | "pink" | "none"; evidence: string }[] = [
  {
    criterion: "1. Morning digest runs unattended, no approval prompts",
    status: "Passed",
    variant: "cyan",
    evidence: "Push notifications from the test runs reached my phone, and the email test arrived too. Email was added as a second channel."
  },
  {
    criterion: "2. Phone editing as smooth as desktop",
    status: "Failed",
    variant: "pink",
    evidence: "Voice chat could write to Todoist but had no tool to write to the custom list. Text chat on the phone was not tested."
  },
  {
    criterion: "3. Adding a task by chat takes one sentence",
    status: "Passed",
    variant: "cyan",
    evidence: "Three new tasks, a due date and a priority change were each applied from a single message."
  },
  {
    criterion: "4. The list is trusted",
    status: "Not assessed",
    variant: "none",
    evidence: "The test ended on day one, before a full day of use."
  }
];

export default function PivotScorecardDiagram() {
  return (
    <div className="case-diagram">
      <div className="diagram-table-wrap">
        <table className="diagram-table">
          <thead>
            <tr>
              <th>Criterion</th>
              <th>Result</th>
              <th>Evidence</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.criterion}>
                <td>{r.criterion}</td>
                <td>
                  <span className={`diagram-badge ${r.variant !== "none" ? r.variant : ""}`}>{r.status}</span>
                </td>
                <td style={{ color: "var(--bone-dim)" }}>{r.evidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
