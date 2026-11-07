function Zone({
  variant,
  title,
  sub,
  items
}: {
  variant: "amber" | "cyan" | "pink";
  title: string;
  sub: string;
  items: string[];
}) {
  return (
    <div className={`diagram-zone ${variant}`}>
      <div className="type">
        <span className="led" />
        {title}
      </div>
      <div className="sub">{sub}</div>
      <ul>
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function DeterministicVsAgentDiagram() {
  return (
    <div className="case-diagram">
      <div className="diagram-zones">
        <Zone
          variant="amber"
          title="Agent (orchestration only)"
          sub="Judgment lives here. Nothing below writes a number or sends a message on its own."
          items={[
            'Understands "log 3 hours on workflow scoping"',
            "Decides which function to call, and when",
            "Interprets a vague request into a concrete action"
          ]}
        />
        <Zone
          variant="cyan"
          title="Deterministic code"
          sub="Same input, same output, every time. No reasoning, nothing to persuade."
          items={[
            "Writes the spreadsheet row",
            "Computes daily / weekly totals",
            "Builds the draft invoice file",
            "Posts the scheduled Discord nudge"
          ]}
        />
        <Zone
          variant="pink"
          title="Human (me)"
          sub="The only thing in this entire system with real authority."
          items={["Reviews the posted draft", "Sends the real invoice, manually"]}
        />
      </div>
      <div className="diagram-note">
        No code path in this system reaches the client. <strong>Every dollar-facing output stops at a human, by construction.</strong>
      </div>
    </div>
  );
}
