export default function ReviewToExperimentDiagram() {
  return (
    <div className="case-diagram">
      <div className="diagram-row arrows">
        <div className="diagram-box">
          <h6>The brief</h6>
          <p>Honest about its own risks. Names the open question: will two adult sons keep using it?</p>
        </div>
        <div className="diagram-box amber">
          <h6>Five-persona review</h6>
          <p>Independent critiques, then a synthesis of where they agree and conflict</p>
        </div>
        <div className="diagram-box pink">
          <h6>Two reviewers, same prediction</h6>
          <p>"It ends up muted again," from different causes</p>
        </div>
      </div>
      <div className="diagram-row" style={{ marginTop: 1 }}>
        <div className="diagram-box">
          <h6>Contrarian: app fatigue</h6>
          <p>Better engineering could still solve it. Build smarter.</p>
        </div>
        <div className="diagram-box">
          <h6>First Principles: normal individuation</h6>
          <p>There may be nothing to fix. Accept it.</p>
        </div>
      </div>
      <div className="diagram-row arrows" style={{ marginTop: 1 }}>
        <div className="diagram-box cyan">
          <h6>Executor's test</h6>
          <p>Tiered channels inside the existing Discord, elevated priority, two weeks, no new code</p>
        </div>
        <div className="diagram-box">
          <h6>A later fact</h6>
          <p>The sons already use the server, just sporadically. That reads as a visibility problem.</p>
        </div>
        <div className="diagram-box cyan">
          <h6>Result</h6>
          <p>Not built as a standalone app. The cheap test replaces the build plan.</p>
        </div>
      </div>
    </div>
  );
}
