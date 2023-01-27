/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      gray: {
        100: "var(--gray100)",
        200: "var(--gray200)",
        300: "var(--gray300)",
        400: "var(--gray400)",
        500: "var(--gray500)",
        600: "var(--gray600)",
        700: "var(--gray700)",
      },
      primary: "var(--primary)",
      secondary: "var(--secondary)",
      white: "var(--white)",
      black: "var(--black)",
    },
    fontFamily: {
      sans: "Inter, sans-serif",
      serif: "Lora, serif",
      mono: "Inconsolata, monospace",
    },
  },
  plugins: [],
};
