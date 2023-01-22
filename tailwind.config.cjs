/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      gray: {
        100: "#F4F4F4",
        200: "#E9E9E9",
        300: "#838383",
        400: "#3A3A3A",
        500: "#2D2D2D",
        600: "#1F1F1F",
        700: "#050505",
      },
      primary: "#A445ED",
      secondary: "#FF5252",
      white: "#FFFFFF",
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
