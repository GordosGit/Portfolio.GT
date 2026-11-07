import { DashboardStatusPanel } from "./DashboardStatusPanel";

export default function BeforeAfterSampleDataDiagram() {
  return (
    <div className="case-diagram">
      <div className="diagram-label" style={{ marginTop: 0 }}>Before: old issues never cleared</div>
      <DashboardStatusPanel openIssues={9} likelyToFail={4} sentInGrace={1} draftReady="3 / 3" oldestHours={668} rejectRate="10.6%" />
      <p style={{ fontSize: 12.5, color: "var(--bone-dim)", marginTop: 14 }}>
        9 open issues. The oldest is 668 hours old, because random silent mismatches from weeks ago stayed open forever.
      </p>

      <div className="diagram-label">After: the generator models the cleanup</div>
      <DashboardStatusPanel openIssues={5} likelyToFail={4} sentInGrace={1} draftReady="3 / 3" oldestHours={30} rejectRate="10.6%" />
      <p style={{ fontSize: 12.5, color: "var(--bone-dim)", marginTop: 14 }}>5 open issues. The oldest is 30 hours old, which is what a real bad day looks like.</p>
    </div>
  );
}
