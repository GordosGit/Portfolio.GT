const rows: { job: string; problem: string; variant: "pink" | "amber"; openFor: string; happened: string; fix: string }[] = [
  {
    job: "J-10264",
    problem: "Not loaded",
    variant: "pink",
    openFor: "30.0 h",
    happened: "site_code 'S-310' is not in the ERP master data. Marked 'Sent to ERP' but not in the ERP jobs table.",
    fix: "Correct site_code in the planner (closest valid value: S-031), then reset the status to 'Ready to Send'."
  },
  {
    job: "J-10265",
    problem: "Value mismatch",
    variant: "amber",
    openFor: "20.0 h",
    happened: "Loaded without an error but the values differ. Likely a transform or mapping issue. start_date: planner '2026-12-04' vs ERP '2026-12-05'",
    fix: "Compare the CSV column mapping for these fields, then correct the ERP row or re-send."
  },
  {
    job: "J-10263",
    problem: "Not loaded",
    variant: "pink",
    openFor: "6.0 h",
    happened: "cost_center 'CC-1999' is not in the ERP master data. Marked 'Sent to ERP' but not in the ERP jobs table.",
    fix: "Correct cost_center in the planner, then reset the status to 'Ready to Send'."
  },
  {
    job: "J-10262",
    problem: "Not loaded",
    variant: "pink",
    openFor: "2.2 h",
    happened: "customer_code 'C-0912' is not in the ERP master data. Marked 'Sent to ERP' but not in the ERP jobs table.",
    fix: "Correct customer_code in the planner (closest valid value: C-0012), then reset the status to 'Ready to Send'."
  },
  {
    job: "J-10266",
    problem: "Stuck at ready",
    variant: "amber",
    openFor: "50 min",
    happened: "The scheduled job did not pick up this record. 'Ready to Send' for 50 min; the scheduler has run about 3 times since.",
    fix: "Check the scheduler run history and whether the record is locked or filtered out."
  }
];

export default function OpenIssuesDiagram() {
  return (
    <div className="case-diagram">
      <div className="diagram-table-wrap">
        <table className="diagram-table">
          <thead>
            <tr>
              <th>Job</th>
              <th>Problem</th>
              <th>Open for</th>
              <th>What happened</th>
              <th>Suggested fix</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.job}>
                <td>{r.job}</td>
                <td><span className={`diagram-badge ${r.variant}`}>{r.problem}</span></td>
                <td>{r.openFor}</td>
                <td style={{ color: "var(--bone-dim)" }}>{r.happened}</td>
                <td style={{ color: "var(--bone-dim)" }}>{r.fix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
