import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Sampled from the "It's Me & You — Spazio di Cura" logo
        ink: "#163030",
        "ink-soft": "#3d5656",
        teal: "#40bcb7",
        "teal-deep": "#17565b",
        "teal-press": "#0f4245",
        blue: "#2571b4",
        "blue-deep": "#1a5a94",
        "blue-press": "#144877",
        gold: "#c99a3c",
        "gold-soft": "#edd9a3",
        coral: "#e0912f",
        "coral-deep": "#b5701c",
        mist: "#e5f6f5",
        "mist-deep": "#c8efed",
        paper: "#fbfaf6",
      },
      boxShadow: {
        card: "0 18px 50px -24px rgba(18, 110, 110, 0.45)",
        sm: "0 6px 22px -14px rgba(18, 110, 110, 0.5)",
      },
      borderRadius: {
        xl2: "22px",
      },
      fontFamily: {
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
    },
  },
} satisfies Config;
