export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8" aria-busy="true" aria-label="Loading">
      <div className="animate-pulse space-y-4">
        <div className="h-3 w-40 rounded bg-surface-2" />
        <div className="h-9 w-3/4 rounded bg-surface-2" />
        <div className="h-4 w-full rounded bg-surface-2" />
        <div className="h-4 w-5/6 rounded bg-surface-2" />
        <div className="h-48 w-full rounded-2xl bg-surface-2 mt-6" />
      </div>
    </div>
  );
}
