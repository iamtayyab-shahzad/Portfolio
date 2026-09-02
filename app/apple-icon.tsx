import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const letter = siteConfig.name.trim().charAt(0) || "N";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#4f8ef7",
          fontSize: 88,
          fontWeight: 600,
        }}
      >
        {letter}
      </div>
    ),
    size,
  );
}
