/** Small pulsing dot used to mark live, real-time data — shared between the
 *  train live-status panel and any homepage/summary UI that flags a feature
 *  as live rather than a static lookup. */
export function LiveDot() {
  return (
    <span className="relative flex h-2 w-2" aria-hidden="true">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
    </span>
  );
}
