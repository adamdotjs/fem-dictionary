/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      gray: {
        100: "#f4f4f4",
        200: "#e9e9e9",
        300: "#757575",
        400: "#3a3a3a",
        500: "#2d2d2d",
        600: "#1f1f1f",
        700: "#050505",
      },
      primary: "#a445ed",
      secondary: "#ff5252",
      white: "#ffffff",
      black: "#000000",
    },
    fontFamily: {
      sans: "Inter, sans-serif",
      serif: "Lora, serif",
      mono: "Inconsolata, monospace",
    },
  },
  plugins: [],
};
