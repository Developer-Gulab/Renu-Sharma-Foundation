/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#93c5fd", 
        hoverblue: "#60a5fa", 
        countryedu: "#3c72fc",
        colo:"#151327",
        colo1:"#16142c"
      },
    },
  },
  plugins: [],
};


