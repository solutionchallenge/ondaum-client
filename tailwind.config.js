/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#F57C00",
        second: "#F8A047",
        third: "#FFE8BF",
        white: "#FAFAFA",
        "gray-2": "#F6F6F6",
        "gray-1": "#EDEDED",
        "font-color2": "#AEAEAE",
        "font-color": "#505050",
        black: "#000000",
      },
    },
  },

  plugins: [],
};
