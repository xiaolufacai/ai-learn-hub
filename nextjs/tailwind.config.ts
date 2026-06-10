import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0c0c1d",
        surface: "rgba(255,255,255,0.04)",
        "surface-hover": "rgba(255,255,255,0.06)",
        border: "rgba(255,255,255,0.08)",
        "border-hover": "rgba(255,255,255,0.15)",
        accent: {
          DEFAULT: "#6366f1",
          purple: "#a855f7",
          green: "#22c55e",
        },
        text: {
          primary: "#f1f5f9",
          secondary: "#94a3b8",
          muted: "#5c6174",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        card: "16px",
        button: "12px",
      },
      backdropBlur: {
        glass: "12px",
      },
      animation: {
        "glow-pulse": "glow-pulse 8s ease-in-out infinite alternate",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
      },
      keyframes: {
        "glow-pulse": {
          "0%": { opacity: "0.2", transform: "scale(1)" },
          "100%": { opacity: "0.35", transform: "scale(1.15)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
