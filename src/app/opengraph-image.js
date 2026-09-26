import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — Chinese & Fast Food in Bahria Enclave, Islamabad`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Built from tokens + type only, so it renders with no network access. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f8f1e4", padding: 64, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 72, height: 72, borderRadius: 20, background: "#8c2a12", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 40, height: 26, background: "#f4b224", borderRadius: "0 0 22px 22px", marginTop: 10 }} />
            </div>
            <div style={{ fontSize: 44, fontWeight: 800, color: "#23150f" }}>{site.name}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1, color: "#23150f", letterSpacing: -3 }}>Love at first</div>
            <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1.05, color: "#8c2a12", letterSpacing: -3 }}>bite.</div>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ background: "#f4b224", color: "#23150f", fontSize: 30, fontWeight: 700, padding: "12px 26px", borderRadius: 999 }}>
              {`Chinese & Fast Food · Bahria Enclave`}
            </div>
            <div style={{ background: "#8c2a12", color: "#f8f1e4", fontSize: 30, fontWeight: 700, padding: "12px 26px", borderRadius: 999 }}>
              Order on WhatsApp
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
