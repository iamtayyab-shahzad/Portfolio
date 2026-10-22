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
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        elevated: "rgb(var(--color-elevated) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        dim: "rgb(var(--color-dim) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
          hover: "rgb(var(--color-accent-hover) / <alpha-value>)",
          soft: "var(--color-accent-soft)",
        },
      },
      maxWidth: {
        content: "74rem",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.04em",
      },
      boxShadow: {
        soft: "0 24px 80px -40px rgba(0, 0, 0, 0.65)",
        frame: "0 30px 80px -30px rgba(2, 6, 18, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.06)",
        lift: "0 18px 50px -24px rgba(2, 6, 18, 0.85)",
      },
    },
  },
  plugins: [],
};

export default config;
