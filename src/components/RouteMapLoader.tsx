"use client";

import dynamic from "next/dynamic";

// Leaflet touches `window` at import time, so it can never run during SSR.
// `ssr: false` on next/dynamic is only valid inside a Client Component,
// hence this thin wrapper instead of calling dynamic() from the page itself.
export const RouteMap = dynamic(() => import("@/components/RouteMap").then((m) => m.RouteMap), {
  ssr: false,
  loading: () => <div className="mt-3 h-64 rounded-xl border border-border bg-surface-2 animate-pulse" />,
});
