const rows: { objection: string; by: string; status: "Resolved" | "Still open"; note: string }[] = [
  { objection: '"Pick one identity" for the product', by: "Apollo", status: "Resolved", note: 'Conceded his framing was wrong: the two-person audience was an MVP gate, not the permanent scope.' },
  { objection: "A beta phase with real strangers is missing", by: "Athena", status: "Resolved", note: "Conceded fully: the beta was already planned, which was the rigor she had asked for." },
  { objection: "Founders are the worst judges of their own product's appeal", by: "Athena", status: "Still open", note: '"It works for us" is not market proof.' },
  { objection: "Dependence on platforms with no official access is fragile at scale", by: "Hephaestus", status: "Still open", note: "Stands on its own merits." }
];

export default function ObjectionLedgerDiagram() {
  return (
    <div className="case-diagram">
      <div className="diagram-table-wrap">
        <table className="diagram-table">
          <thead>
            <tr>
              <th>Objection</th>
              <th>Raised by</th>
              <th>After the appeal</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.objection}>
                <td>{r.objection}</td>
                <td>{r.by}</td>
                <td>
                  <span className={`diagram-badge ${r.status === "Resolved" ? "cyan" : "pink"}`}>{r.status}</span>
                  <div style={{ marginTop: 8, color: "var(--bone-dim)" }}>{r.note}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="diagram-note">An appeal process that concedes every time it is pushed back on isn't testing anything.</div>
    </div>
  );
}
