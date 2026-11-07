export function DashboardStatusPanel({
  openIssues,
  likelyToFail,
  sentInGrace,
  draftReady,
  oldestHours,
  rejectRate
}: {
  openIssues: number;
  likelyToFail: number;
  sentInGrace: number;
  draftReady: string;
  oldestHours: number;
  rejectRate: string;
}) {
  return (
    <>
      <div className="diagram-label" style={{ marginTop: 0 }}>// 01 Status</div>
      <div className="diagram-status">
        <div className="diagram-status-main">
          <div className="diagram-light">
            <div className="bulb on" />
            <div className="bulb" />
            <div className="bulb" />
          </div>
          <div>
            <div className="diagram-status-headline">ACTION NEEDED</div>
            <p className="sub">Jobs are failing or stuck right now.</p>
            <ul>
              <li>&gt; {openIssues} open issues (red at 4)</li>
              <li>&gt; oldest open issue is {oldestHours} h old (red at 24 h)</li>
              <li>&gt; {rejectRate} 7-day reject rate (red at 5.0%)</li>
              <li>&gt; {likelyToFail} jobs likely to fail on the next send</li>
            </ul>
          </div>
        </div>
        <div className="diagram-status-side">
          <div className="row"><span>Open issues</span><b>{openIssues}</b></div>
          <div className="row"><span>Likely to fail next send</span><b>{likelyToFail}</b></div>
          <div className="row"><span>Sent, inside grace window</span><b>{sentInGrace}</b></div>
          <div className="row"><span>Draft / Ready</span><b>{draftReady}</b></div>
        </div>
      </div>
    </>
  );
}

export default function DashboardStatusDiagram() {
  return (
    <div className="case-diagram">
      <DashboardStatusPanel openIssues={5} likelyToFail={4} sentInGrace={1} draftReady="3 / 3" oldestHours={30} rejectRate="10.6%" />
      <div className="diagram-label">// 02 Period totals</div>
      <div className="diagram-stats">
        <div className="diagram-stat">
          <div className="k">Last 24 hours</div>
          <div className="v">17</div>
          <div className="row"><span>sent by planner</span></div>
          <div className="row"><span>Loaded by ERP</span><span>15</span></div>
          <div className="row"><span>Rejected</span><span>2</span></div>
          <div className="row"><span>Reject rate</span><span>11.8%</span></div>
        </div>
        <div className="diagram-stat">
          <div className="k">Last 7 days</div>
          <div className="v">62</div>
          <div className="row"><span>sent by planner</span></div>
          <div className="row"><span>Loaded by ERP</span><span>59</span></div>
          <div className="row"><span>Rejected</span><span>7</span></div>
          <div className="row"><span>Reject rate</span><span>10.6%</span></div>
        </div>
        <div className="diagram-stat">
          <div className="k">Last 30 days</div>
          <div className="v">263</div>
          <div className="row"><span>sent by planner</span></div>
          <div className="row"><span>Loaded by ERP</span><span>260</span></div>
          <div className="row"><span>Rejected</span><span>10</span></div>
          <div className="row"><span>Reject rate</span><span>3.7%</span></div>
        </div>
      </div>
    </div>
  );
}
