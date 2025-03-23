import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#e0c16e",
          secondary: "#D4CFCB",
          neutral: "#F5EFEC",
          white: "#F5EFEC",
        },
        dark: {
          primary: "#3D7C88",
          secondary: "#A5DBDC",
          neutral: "#D2E2E2",
          black: "#010a1c",
        },
      },
      keyframes: {
        typing: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        typing: "typing 3.5s steps(40, end)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
