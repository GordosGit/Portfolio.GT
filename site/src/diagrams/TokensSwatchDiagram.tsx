const swatches = [
  { name: "--void", hex: "#08080a", note: "page background" },
  { name: "--void-2", hex: "#0f0f13", note: "hover / raised surface" },
  { name: "--bone", hex: "#e8e4dc", note: "primary text" },
  { name: "--bone-dim", hex: "#8a8781", note: "secondary / muted text" },
  { name: "--amber", hex: "#ff8a1e", note: "primary accent — CTAs, numbering, active state" },
  { name: "--amber-deep", hex: "#c25a00", note: "amber borders / hover targets" },
  { name: "--cyan", hex: "#7fd4d4", note: 'secondary accent — "skill"/technical marker' },
  { name: "--cyan-deep", hex: "#2b6b6b", note: "cyan borders" },
  { name: "--neon-pink", hex: "#ff3c8a", note: 'identity accent — name, "chained" relationships' },
  { name: "--neon-gold", hex: "#ffcb45", note: "rare highlight, use sparingly" }
];

export default function TokensSwatchDiagram() {
  return (
    <div className="case-diagram">
      <div className="diagram-swatches">
        {swatches.map(s => (
          <div className="diagram-swatch" key={s.name}>
            <div className="chip" style={{ background: s.hex }} />
            <div className="label">
              <b>{s.name}</b>
              <span>{s.hex}</span>
              <span>{s.note}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="diagram-row" style={{ marginTop: 1 }}>
        <div className="diagram-box">
          <div className="diagram-badge" style={{ marginBottom: 10 }}>Headings</div>
          <h6 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 300 }}>Off-World Cockpit</h6>
          <p>Space Grotesk, weight 300 to 700</p>
        </div>
        <div className="diagram-box">
          <div className="diagram-badge cyan" style={{ marginBottom: 10 }}>Body &amp; labels</div>
          <h6>IBM Plex Mono</h6>
          <p>// 01 Dashed field rows, panel borders, LED dots</p>
        </div>
      </div>
    </div>
  );
}
