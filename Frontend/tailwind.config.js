/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: "20px",
                "lg": "10px",
            },
        },

        extend: {
            screens: {
                "xs": "460px",
            },
        },
    },
    plugins: [
        function ({ addVariant }) {
            addVariant('ch', '& > *');
            addVariant('ch-hover', '& > *:hover');
        }
    ],
}

