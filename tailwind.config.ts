import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#202124",
        paper: "#f7f5ef",
        line: "#dfddd4",
        sage: "#7f9c8d",
        plum: "#7b638d",
        skysoft: "#7a99b8",
        coral: "#c86f5e"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(32, 33, 36, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
