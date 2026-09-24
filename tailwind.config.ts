import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          indigo: "#1E22AA",
          magenta: "#E5005A",
          purple: "#5B2A9D",
          link: "#3D3AF1",
        },
        ink: {
          900: "#0E1220",
          800: "#171A2B",
          700: "#232640",
        },
        status: {
          good: "#1AA35C",
          goodBg: "#E7F7EE",
          warn: "#C98A00",
          warnBg: "#FDF3DC",
          bad: "#D6316B",
          badBg: "#FCE9EF",
        },
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(321.23deg, #1E22AA -27.3%, #E5005A 168.69%)",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      borderRadius: {
        card: "16px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16, 20, 40, 0.06), 0 1px 0 rgba(16, 20, 40, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
