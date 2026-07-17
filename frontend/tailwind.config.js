/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        void: "#0B0E17",
        panel: "#131826",
        panel2: "#1A2033",
        indigo: {
          DEFAULT: "#5B6EF5",
          soft: "#8891FA",
        },
        cyan: {
          DEFAULT: "#22D3EE",
        },
        amber: {
          DEFAULT: "#F5A623",
        },
        ink: "#E6E9F5",
        muted: "#8890AC",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.45)",
        glow: "0 0 40px rgba(91, 110, 245, 0.35)",
        "glow-cyan": "0 0 40px rgba(34, 211, 238, 0.3)",
      },
      backgroundImage: {
        mesh: "radial-gradient(at 20% 20%, rgba(91,110,245,0.25) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(34,211,238,0.18) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(245,166,35,0.12) 0px, transparent 50%)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-700px 0" },
          "100%": { backgroundPosition: "700px 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.8s infinite linear",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
