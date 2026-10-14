import type { Config } from "tailwindcss";

// Theme tokens are CSS variables (globals.css) so any section can switch to the light theme with class="light".
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050506",
        fg: v("fg"),
        onyx: v("surface"),
        char: v("card"),
        graphite: "#1A1B1E",
        silver: v("body"),
        mute: v("muted"),
        line: "rgb(var(--line) / var(--line-a))",
        accent: { DEFAULT: "#F5E400", soft: "#FFF06A", deep: "#C9BB00" },
      },
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-body)", "ui-sans-serif", "sans-serif"],
      },
      borderRadius: { "4xl": "2rem" },
      letterSpacing: { kicker: "0.2em" },
      transitionTimingFunction: { lux: "cubic-bezier(.22,1,.36,1)" },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        drop: { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(200%)" } },
      },
      animation: { marquee: "marquee 40s linear infinite", drop: "drop 1.8s cubic-bezier(.65,0,.35,1) infinite" },
    },
  },
  plugins: [],
};
export default config;
