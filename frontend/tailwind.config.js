/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      keyframes: {
        shine: {
          from: { '-webkit-mask-position': '150%' },
          to: { '-webkit-mask-position': '-50%' },
        },
      },
      animation: {
        shine: 'shine 2s infinite',
      },
    },
  },
  plugins: [],
};


