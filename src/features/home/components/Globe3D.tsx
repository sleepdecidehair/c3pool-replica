import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { useUiStore } from "../../../stores/ui";
import { ARC_COLOR, createArcAnimator, GLOBE_MARKERS } from "../globe-data";

export function Globe3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useUiStore((state) => state.theme);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const host = canvas.parentElement;
    const dark = theme === "dark";
    const baseColor: [number, number, number] = dark ? [0.22, 0.24, 0.34] : [0.78, 0.82, 0.9];
    const nextArcs = createArcAnimator(baseColor);
    const size = canvas.offsetWidth || 560;

    let phi = 0;
    let last = performance.now();
    let frame = 0;

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio ?? 1, 2),
      width: size,
      height: size,
      phi: 0,
      theta: 0.25,
      dark: dark ? 1 : 0,
      diffuse: 1.2,
      mapSamples: 12000,
      mapBrightness: dark ? 6 : 4,
      baseColor,
      markerColor: [1, 0.36, 0],
      glowColor: dark ? [1, 0.45, 0.15] : [1, 0.55, 0.25],
      markers: GLOBE_MARKERS,
      arcs: nextArcs(performance.now()),
      arcColor: ARC_COLOR,
      arcWidth: 0.55,
      arcHeight: 0.28,
      markerElevation: 0.02,
    });

    const animate = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.1);
      last = now;
      phi += 0.18 * delta;
      globe.update({ phi, arcs: nextArcs(now) });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    const observer = new ResizeObserver(() => {
      const width = canvas.offsetWidth;
      if (width > 0) globe.update({ width, height: width });
    });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      globe.destroy();
      const wrapper = canvas.parentElement;
      if (wrapper && host && wrapper !== host) {
        host.appendChild(canvas);
        wrapper.remove();
      }
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="globe3d__canvas" aria-label="Global hashrate nodes" />;
}
