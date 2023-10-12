const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'inter': ['Inter', 'sans-serif'],
    },
    colors: {
      ...colors,
      primary: "#0F244E",
      "body-bg": "#F1F2F6"
    },
    extend: {},
  },
  plugins: [],
}