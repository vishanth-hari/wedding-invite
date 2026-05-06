/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chettinad-red': '#8B2635',
        'terracotta': '#E2725B',
        'sand': '#F4EBD0',
        'charcoal': '#2D2926', // For that modern F1/Lando contrast
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'], // Elegant for names
        'body': ['Inter', 'sans-serif'], // Clean for details
      }
    },
  },
  plugins: [],
}