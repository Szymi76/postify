/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "'Poppins', sans-serif",
        ],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#3b82f6",
          "secondary": "#e2e8f0",
          "accent": "#4B5563",
          "neutral": "#ffffff",
          "base-100": "#F1F5F9",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      }
    ]
  }
};

module.exports = config;
