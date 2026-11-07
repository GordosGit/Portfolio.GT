export default function OneSystemFourPlacesDiagram() {
  return (
    <div className="case-diagram">
      <div className="diagram-row arrows">
        <div className="diagram-box">
          <h6>The finished site</h6>
          <p>A one-off mockup, rebuilt by Claude as the portfolio.</p>
        </div>
        <div className="diagram-box cyan">
          <h6>1. The system (extracted)</h6>
          <p>tokens.css, style-guide.html. Palette, type scale, panel borders, LED-dot markers, dashed field rows, // 0N numbering. Plain CSS, no build step.</p>
        </div>
        <div className="diagram-box amber">
          <h6>3. A Claude skill</h6>
          <p>Tokens, components and rules in one place. Applies automatically to decks, mockups and one-pagers. Standing rule: presentations are HTML, not PowerPoint.</p>
        </div>
      </div>
      <div className="diagram-row" style={{ marginTop: 1, gridTemplateColumns: "1fr" }}>
        <div className="diagram-box">
          <h6>2. The site's own chrome (kept out)</h6>
          <p>Sticky HUD header with fake telemetry, cursor-tracking eye, canvas rain and grain, kanji strip.</p>
        </div>
      </div>
      <div className="diagram-label">4. Published in the places I actually work</div>
      <div className="diagram-row">
        <div className="diagram-box">
          <h6>Portfolio repo</h6>
          <p>For the site and anyone reading it</p>
        </div>
        <div className="diagram-box">
          <h6>Tools repo</h6>
          <p>Alongside my other reusable skills and agents</p>
        </div>
        <div className="diagram-box cyan">
          <h6>Live Design System page</h6>
          <p>The site documents the system it was built from</p>
        </div>
      </div>
    </div>
  );
}
