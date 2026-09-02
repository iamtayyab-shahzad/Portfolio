import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0a",
        surface: "#111111",
        elevated: "#161616",
        line: "#1f1f1f",
        ink: "#f5f5f5",
        muted: "#a1a1aa",
        dim: "#71717a",
        accent: {
          DEFAULT: "#4f8ef7",
          hover: "#3b7aef",
          soft: "rgba(79, 142, 247, 0.12)",
        },
      },
      maxWidth: {
        content: "72rem",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        glow: "0 0 80px -20px rgba(79, 142, 247, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
