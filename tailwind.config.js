/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-yellow': '#F9E27C',
        'brand-orange': '#F26F54',
        'brand-pink': '#F4A5AE',
        'brand-blue': '#8BB3D2',
        'brand-green': '#A3C691',
        'brand-dark': '#3A3837',
        'brand-light': '#FDF9F1'
      },
      fontFamily: {
        'sans': ['"Comic Sans MS"', '"Chalkboard SE"', '"Comic Neue"', 'sans-serif'],
        'serif': ['"Georgia"', 'serif'],
      }
    },
  },
  plugins: [],
}