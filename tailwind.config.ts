// @ts-nocheck
/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      padding: {
        DEFAULT: "14px",
        "md": "20px",
        "sm": "12px"
      }
    },

    extend: {

      colors: {
        "dark-red": "#E30017",
        "white-red": "#FD0019",
        "off-bgColor": "#ee273a",

        "blue-dark": "#0C8BF6",
        "blue-white": "#62B7FF",

        "gold": "#FFD300",
        "dark-gold": "rgb(255 211 0 / 10%)",

        "green": "#16723A",

        "primary-black": "#292A2D",
        "secondary-black": "#202124",

        "title-text": "#e3e3e3",
        "description-text": "#b7b7b7"
      },
      fontFamily: {
        "sans": "sans",
        "peyda": "peyda",
      },
      boxShadow: {
        "regular": `0px 0px 23px 0px rgba(0,0,0,0.46)`
      }
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('ch', '& > *');
      addVariant('ch-hover', '& > *:hover');
    }
  ],
};
export default config;