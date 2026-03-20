import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1E1F1C",
        muted: "#5F6358",
        soft: "#8B8F86",
        sand: "#F6F2EA",
        panel: "#FCF9F2",
        line: "#D9D2C6",
        haze: "#ECE3D6",
        accent: "#BCF831",
        "accent-soft": "#E6FF9B",
        sage: "#A69DF9",
        "sage-soft": "#D7D2FF",
        tertiary: "#D1E7FF",
        "tertiary-soft": "#EAF4FF",
        charcoal: "#232622"
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "PingFang SC", "Microsoft YaHei", "sans-serif"],
        serif: ["ui-serif", "Georgia", "Noto Serif SC", "serif"]
      },
      boxShadow: {
        card: "0 14px 32px rgba(30, 31, 28, 0.08)",
        lift: "0 18px 40px rgba(30, 31, 28, 0.14)"
      }
    },
  },
  plugins: [],
};

export default config;
