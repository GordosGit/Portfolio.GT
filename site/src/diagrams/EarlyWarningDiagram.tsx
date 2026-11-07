const rows: { job: string; status: string; risk: "HIGH" | "MEDIUM"; why: string }[] = [
  { job: "J-10268", status: "Ready to Send", risk: "HIGH", why: "equipment_class 'CRN-250' is not in the ERP master data (closest: CRN-250T); this exact value was rejected 2x in the last 30 days" },
  { job: "J-10269", status: "Ready to Send", risk: "HIGH", why: "cost_center is blank" },
  { job: "J-10271", status: "Draft", risk: "HIGH", why: "customer_code 'C-0999' is not in the ERP master data" },
  { job: "J-10270", status: "Draft", risk: "MEDIUM", why: "customer_code 'c-0042' only matches after trimming/upper-casing (C-0042); the ERP lookup is exact" }
];

const bars = [
  { field: "cost_center", count: 5 },
  { field: "equipment_class", count: 2 },
  { field: "customer_code", count: 2 },
  { field: "site_code", count: 1 }
];
const maxCount = Math.max(...bars.map(b => b.count));

export default function EarlyWarningDiagram() {
  return (
    <div className="case-diagram">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 24, alignItems: "start" }} className="diagram-status">
        <div className="diagram-table-wrap">
          <table className="diagram-table">
            <thead>
              <tr>
                <th>Job</th>
                <th>Status</th>
                <th>Risk</th>
                <th>Why</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.job}>
                  <td>{r.job}</td>
                  <td style={{ color: "var(--bone-dim)" }}>{r.status}</td>
                  <td><span className={`diagram-badge ${r.risk === "HIGH" ? "pink" : "amber"}`}>{r.risk}</span></td>
                  <td style={{ color: "var(--bone-dim)" }}>{r.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="diagram-status-side">
          <div className="diagram-label" style={{ marginTop: 0, marginBottom: 10 }}>Reject trend</div>
          <div className="row"><span>This 7 days</span><b>10.6%</b></div>
          <div className="row"><span>Previous 7 days</span><b>0.0%</b></div>
          <div className="row"><span>Direction</span><b>rising</b></div>
          <div className="diagram-label" style={{ marginBottom: 10 }}>Rejects by field, 30 days</div>
          {bars.map(b => (
            <div key={b.field} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "var(--bone-dim)", marginBottom: 4 }}>
                <span>{b.field}</span>
                <span>{b.count}</span>
              </div>
              <div style={{ height: 5, background: "var(--void-2)" }}>
                <div style={{ height: "100%", width: `${(b.count / maxCount) * 100}%`, background: "var(--amber)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
