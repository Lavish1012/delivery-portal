module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#6B21A8',
        'secondary': '#9333EA',
        'accent': '#3B0764',
        'light-bg': '#F9FAFB',
        'heading': '#581C87',
        'body': '#1F2937',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to right bottom, #9333EA, #6B21A8, #3B0764)',
        'card-gradient': 'linear-gradient(to bottom, #F9FAFB, #F3F4F6)',
      },
    },
  },
  plugins: [],
};