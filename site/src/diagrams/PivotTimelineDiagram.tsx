const points = [
  { time: "10:47", label: "Want and requirements stated" },
  { time: "10:51", label: "Concept brief drafted" },
  { time: "10:53", label: "Six-perspective review" },
  { time: "10:57", label: "Decision record and go/no-go criteria" },
  { time: "11:00", label: "Build starts" },
  { time: "11:25", label: "Pivot: Todoist becomes the backbone" }
];

export default function PivotTimelineDiagram() {
  return (
    <div className="case-diagram">
      <div className="diagram-timeline">
        {points.map(p => (
          <div className="diagram-timeline-point" key={p.time}>
            <span className="time">{p.time}</span>
            <span className="label">{p.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
