import { useEffect, useState } from "react";

/**
 * Operator portrait panel + dossier used in the homepage hero.
 * Replaces the Voight-Kampff eye. Readout numbers still drift gently and
 * skip their loop under prefers-reduced-motion.
 */
function VoightKampff() {
  const [hr, setHr] = useState("084");
  const [rp, setRp] = useState("212");
  const [pl, setPl] = useState("03.4");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let hrVal = 84, rpVal = 212, plVal = 3.4;
    function vkDrift() {
      hrVal = Math.max(72, Math.min(102, hrVal + (Math.random() - 0.5) * 3));
      rpVal = Math.max(180, Math.min(260, rpVal + (Math.random() - 0.5) * 5));
      plVal = Math.max(2.4, Math.min(4.6, plVal + (Math.random() - 0.5) * 0.3));
      setHr(String(Math.round(hrVal)).padStart(3, "0"));
      setRp(String(Math.round(rpVal)).padStart(3, "0"));
      setPl(plVal.toFixed(1).padStart(4, "0"));
    }
    vkDrift();
    const id = window.setInterval(vkDrift, 1100);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      <div className="rachael" title="Operator · Gord Turner">
        <div className="panel-label">
          <span>OPERATOR · GT</span>
          <span className="meta live">ONLINE</span>
        </div>

        <div className="portrait-stage">
          <img
            src={`${import.meta.env.BASE_URL}portrait.jpg`}
            alt="Gord Turner"
            width={800}
            height={1000}
            loading="eager"
            decoding="async"
          />
          <span className="reticle tl" />
          <span className="reticle tr" />
          <span className="reticle bl" />
          <span className="reticle br" />
        </div>

        <div className="eye-readout">
          <span>HR <span className="val pink">{hr}</span></span>
          <span>RP <span className="val cyan">{rp}</span></span>
          <span>PL <span className="val">{pl}</span></span>
        </div>
      </div>

      <aside className="operator">
        <div className="field name-row"><span className="k">Designation</span><span className="v">Gord Turner</span></div>
        <div className="field"><span className="k">Role</span><span className="v">Senior PO / BSA</span></div>
        <div className="field"><span className="k">Status</span><span className="v accent">Active</span></div>
        <div className="field"><span className="k">Discipline</span><span className="v">Applied AI · Product</span></div>
        <div className="field"><span className="k">Method</span><span className="v">1-3-1 Framework</span></div>
        <div className="field"><span className="k">Signal</span><span className="v accent">Nominal</span></div>
      </aside>
    </>
  );
}

export default VoightKampff;
