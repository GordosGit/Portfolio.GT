import { useEffect, useRef } from "react";

/**
 * Fixed decorative layer shared by every page: rain canvas, film-grain canvas,
 * an animated skyline silhouette, and a rotating neon kanji strip.
 * Purely atmospheric — respects prefers-reduced-motion by skipping the
 * animation loops and rendering a single static frame instead.
 */
function SiteChrome() {
  const rainRef = useRef<HTMLCanvasElement>(null);
  const grainRef = useRef<HTMLCanvasElement>(null);
  const kanjiRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const kanjiLatinRef = useRef<HTMLSpanElement>(null);
  const kanjiStripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- Rain ----
    const rain = rainRef.current;
    let rainFrame = 0;
    if (rain) {
      const rctx = rain.getContext("2d");
      let rw = 0, rh = 0;
      let drops: { x: number; y: number; len: number; speed: number; alpha: number; warm: boolean }[] = [];

      function initRain() {
        if (!rain) return;
        rw = rain.width = window.innerWidth;
        rh = rain.height = window.innerHeight;
        const count = Math.floor(rw / 6);
        drops = Array.from({ length: count }, () => ({
          x: Math.random() * rw,
          y: Math.random() * rh,
          len: 8 + Math.random() * 18,
          speed: 3 + Math.random() * 5,
          alpha: 0.15 + Math.random() * 0.45,
          warm: Math.random() < 0.15
        }));
      }
      initRain();
      window.addEventListener("resize", initRain);

      function drawRain() {
        if (!rctx) return;
        rctx.clearRect(0, 0, rw, rh);
        rctx.lineCap = "round";
        for (const d of drops) {
          rctx.strokeStyle = d.warm
            ? `rgba(255, 138, 30, ${d.alpha})`
            : `rgba(127, 212, 212, ${d.alpha * 0.8})`;
          rctx.lineWidth = 1;
          rctx.beginPath();
          rctx.moveTo(d.x, d.y);
          rctx.lineTo(d.x - 1, d.y + d.len);
          rctx.stroke();

          d.y += d.speed;
          d.x -= d.speed * 0.15;
          if (d.y > rh + 20) {
            d.y = -20;
            d.x = Math.random() * rw;
            d.warm = Math.random() < 0.15;
          }
        }
        rainFrame = requestAnimationFrame(drawRain);
      }
      if (!reduceMotion) {
        drawRain();
      } else if (rctx) {
        rctx.clearRect(0, 0, rw, rh);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
      var cleanupRain = () => {
        window.removeEventListener("resize", initRain);
        cancelAnimationFrame(rainFrame);
      };
    }

    // ---- Grain ----
    const grain = grainRef.current;
    let grainFrame = 0;
    let gFrameCount = 0;
    if (grain && !reduceMotion) {
      const gctx = grain.getContext("2d");
      let gw = 0, gh = 0;
      function resizeGrain() {
        if (!grain) return;
        gw = grain.width = window.innerWidth;
        gh = grain.height = window.innerHeight;
      }
      resizeGrain();
      window.addEventListener("resize", resizeGrain);

      function drawGrain() {
        if (!gctx) return;
        const img = gctx.createImageData(gw, gh);
        const d = img.data;
        for (let i = 0; i < d.length; i += 4) {
          const v = Math.random() * 255;
          d[i] = d[i + 1] = d[i + 2] = v;
          d[i + 3] = 255;
        }
        gctx.putImageData(img, 0, 0);
      }
      function grainLoop() {
        gFrameCount++;
        if (gFrameCount % 3 === 0) drawGrain();
        grainFrame = requestAnimationFrame(grainLoop);
      }
      grainLoop();

      // eslint-disable-next-line react-hooks/exhaustive-deps
      var cleanupGrain = () => {
        window.removeEventListener("resize", resizeGrain);
        cancelAnimationFrame(grainFrame);
      };
    }

    // ---- Kanji rotation ----
    let kanjiInterval = 0;
    if (!reduceMotion) {
      const KANJI_SETS = [
        { chars: ["電", "子", "都", "市", "雨"], latin: "DENSHI TOSHI · RAIN", colors: ["#ff3c8a", "#7fd4d4", "#ff8a1e", "#ffcb45", "#7fd4d4"] },
        { chars: ["人", "工", "知", "能", "光"], latin: "JINKOU CHINOU · LIGHT", colors: ["#7fd4d4", "#ff8a1e", "#ffcb45", "#ff3c8a", "#7fd4d4"] },
        { chars: ["記", "憶", "夢", "時", "間"], latin: "KIOKU YUME · TIME", colors: ["#ffcb45", "#ff3c8a", "#7fd4d4", "#ff8a1e", "#ffcb45"] },
        { chars: ["雨", "夜", "街", "灯", "影"], latin: "AME YORU MACHI · GLOW", colors: ["#7fd4d4", "#ff3c8a", "#ff8a1e", "#ffcb45", "#7fd4d4"] },
        { chars: ["真", "実", "虚", "構", "像"], latin: "SHINJITSU KYOKOU · REAL", colors: ["#ff8a1e", "#ffcb45", "#ff3c8a", "#7fd4d4", "#ffcb45"] }
      ];
      let kanjiIdx = 0;

      function applyKanjiTheme(set: (typeof KANJI_SETS)[number]) {
        const strip = kanjiStripRef.current;
        if (!strip) return;
        strip.style.setProperty("--k0", set.colors[0]);
        strip.style.setProperty("--k1", set.colors[1]);
        strip.style.setProperty("--k2", set.colors[2]);
        strip.style.setProperty("--k3", set.colors[3]);
        strip.style.setProperty("--k4", set.colors[4]);
      }

      function rotateKanji() {
        kanjiIdx = (kanjiIdx + 1) % KANJI_SETS.length;
        const set = KANJI_SETS[kanjiIdx];
        kanjiRefs.current.forEach(el => el?.classList.add("swap"));
        setTimeout(() => {
          kanjiRefs.current.forEach((el, i) => {
            if (el) el.textContent = set.chars[i];
          });
          if (kanjiLatinRef.current) kanjiLatinRef.current.textContent = set.latin;
          applyKanjiTheme(set);
          kanjiRefs.current.forEach(el => el?.classList.remove("swap"));
        }, 480);
      }

      applyKanjiTheme(KANJI_SETS[0]);
      kanjiInterval = window.setInterval(rotateKanji, 9000);
    }

    return () => {
      // @ts-ignore - defined conditionally above
      if (typeof cleanupRain === "function") cleanupRain();
      // @ts-ignore - defined conditionally above
      if (typeof cleanupGrain === "function") cleanupGrain();
      if (kanjiInterval) window.clearInterval(kanjiInterval);
    };
  }, []);

  return (
    <>
      <svg id="skyline" viewBox="0 0 1600 400" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <defs>
          <linearGradient id="bld" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1a22" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#08080a" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="bldWarm" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#241a14" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#08080a" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <g opacity="0.55">
          <rect x="0" y="180" width="90" height="220" fill="url(#bld)" />
          <rect x="120" y="220" width="60" height="180" fill="url(#bld)" />
          <rect x="220" y="140" width="110" height="260" fill="url(#bldWarm)" />
          <rect x="360" y="200" width="80" height="200" fill="url(#bld)" />
          <rect x="470" y="120" width="70" height="280" fill="url(#bld)" />
          <rect x="580" y="230" width="140" height="170" fill="url(#bldWarm)" />
          <rect x="760" y="160" width="90" height="240" fill="url(#bld)" />
          <rect x="890" y="210" width="120" height="190" fill="url(#bldWarm)" />
          <rect x="1050" y="150" width="80" height="250" fill="url(#bld)" />
          <rect x="1170" y="240" width="130" height="160" fill="url(#bld)" />
          <rect x="1340" y="180" width="100" height="220" fill="url(#bldWarm)" />
          <rect x="1480" y="220" width="120" height="180" fill="url(#bld)" />
        </g>

        <g>
          <rect x="-40" y="260" width="180" height="140" fill="url(#bld)" />
          <rect x="180" y="300" width="140" height="100" fill="url(#bldWarm)" />
          <rect x="380" y="240" width="160" height="160" fill="url(#bld)" />
          <rect x="600" y="290" width="200" height="110" fill="url(#bldWarm)" />
          <rect x="860" y="260" width="140" height="140" fill="url(#bld)" />
          <rect x="1060" y="300" width="180" height="100" fill="url(#bldWarm)" />
          <rect x="1300" y="250" width="160" height="150" fill="url(#bld)" />
          <rect x="1500" y="290" width="140" height="110" fill="url(#bldWarm)" />
        </g>

        <g fill="#ffcb45" opacity="0.7">
          <rect x="40" y="200" width="3" height="3" />
          <rect x="60" y="220" width="3" height="3" />
          <rect x="240" y="170" width="3" height="3" />
          <rect x="260" y="190" width="3" height="3" />
          <rect x="500" y="150" width="3" height="3" />
          <rect x="520" y="180" width="3" height="3" />
          <rect x="620" y="260" width="3" height="3" />
          <rect x="800" y="190" width="3" height="3" />
          <rect x="920" y="240" width="3" height="3" />
          <rect x="1080" y="180" width="3" height="3" />
          <rect x="1200" y="270" width="3" height="3" />
          <rect x="1370" y="210" width="3" height="3" />
          <rect x="1520" y="250" width="3" height="3" />
        </g>
        <g fill="#ff3c8a" opacity="0.5">
          <rect x="150" y="260" width="3" height="3" />
          <rect x="420" y="290" width="3" height="3" />
          <rect x="700" y="180" width="3" height="3" />
          <rect x="1000" y="200" width="3" height="3" />
          <rect x="1270" y="320" width="3" height="3" />
        </g>
      </svg>

      <canvas id="rain" ref={rainRef} aria-hidden="true" />
      <canvas id="grain" ref={grainRef} aria-hidden="true" />

      <aside className="kanji-strip" ref={kanjiStripRef} aria-hidden="true">
        <span className="k-char" data-slot="0" ref={el => { kanjiRefs.current[0] = el; }}>電</span>
        <span className="k-rule" />
        <span className="k-char" data-slot="1" ref={el => { kanjiRefs.current[1] = el; }}>子</span>
        <span className="k-rule" />
        <span className="k-char" data-slot="2" ref={el => { kanjiRefs.current[2] = el; }}>都</span>
        <span className="k-rule" />
        <span className="k-char" data-slot="3" ref={el => { kanjiRefs.current[3] = el; }}>市</span>
        <span className="k-rule" />
        <span className="k-char" data-slot="4" ref={el => { kanjiRefs.current[4] = el; }}>雨</span>
        <span className="k-latin" ref={kanjiLatinRef}>DENSHI TOSHI · RAIN</span>
      </aside>
    </>
  );
}

export default SiteChrome;
