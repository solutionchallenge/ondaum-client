/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard Variable", "sans-serif"],
      },
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
        joy: "#FFD900",
        anger: "#274B7A",
        surprise: "#CFC5B4",
        sadness: "#4A90E2",
        fear: "#5C6BC0",
        disgust: "#8E837E",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
