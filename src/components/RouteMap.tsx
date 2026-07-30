"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Dictionary } from "@/i18n/dictionary";

interface RouteGeometryResponse {
  available: boolean;
  coordinates?: [number, number][];
}

export function RouteMap({
  trainNumber,
  fromName,
  toName,
  t,
}: {
  trainNumber: string;
  fromName: string;
  toName: string;
  t: Dictionary["live"];
}) {
  const [coords, setCoords] = useState<[number, number][] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/trains/${trainNumber}/route-geometry`)
      .then((r) => r.json())
      .then((d: RouteGeometryResponse) => {
        if (!cancelled) setCoords(d.available ? d.coordinates ?? null : null);
      })
      .catch(() => {
        if (!cancelled) setCoords(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [trainNumber]);

  if (loading) {
    return <div className="mt-3 h-64 rounded-xl border border-border bg-surface-2 animate-pulse" />;
  }

  if (!coords?.length) {
    return <p className="mt-3 text-[13px] text-muted">{t.mapUnavailable}</p>;
  }

  const origin = coords[0];
  const destination = coords[coords.length - 1];
  // Rough centroid + bounds via MapContainer's bounds prop instead of a
  // manually-computed center/zoom, so the whole route always fits in view.
  const bounds: [[number, number], [number, number]] = coords.reduce(
    (acc, [lat, lng]) => [
      [Math.min(acc[0][0], lat), Math.min(acc[0][1], lng)],
      [Math.max(acc[1][0], lat), Math.max(acc[1][1], lng)],
    ],
    [[origin[0], origin[1]], [origin[0], origin[1]]] as [[number, number], [number, number]]
  );

  return (
    <div className="mt-3 h-64 rounded-xl overflow-hidden border border-border">
      <MapContainer bounds={bounds} boundsOptions={{ padding: [24, 24] }} className="h-full w-full" scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Polyline positions={coords} pathOptions={{ color: "#3355ff", weight: 3 }} />
        <CircleMarker center={origin} radius={6} pathOptions={{ color: "#16a34a", fillColor: "#16a34a", fillOpacity: 1 }}>
          <Tooltip permanent direction="top">{fromName}</Tooltip>
        </CircleMarker>
        <CircleMarker center={destination} radius={6} pathOptions={{ color: "#dc2626", fillColor: "#dc2626", fillOpacity: 1 }}>
          <Tooltip permanent direction="top">{toName}</Tooltip>
        </CircleMarker>
      </MapContainer>
    </div>
  );
}
