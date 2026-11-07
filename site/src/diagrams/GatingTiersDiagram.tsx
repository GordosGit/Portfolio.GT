export default function GatingTiersDiagram() {
  return (
    <div className="case-diagram">
      <div className="diagram-row arrows">
        <div className="diagram-box">
          <h6>A job posting</h6>
          <p>Compared line by line: required, preferred, repeated keywords</p>
        </div>
        <div className="diagram-box">
          <h6>Score against both personas</h6>
          <p>Business Analyst and Product Owner, side by side</p>
        </div>
        <div className="diagram-box amber">
          <h6>Carry on with the stronger</h6>
          <p>Within about five points, it asks me instead of guessing</p>
        </div>
      </div>
      <div className="diagram-label">Then the score decides what happens next</div>
      <div className="diagram-tiers">
        <div className="diagram-tier cyan">
          <div className="pct">80%+</div>
          <div className="body">
            <h6>Strong match</h6>
            <p>Straight to resume suggestions and the cover letter work.</p>
          </div>
        </div>
        <div className="diagram-tier amber">
          <div className="pct">60-79%</div>
          <div className="body">
            <h6>Borderline match</h6>
            <p>Stops. Walks the gaps one at a time as a conversation: is it a real absence, or just missing from the resume's wording?</p>
          </div>
        </div>
        <div className="diagram-tier pink">
          <div className="pct">Under 60%</div>
          <div className="body">
            <h6>Weak match</h6>
            <p>Stops entirely. No cover letter, no encouragement to apply anyway.</p>
          </div>
        </div>
      </div>
      <div className="diagram-note">
        <strong>Standing rule:</strong> whatever gap is still open after the conversation is off-limits in the letter: no hedging, no oblique mention.
      </div>
    </div>
  );
}
