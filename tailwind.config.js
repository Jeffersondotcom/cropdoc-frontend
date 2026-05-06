/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cropdoc: {
          light: '#e6f5eb', // Very light green
          DEFAULT: '#008751', // Nigerian Flag Green
          dark: '#005f38',
        }
      }
    },
  },
  plugins: [],
}
