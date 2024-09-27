/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3f54d1",
          light: "#3f54d1",
        },
        secondary: {
          DEFAULT: "#4FE0B5", // Bright orange for highlights
          light: "#4FE0B5",   // Lighter shade for hover or lighter accents
        },
        white: {
          DEFAULT: "#FFFFFF",
        }
      }
    },
  },
  plugins: [],
}

