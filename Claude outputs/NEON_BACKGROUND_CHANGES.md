# Neon Reflection Background Changes

Copy these changes into your PortfolioGT repo and push to deploy the cyberpunk-inspired wet pavement background.

---

## 1. NEW FILE: `site/src/components/NeonReflection.tsx`

Create this file with the full content below:

```typescript
import { useEffect, useRef } from "react";

/**
 * Neon-soaked wet pavement with animated reflections inspired by cyberpunk
 * street scenes. Renders onto a full-screen canvas with layered neon light
 * reflections (amber, cyan, magenta) that animate with gentle wave distortion.
 * Respects prefers-reduced-motion by rendering a static version.
 */
function NeonReflection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameId = 0;
    let time = 0;

    // Resize canvas to match window
    function resizeCanvas() {
      const c = canvasRef.current;
      if (!c) return;
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Define neon light sources that cast reflections
    const lights = [
      { x: 0.15, y: 0.3, color: "#ff8a1e", intensity: 0.7, spread: 150 }, // amber left
      { x: 0.5, y: 0.2, color: "#7fd4d4", intensity: 0.6, spread: 180 },  // cyan center
      { x: 0.85, y: 0.35, color: "#ff3c8a", intensity: 0.65, spread: 140 }, // magenta right
      { x: 0.35, y: 0.25, color: "#ffcb45", intensity: 0.5, spread: 120 },  // gold
    ];

    function drawFrame() {
      const c = canvasRef.current;
      const currentCtx = c?.getContext("2d");
      if (!c || !currentCtx) return;

      const w = c.width;
      const h = c.height;

      // Dark teal atmosphere
      const atmGrad = currentCtx.createLinearGradient(0, 0, 0, h);
      atmGrad.addColorStop(0, "#0a1428");     // deep teal top
      atmGrad.addColorStop(0.4, "#0f2a3a");   // mid teal
      atmGrad.addColorStop(0.7, "#0d1a24");   // darker for ground
      atmGrad.addColorStop(1, "#08080a");     // void at bottom
      currentCtx.fillStyle = atmGrad;
      currentCtx.fillRect(0, 0, w, h);

      // Horizontal "ground" reflection layer (bottom half) with wet appearance
      const groundReflect = currentCtx.createLinearGradient(0, h * 0.55, 0, h);
      groundReflect.addColorStop(0, "rgba(20, 30, 45, 0.5)");
      groundReflect.addColorStop(0.5, "rgba(15, 20, 30, 0.3)");
      groundReflect.addColorStop(1, "rgba(8, 8, 10, 0)");
      currentCtx.fillStyle = groundReflect;
      currentCtx.fillRect(0, h * 0.55, w, h * 0.45);

      // Draw neon light reflections on wet ground with wave distortion
      lights.forEach((light, idx) => {
        const lightX = light.x * w;
        const lightY = light.y * h;
        const spread = light.spread;

        // Reflection pool on wet pavement (below light source)
        for (let i = 0; i < 4; i++) {
          const reflectY = h * 0.6 + i * 8;
          const waveOffset = Math.sin(time * 0.003 + idx + i * 0.5) * 3;

          const reflectGrad = currentCtx.createLinearGradient(
            lightX - spread,
            reflectY + waveOffset,
            lightX + spread,
            reflectY + waveOffset
          );

          // Color with decreasing intensity for each layer
          const intensity = light.intensity * (1 - i * 0.25);
          const [r, g, b] = hexToRgb(light.color);

          reflectGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
          reflectGrad.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${intensity * 0.4})`);
          reflectGrad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${intensity * 0.6})`);
          reflectGrad.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${intensity * 0.4})`);
          reflectGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

          currentCtx.fillStyle = reflectGrad;
          currentCtx.fillRect(lightX - spread - 20, reflectY - 2, spread * 2 + 40, 4);
        }

        // Vertical light shaft with bloom
        const shaftGrad = currentCtx.createLinearGradient(
          lightX - spread * 0.5,
          lightY,
          lightX + spread * 0.5,
          lightY + h * 0.6
        );
        const [r, g, b] = hexToRgb(light.color);
        shaftGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${light.intensity * 0.15})`);
        shaftGrad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${light.intensity * 0.08})`);
        shaftGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        currentCtx.fillStyle = shaftGrad;
        currentCtx.fillRect(lightX - spread * 0.5, lightY, spread, h * 0.6);
      });

      // Add subtle bokeh light sources (like street lamps)
      const bokehCount = 8;
      for (let i = 0; i < bokehCount; i++) {
        const bokehX = (i / bokehCount) * w + Math.sin(time * 0.001 + i) * 20;
        const bokehY = h * (0.2 + Math.cos(time * 0.0008 + i * 0.7) * 0.1);
        const bokehSize = 8 + Math.sin(time * 0.002 + i) * 3;

        const bokehGrad = currentCtx.createRadialGradient(bokehX, bokehY, 0, bokehX, bokehY, bokehSize);
        bokehGrad.addColorStop(0, "rgba(255, 255, 200, 0.4)");
        bokehGrad.addColorStop(1, "rgba(255, 255, 200, 0)");
        currentCtx.fillStyle = bokehGrad;
        currentCtx.fillRect(bokehX - bokehSize, bokehY - bokehSize, bokehSize * 2, bokehSize * 2);
      }

      // Horizontal scan lines / mist effect
      const mistGrad = currentCtx.createLinearGradient(0, h * 0.3, 0, h);
      mistGrad.addColorStop(0, "rgba(20, 60, 80, 0)");
      mistGrad.addColorStop(0.7, "rgba(10, 30, 50, 0.1)");
      mistGrad.addColorStop(1, "rgba(5, 15, 25, 0.15)");
      currentCtx.fillStyle = mistGrad;
      currentCtx.fillRect(0, h * 0.3, w, h * 0.7);

      // Subtle horizontal lines to suggest wet pavement texture
      currentCtx.strokeStyle = "rgba(127, 212, 212, 0.05)";
      currentCtx.lineWidth = 1;
      for (let y = h * 0.55; y < h; y += 12) {
        const offset = Math.sin(y * 0.005 + time * 0.002) * 2;
        currentCtx.beginPath();
        currentCtx.moveTo(0, y + offset);
        currentCtx.lineTo(w, y + offset);
        currentCtx.stroke();
      }

      time++;
      if (!reduceMotion) {
        frameId = requestAnimationFrame(drawFrame);
      }
    }

    // Helper to convert hex color to RGB
    function hexToRgb(hex: string): [number, number, number] {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (result) {
        return [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ];
      }
      return [255, 255, 255];
    }

    drawFrame();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      id="neon-reflection"
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

export default NeonReflection;
```

---

## 2. MODIFIED: `site/src/App.tsx`

**Change 1**: Add import at the top
```typescript
import NeonReflection from "./components/NeonReflection";
```

**Change 2**: In the `App()` function, add `<NeonReflection />` as the first child of the site-shell div:

```typescript
function App() {
  return (
    <div className="site-shell">
      <NeonReflection />
      <SiteChrome />
      <SiteHeader navItems={SITE_NAV_ITEMS} />
      
      {/* rest of the component... */}
```

---

## 3. MODIFIED: `site/src/styles.css`

Find this section (around line 73):
```css
#rain { position: fixed; inset: 0; z-index: 2; pointer-events: none; opacity: 0.5; mix-blend-mode: screen; }
#skyline { position: fixed; left: 0; right: 0; bottom: 0; height: 40vh; z-index: 1; pointer-events: none; opacity: 0.45; }
#grain { position: fixed; inset: 0; z-index: 9997; pointer-events: none; opacity: 0.06; mix-blend-mode: overlay; }
```

Add this line **before** those three rules:
```css
#neon-reflection { position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.6; mix-blend-mode: screen; }
```

So it reads:
```css
#neon-reflection { position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.6; mix-blend-mode: screen; }
#rain { position: fixed; inset: 0; z-index: 2; pointer-events: none; opacity: 0.5; mix-blend-mode: screen; }
#skyline { position: fixed; left: 0; right: 0; bottom: 0; height: 40vh; z-index: 1; pointer-events: none; opacity: 0.45; }
#grain { position: fixed; inset: 0; z-index: 9997; pointer-events: none; opacity: 0.06; mix-blend-mode: overlay; }
```

---

## Deploy

Once you've made these three changes, run in your repo:

```bash
git add -A
git commit -m "Add neon reflection background effect inspired by cyberpunk street scene"
git push
```

The GitHub Pages build will run automatically and deploy the new background live.

---

## What You'll See

- Animated wet pavement with neon light reflections (amber, cyan, magenta, gold)
- Wave ripple effects on the reflection pools
- Bokeh light sources floating in the atmosphere
- Atmospheric mist and depth layers
- Full color harmony with your existing Blade Runner aesthetic
- Accessibility: static version for users with `prefers-reduced-motion` enabled
