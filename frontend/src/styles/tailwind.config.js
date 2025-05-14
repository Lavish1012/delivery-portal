module.exports = {
  darkMode: "class", // Enable class-based dark mode
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
    "./cypress/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-bg": "#1a202c",
        "dark-text": "#f7fafc",
        "dark-border": "#2d3748",
        primary: "#1a73e8",
        secondary: "#fbbc05",
        accent: "#34a853",
        danger: "#ea4335",
        background: "#f9f9f9",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [],
};