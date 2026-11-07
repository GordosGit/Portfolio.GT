function BugPanel({
  title,
  assumed,
  actually,
  fix
}: {
  title: string;
  assumed: string;
  actually: string;
  fix: string;
}) {
  return (
    <div className="diagram-compare-panel">
      <h5>{title}</h5>
      <div className="diagram-field">
        <div className="k">Assumed</div>
        <div className="v">{assumed}</div>
      </div>
      <div className="diagram-field">
        <div className="k">Actually</div>
        <div className="v">{actually}</div>
      </div>
      <div className="diagram-field fix">
        <div className="k">Fix</div>
        <div className="v">{fix}</div>
      </div>
    </div>
  );
}

export default function BugsCaughtLiveDiagram() {
  return (
    <div className="case-diagram">
      <div className="diagram-compare">
        <BugPanel
          title="Discord webhook — 403 Forbidden"
          assumed="A POST to a valid webhook URL would just work."
          actually={'Discord’s edge silently rejected Python’s default "Python-urllib/…" user agent on the first live test.'}
          fix="One line: set a real User-Agent header. Found only by posting to the real channel, not by reading the code."
        />
        <BugPanel
          title="Scheduled task — silent quoting failure"
          assumed="schtasks would run python.exe with its arguments inline, same as any other command."
          actually="Nested quoting breaks the moment the install path contains a space — which this one did."
          fix="Route each task through a small .cmd wrapper instead, sidestepping the quoting problem entirely."
        />
      </div>
      <div className="diagram-note">
        Neither bug was visible in a code review. <strong>Both only existed at the boundary between the code and the real system it talks to</strong> —
        which is exactly why each step in the build was tested live before moving to the next one.
      </div>
    </div>
  );
}
