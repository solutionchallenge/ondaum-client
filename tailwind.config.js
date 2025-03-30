/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "orange-3": "#F57C00",
        "orange-2": "#F8A047",
        "orange-1": "#FFE8BF",
        "gray-1": "#FAFAFA",
        "gray-2": "#F6F6F6",
        "gray-3": "#EDEDED",
        "gray-4": "#AEAEAE",
        "gray-5": "#505050",
      },
    },
  },

  plugins: [],
};
