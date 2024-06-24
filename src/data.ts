const productSortOptions = [
    { text: "ارزان‌ترین", sort: "cheap" },
    { text: "گران‌ترین", sort: "exp" },
    { text: "پرفروش‌ترین‌", sort: "well-sell" },
]

const chartColors = {
    red: {
        light: 'rgba(255, 91, 91, 0.15)',
        dark: '#FF5B5B'
    },
    green: {
        light: 'rgba(0, 175, 116, 0.15)',
        dark: '#00B074'
    },
    blue: {
        light: 'rgba(45, 156, 219, 0.15)',
        dark: '#2D9CDB'
    }
}

export { productSortOptions, chartColors }