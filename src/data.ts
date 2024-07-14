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

type WeekDays = 'دوشنبه' | 'سه‌شنبه' | 'چهارشنبه' | 'پنج‌شنبه' | 'جمعه' | 'شنبه' | 'یکشنبه'

export interface weekDaysChartProps {
    name: WeekDays,
    uv: number
}

let weekDaysChart: weekDaysChartProps[] = [
    {
        name: 'شنبه',
        uv: 0,
    },
    {
        name: 'یکشنبه',
        uv: 0,
    },
    {
        name: 'دوشنبه',
        uv: 0,
    },
    {
        name: 'سه‌شنبه',
        uv: 0,
    },
    {
        name: 'چهارشنبه',
        uv: 0,
    },
    {
        name: 'پنج‌شنبه',
        uv: 0,
    },
    {
        name: 'جمعه',
        uv: 0,
    },
];

export { productSortOptions, chartColors, weekDaysChart }