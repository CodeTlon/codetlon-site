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
        // Void/Cosmos — Design System (colores CodeTlon)
        background: "#0a0f10",      // void
        foreground: "#e8ddd4",      // bone
        primary: {
          DEFAULT: "#ffb690",        // peach — único color de acción
          container: "#4f1e00",
          foreground: "#552100",
        },
        secondary: {
          DEFAULT: "#a4cddb",        // celeste — acento decorativo / partículas
          container: "#254e5a",
          foreground: "#053540",
        },
        surface: {
          lowest: "#060a0b",
          low: "#0d1213",
          DEFAULT: "#0a0f10",
          container: "#121819",
          high: "#1a2122",
          highest: "#232a2b",
        },
      },
      fontFamily: {
        // Sistema de una sola familia: el peso y el tracking hacen el trabajo.
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-cta": "#ffb690",
        "gradient-hero": "#0a0f10",
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