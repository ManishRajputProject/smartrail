"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up to `value` when scrolled into view. Uses one IntersectionObserver
 * per counter, disconnects immediately after firing, and renders the final
 * value straight away for reduced-motion users and before hydration — so the
 * number is always correct even if JS never runs.
 */
export function StatCounter({
  value,
  suffix = "",
  durationMs = 1400,
}: {
  value: number;
  suffix?: string;
  durationMs?: number;
}) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        let raf = 0;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          // easeOutExpo — fast start, gentle settle
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          setDisplay(Math.round(value * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        setDisplay(0);
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, durationMs]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
