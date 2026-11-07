const reviewers: { name: string; take: string; note: string; variant?: "pink" }[] = [
  { name: "Contrarian", take: "It solves visibility with a second thing to be invisible.", note: "Later supported by a new fact" },
  { name: "First Principles", take: "Intermittent use from two young adults may be normal, not a bug notifications can fix.", note: "Fork with the Contrarian" },
  { name: "Expansionist", take: "A per-person archive has value independent of the notification problem.", note: "Kept as a note" },
  { name: "Outsider", take: "Had raising the family channel's priority in Discord actually been ruled out?", note: "Cheaper question" },
  { name: "Executor", take: "Recreate the tiered channels in the existing Discord this week and watch for two weeks.", note: "Became the plan", variant: "pink" }
];

export default function FiveReviewersDiagram() {
  return (
    <div className="case-diagram">
      <div className="diagram-row">
        {reviewers.map(r => (
          <div className={`diagram-box ${r.variant ?? ""}`} key={r.name}>
            <h6 style={{ color: r.variant === "pink" ? "var(--neon-pink)" : "var(--amber)" }}>{r.name}</h6>
            <p>{r.take}</p>
            <div className={`diagram-badge ${r.variant ?? ""}`} style={{ marginTop: 14 }}>{r.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
