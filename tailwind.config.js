/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        header: ['Neue Haas Grotesk Display Pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
