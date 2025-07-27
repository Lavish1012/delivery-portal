/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ← CRITICAL: This enables class-based dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#ffffff',
          dark: '#1a1c22',
        },
        onSurface: {
          DEFAULT: '#1a1c22', 
          dark: '#f1f5f9',
        },
        primary: {
          DEFAULT: '#3b82f6',
          dark: '#60a5fa',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
  important: true
}
