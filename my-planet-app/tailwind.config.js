/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",   // ← This is crucial
  ],
  theme: {
    extend: {
      fontFamily: {
  satoshi: ["Satoshi", "sans-serif"],
},
    },
  },
  plugins: [],
}