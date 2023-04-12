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
      width: {
        "sidebar-settings-open": "350px",
        "sidebar-settings-closed": "65px"
      },
      keyframes: {
        "scale-in": {
          "0%": { transform: "scale(.5)" },
          "100%": { transform: "scale(1)" },
        },
        "slide-in-from-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "slide-in-to-right": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "height-from-top": {
          "0%": { height: "0px" },
          "100%": { height: "100%" },
        }
      },
      animation: {
        "scaling-in": "scale-in 100ms",
        "sliding-in-from-right": "slide-in-from-right 100ms",
        "sliding-in-to-right": "slide-in-to-right 100ms forwards",
        "height-from-top": "height-from-top 300ms",
      },
      gridTemplateRows: {
        "auto": "repeat(auto-fit, minmax(300px, 1fr))"
      },
      gridTemplateColumns: {
        "auto": "repeat(auto-fit, minmax(300px, 1fr))"
      }
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
