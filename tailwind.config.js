/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./data/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* base - espresso brown */
        espresso: "#2b1a12",
        espressosoft: "#3d281d",
        cocoa: "#5b4133",
        mocha: "#8a6a57",
        latte: "#bda393",
        /* cream / beige */
        cream: "#fbf5ec",
        beige: "#f2e7d8",
        sand: "#e6d5bf",
        /* accents */
        caramel: "#c8763a",
        amberglow: "#e9964a",
        clay: "#a44f2c",
        matcha: "#7f9b6b",
      },
      fontFamily: {
        display: ["var(--font-display-face)", "Georgia", "serif"],
        body: ["var(--font-body-face)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      /* nilai tambahan supaya modifier opacity seperti /12 atau /15 valid */
      opacity: {
        12: "0.12",
        15: "0.15",
        35: "0.35",
        45: "0.45",
        55: "0.55",
        65: "0.65",
        85: "0.85",
        92: "0.92",
      },
      boxShadow: {
        soft: "0 18px 45px -22px rgba(43, 26, 18, 0.35)",
        card: "0 22px 60px -30px rgba(43, 26, 18, 0.45)",
        lift: "0 34px 70px -30px rgba(43, 26, 18, 0.5)",
        insetline: "inset 0 0 0 1px rgba(43, 26, 18, 0.08)",
      },
      borderRadius: {
        blob: "58% 42% 47% 53% / 43% 39% 61% 57%",
        squircle: "2rem",
      },
      maxWidth: {
        shell: "80rem",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        floatslow: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-16px) rotate(3deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        steam: {
          "0%": { opacity: "0", transform: "translateY(4px) scaleX(0.9)" },
          "40%": { opacity: "0.7" },
          "100%": { opacity: "0", transform: "translateY(-14px) scaleX(1.2)" },
        },
        pulsering: {
          "0%": { transform: "scale(0.85)", opacity: "0.7" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        risein: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        popin: {
          "0%": { opacity: "0", transform: "translateY(12px) scale(0.97)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        slidein: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-160% 0" },
          "100%": { backgroundPosition: "260% 0" },
        },
        spinslow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        floaty: "floaty 5s ease-in-out infinite",
        floatslow: "floatslow 9s ease-in-out infinite",
        marquee: "marquee 26s linear infinite",
        steam: "steam 3.4s ease-out infinite",
        pulsering: "pulsering 2.4s ease-out infinite",
        risein: "risein 0.35s ease-out 1 both",
        popin: "popin 0.28s ease-out 1 both",
        slidein: "slidein 0.32s cubic-bezier(0.22, 1, 0.36, 1) 1 both",
        shimmer: "shimmer 1.6s linear infinite",
        spinslow: "spinslow 26s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
