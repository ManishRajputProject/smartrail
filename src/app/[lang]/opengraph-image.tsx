import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";

export const alt = `${SITE_NAME} — Free IRCTC Booking Date, Tatkal & Refund Calculators`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #060a14 0%, #0e1628 100%)",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              display: "flex",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
              width: 96,
              height: 96,
              borderRadius: 24,
              background: "linear-gradient(135deg, #3355ff, #7c4dff)",
            }}
          >
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="3" width="14" height="14" rx="4" />
              <path d="M5 10h14M8 17l-2 4M16 17l2 4" />
            </svg>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="#ffab6b"
              style={{ position: "absolute", top: -8, right: -8 }}
            >
              <path d="M12 2l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 800, color: "#e9edf7", letterSpacing: -2 }}>
            {SITE_NAME}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 34,
            color: "#94a1bd",
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          {SITE_DESCRIPTION}
        </div>
        <div style={{ display: "flex", marginTop: 48, fontSize: 24, color: "#7d95ff", fontWeight: 600, letterSpacing: 2 }}>
          FREE · NO LOGIN · LIVE TRACKING
        </div>
      </div>
    ),
    { ...size }
  );
}
