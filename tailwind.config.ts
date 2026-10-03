import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#14100C",
        surface: {
          DEFAULT: "#1D1712",
          raised: "#26201A",
          dim: "#17120E",
          hover: "#2F2720",
        },
        beige: {
          DEFAULT: "#E8DCC8",
          dim: "#B8AC96",
          muted: "#8A7E6B",
        },
        orange: {
          DEFAULT: "#FF7A30",
          dim: "#C9601F",
          glow: "rgba(255,122,48,0.35)",
          subtle: "rgba(255,122,48,0.12)",
        },
        outline: {
          DEFAULT: "rgba(232,220,200,0.10)",
          strong: "rgba(232,220,200,0.18)",
          subtle: "rgba(232,220,200,0.06)",
        },
      },
      fontFamily: {
        headline: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;