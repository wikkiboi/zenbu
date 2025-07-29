/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadePulse: {
          "0%, 100%": { opacity: "0" }, // Fade out at start and end
          "50%": { opacity: "1" }, // Fully visible at the midpoint
        },
      },
      animation: {
        fadePulse: "fadePulse 1.5s infinite", // Infinite looping animation
      },
      screens: {
        xs: "460px",
      },
    },
  },
  variants: {
    extend: {
      whitespace: ["hover"], // Ensure hover variants are enabled
      overflow: ["hover"],
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        dracula: {
          ...require("daisyui/src/theming/themes")["dracula"],
          accent: "#ffb86c",
        },
      },
      {
        pastel: {
          ...require("daisyui/src/theming/themes")["pastel"],
          // "--rounded-box": "0.5rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.5rem",
          accent: "#ffb86c",
          neutral: "#f0f0f0",
          primary: "#ff79c6",
          secondary: "#bd93f9",
        },
      },
    ],
  },
};
