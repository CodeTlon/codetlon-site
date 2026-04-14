import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Kinetic Editorial — Design System
        background: "#0e1516",
        foreground: "#e8ddd4",
        primary: {
          DEFAULT: "#ffb690",
          container: "#4f1e00",
          foreground: "#552100",
        },
        secondary: {
          DEFAULT: "#a4cddb",
          container: "#254e5a",
          foreground: "#053540",
        },
        surface: {
          lowest: "#080f10",
          low: "#161d1e",
          DEFAULT: "#0e1516",
          container: "#1a2122",
          high: "#242b2c",
          highest: "#2f3637",
        },
      },
      fontFamily: {
        display: ["var(--font-newsreader)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backdropBlur: {
        glass: "20px",
      },
      backgroundImage: {
        "gradient-cta": "linear-gradient(135deg, #ffb690 0%, #4f1e00 100%)",
        "gradient-hero": "linear-gradient(180deg, #080f10 0%, #0e1516 100%)",
      },
      // Animaciones agregadas para el Acordeón
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;