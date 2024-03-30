/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
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
                "sans-thin": "sans-thin",
                "peyda": "peyda",
            }
        },
    },
    plugins: [
        function ({ addVariant }) {
            addVariant('ch', '& > *');
            addVariant('ch-hover', '& > *:hover');
        }
    ],
}