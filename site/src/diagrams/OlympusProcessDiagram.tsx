const steps: { title: string; text: string; variant?: "amber" | "cyan" | "pink" }[] = [
  { title: "Research first", text: "Existing recipe-import apps mostly parse a video's caption, not its audio or on-screen content." },
  { title: "Olympus, round one", text: "Six gods argue the brief. Edict: don't build the full pipeline yet. Test the suggestion experience on a small hand-entered catalog.", variant: "amber" },
  { title: "Two appeals", text: "Scope was an MVP gate; a beta with strangers was already planned. Some objections resolved, others held." },
  { title: "The blind spot", text: "Every god argued about sequencing. None asked whether the scope was the right size.", variant: "pink" },
  { title: "Rescope from the problem", text: "One platform (YouTube), transcript-based extraction. Everything else moved to named future phases.", variant: "cyan" },
  { title: "Olympus, round two", text: "Caught a small repeat of the same pattern. Edict: barest suggestion layer, and run ten real videos by hand before any app shell.", variant: "amber" }
];

export default function OlympusProcessDiagram() {
  return (
    <div className="case-diagram">
      <div className="diagram-steps" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {steps.map((s, i) => (
          <div className={`diagram-step ${s.variant ?? ""}`} key={s.title}>
            <div className="num">{String(i + 1).padStart(2, "0")}</div>
            <h5>{s.title}</h5>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
