/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        "drop-down": {
          "0%": {transform: "translateY(-100%)"},
          "100%": {transform: "translateY(0%)", opacity: "1"}
        }
      },
      colors: {
        gray: {
          450: '#a3a3a3'
        },
      },
      animation: {
        "drop-down": "drop-down 0.35s ease-out forwards",
      }
    }
  },
  plugins: [],
}