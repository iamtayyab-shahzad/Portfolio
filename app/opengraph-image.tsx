import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const alt = siteConfig.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const services = ["Websites & web apps", "Business systems & POS", "SaaS MVPs", "APIs", "AI tools"];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a101c",
          padding: "72px",
          color: "#e9eef6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              border: "2px solid rgba(245,182,91,0.5)",
              background: "rgba(245,182,91,0.12)",
              color: "#f5b65b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            TS
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 28, fontWeight: 600 }}>{siteConfig.name}</div>
            <div style={{ fontSize: 20, color: "#a3b0c4" }}>{siteConfig.role}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 70, fontWeight: 700, lineHeight: 1.08, maxWidth: 980 }}>
            {siteConfig.hero.headline}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {services.map((service) => (
              <div
                key={service}
                style={{
                  display: "flex",
                  padding: "10px 18px",
                  borderRadius: 999,
                  background: "rgba(245,182,91,0.12)",
                  color: "#f5b65b",
                  fontSize: 22,
                }}
              >
                {service}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
