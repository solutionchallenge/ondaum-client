/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#F57C00",
        second: "#F8A047",
        third: "#FFE8BF",
        white: "#FFFFFF",
        "gray-2": "#F6F6F6",
        "gray-1": "#EDEDED",
        "gray-3": "#D9D9D9",
        "font-color2": "#AEAEAE",
        "font-color": "#505050",
        "green-1": "#A0C5B0",
        "green-2": "#4C956C",
        "green-3": "#2B6E49",
        black: "#000000",
        joy: "#34D399",
        anger: "#F87171",
        surprise: "#FBBF24",
        sadness: "#60A5FA",
        fear: "#A78BFA",
        disgust: "#F57C00",
      },
    },
  },
  plugins: [],
};
