export default function InterviewFlowDiagram() {
  return (
    <div className="case-diagram">
      <div className="diagram-row arrows">
        <div className="diagram-box amber">
          <h6>Define the problem</h6>
          <p>Specific, falsifiable, restatable by someone who wasn't there</p>
        </div>
        <div className="diagram-box cyan">
          <h6>Playback 1</h6>
          <p>Plays back its understanding of the problem</p>
        </div>
        <div className="diagram-box">
          <h6>Clarify the approach</h6>
          <p>Inputs, outputs, users, rules</p>
        </div>
        <div className="diagram-box cyan">
          <h6>Playback 2</h6>
          <p>Plays back the approach</p>
        </div>
      </div>
      <div className="diagram-row arrows" style={{ marginTop: 1 }}>
        <div className="diagram-box amber">
          <h6>Is it enough?</h6>
          <p>Problem confirmed · at least two user stories with acceptance criteria · inputs, outputs and users known · no open question that sends a developer back to the same person</p>
        </div>
        <div className="diagram-box cyan">
          <h6>The spec</h6>
          <p>Ten sections, same order every time</p>
        </div>
      </div>
      <div className="diagram-aside">
        <h6>Parked ideas</h6>
        <p>
          A solution idea gets one sentence of acknowledgement, a note, and a steer back to the problem. It lands in the spec under
          "Requested features," so nothing the person said is lost.
        </p>
      </div>
    </div>
  );
}
