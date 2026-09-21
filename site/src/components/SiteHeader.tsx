import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

export type NavItem = { label: string; href: string };

type Props = {
  navItems: NavItem[];
};

function pad3(n: number) {
  return String(Math.round(n)).padStart(3, "0");
}

/**
 * Sticky HUD header used on every page: identity strip + live-updating
 * cockpit gauges (heading / velocity / altitude / power) for flavor, plus
 * the real site navigation. Falls back to static values when the visitor
 * has prefers-reduced-motion set.
 */
function SiteHeader({ navItems }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [clock, setClock] = useState("--:--:--");
  const [hdg, setHdg] = useState("047°");
  const [vel, setVel] = useState("128 kts");
  const [alt, setAlt] = useState("320 m");
  const pwrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function tick() {
      const d = new Date();
      const p = (n: number) => String(n).padStart(2, "0");
      setClock(`${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`);
    }
    tick();
    const clockId = window.setInterval(tick, 1000);

    if (reduceMotion) return () => window.clearInterval(clockId);

    let hdgVal = 47, velVal = 128, altVal = 320;
    function drift() {
      hdgVal = (hdgVal + (Math.random() - 0.5) * 4 + 360) % 360;
      velVal = Math.max(90, Math.min(180, velVal + (Math.random() - 0.5) * 4));
      altVal = Math.max(220, Math.min(420, altVal + (Math.random() - 0.5) * 6));
      setHdg(pad3(hdgVal) + "°");
      setVel(pad3(velVal) + " kts");
      setAlt(pad3(altVal) + " m");
    }
    drift();
    const driftId = window.setInterval(drift, 1800);

    const pips = 8;
    const pwrEl = pwrRef.current;
    if (pwrEl) {
      pwrEl.innerHTML = "";
      for (let i = 0; i < pips; i++) pwrEl.appendChild(document.createElement("i"));
    }
    function updatePower() {
      if (!pwrEl) return;
      const level = 5 + Math.round(Math.random() * 3);
      [...pwrEl.children].forEach((p, i) => p.classList.toggle("on", i < level));
    }
    updatePower();
    const pwrId = window.setInterval(updatePower, 1400);

    return () => {
      window.clearInterval(clockId);
      window.clearInterval(driftId);
      window.clearInterval(pwrId);
    };
  }, []);

  return (
    <header className="top-dock">
      <div className="hud">
        <div className="left">
          <span className="dot" />
          <div className="name-block">
            <a className="name" href="index.html">Gord Turner</a>
            <span className="role">Senior PO · BSA · Applied AI</span>
          </div>
          <span className="status">Online</span>
        </div>

        <nav className="hud-nav" aria-label="Primary">
          {navItems.map(item => (
            <a key={item.label} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <span className="clock">{clock}</span>

        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      <nav className={menuOpen ? "hud-nav-mobile open" : "hud-nav-mobile"} aria-label="Primary (mobile)">
        {navItems.map(item => (
          <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
        ))}
      </nav>

      <div className="cockpit">
        <div className="gauge"><span className="lbl">HDG</span><span className="val">{hdg}</span></div>
        <div className="gauge"><span className="lbl">VEL</span><span className="val cyan">{vel}</span></div>
        <div className="gauge"><span className="lbl">ALT</span><span className="val">{alt}</span></div>
        <div className="gauge"><span className="lbl">PWR</span><div className="bar" ref={pwrRef} /></div>
        <div className="radar" />
      </div>
    </header>
  );
}

export default SiteHeader;
