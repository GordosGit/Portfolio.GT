import { useEffect, useRef, useState } from "react";

/**
 * The Voight-Kampff eye panel + operator dossier used in the homepage hero.
 * The eye tracks the pointer and the readout numbers drift gently; both are
 * purely decorative and skip their animation loops under prefers-reduced-motion.
 */
function VoightKampff() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [hr, setHr] = useState("084");
  const [rp, setRp] = useState("212");
  const [pl, setPl] = useState("03.4");

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

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
    const vkId = window.setInterval(vkDrift, 1100);

    const MAX_X = 8;
    const MAX_Y = 5;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;

    function updateEye() {
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (pointerX - cx) / (window.innerWidth / 2);
      const dy = (pointerY - cy) / (window.innerHeight / 2);
      const ox = Math.max(-1, Math.min(1, dx)) * MAX_X;
      const oy = Math.max(-1, Math.min(1, dy)) * MAX_Y;
      stage.style.setProperty("--ox", ox.toFixed(2) + "px");
      stage.style.setProperty("--oy", oy.toFixed(2) + "px");
    }

    function onPointerMove(e: PointerEvent) {
      pointerX = e.clientX;
      pointerY = e.clientY;
      updateEye();
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", updateEye, { passive: true });
    window.addEventListener("resize", updateEye);

    return () => {
      window.clearInterval(vkId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", updateEye);
      window.removeEventListener("resize", updateEye);
    };
  }, []);

  return (
    <>
      <div className="rachael" title="Voight-Kampff · subject response">
        <div className="panel-label">
          <span>VK · SUBJECT 07</span>
          <span className="meta">REC ●</span>
        </div>

        <div className="eye-stage" ref={stageRef}>
          <span className="reticle tl" />
          <span className="reticle tr" />
          <span className="reticle bl" />
          <span className="reticle br" />

          <div className="eye">
            <div className="iris">
              <div className="pupil" />
            </div>
            <div className="glint" />
            <div className="glint small" />
          </div>

          <div className="lash-upper" />
          <div className="lash-lower" />
          <div className="crosshair" />
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
