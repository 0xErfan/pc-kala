import { weekDaysChart } from '@/data';
import { MainPageDashboardProps } from '@/pages/admin-panel';
import { getCurrentPersianWeekday } from '@/utils';
import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const VisitsChartDate = ({ visitsData }: Partial<MainPageDashboardProps>) => {

    let lastWeekVisits = weekDaysChart.map(chartItem => ({
        ...chartItem,
        pv: 12
    }));

    lastWeekVisits = lastWeekVisits.map(data => { delete data.uv })

    const currentWeekVisits = weekDaysChart.map(chartItem => ({
        ...chartItem,
        uv: chartItem.uv
    }));

    visitsData?.lastWeekVisitsData.forEach(data => {

        const weekday = getCurrentPersianWeekday(new Date(data.createdAt).getDay());
        const chartItemIndex = lastWeekVisits.findIndex(chartData => chartData.name === weekday);
        console.log(data)

        if (chartItemIndex !== -1) {
            lastWeekVisits[chartItemIndex] = {
                ...lastWeekVisits[chartItemIndex],
                pv: lastWeekVisits[chartItemIndex].pv += data.count
            };
        }
    });

    visitsData?.currentWeekVisitsData.forEach(data => {

        const weekday = getCurrentPersianWeekday(new Date(data.createdAt).getDay());
        const chartItemIndex = currentWeekVisits.findIndex(chartData => chartData.name === weekday);

        if (chartItemIndex !== -1) {
            currentWeekVisits[chartItemIndex] = {
                ...currentWeekVisits[chartItemIndex],
                uv: currentWeekVisits[chartItemIndex].uv += data.count
            };
        }
    });

    return (
        <div className='bg-white rounded-xl flex-1 shadow-sm flex flex-col w-full gap-3 p-6 xl:h-[430px] h-auto'>

            <div>
                <h4 className='font-bold text-2xl text-panel-darkTitle font-peyda'>نمودار بازدید ها</h4>
                <p className='font-sans text-[12px] text-panel-caption flex items-center justify-start'>نمودار تعداد بازدید ها در روز های مختلف هفته</p>
            </div>

            <ResponsiveContainer className={'text-panel-caption text-sm font-peyda'} width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={currentWeekVisits}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis tickMargin={40} width={80} />
                    <Tooltip formatter={(value) => [`${value}`, 'بازدید']} />
                    <Legend />
                    <Bar dataKey="pv" fill="#FF5B5B" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                    <Bar dataKey="uv" fill="#00B074" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default VisitsChartDate