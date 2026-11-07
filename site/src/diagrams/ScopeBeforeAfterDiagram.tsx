function BracketList({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div className="diagram-bracket">
      <div className="heading">{heading}</div>
      <ul>
        {items.map(item => (
          <li key={item}>
            <span className="mark">{">"}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ScopeBeforeAfterDiagram() {
  return (
    <div className="case-diagram">
      <div className="diagram-compare" style={{ background: "transparent", border: "none", gap: 20 }}>
        <BracketList
          heading="The original brief"
          items={[
            "Multiple platforms, including Instagram and Facebook",
            "Full audio and on-screen text extraction",
            "No official API on those platforms: third-party scraping and Terms of Service exposure",
            "A conversational companion",
            "A subscription product"
          ]}
        />
        <BracketList
          heading="The rescoped proof of concept"
          items={[
            "One platform: YouTube",
            "Transcript-based extraction, a much smaller lift",
            "Automatic tagging, because manual tagging fades once the novelty wears off",
            "Instagram, Facebook, the companion and the subscription kept as named future phases",
            "Next step: ten real videos by hand before any app shell"
          ]}
        />
      </div>
    </div>
  );
}
