/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        greendoc: {
          light: '#22c55e',
          DEFAULT: '#16a34a',
          dark: '#2d5a36',
        }
      }
    },
  },
  plugins: [],
}
