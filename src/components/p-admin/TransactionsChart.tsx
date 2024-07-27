import { weekDaysChart } from '@/data'
import { TransactionProps } from '@/global.t'
import { getCurrentPersianWeekday } from '@/utils'
import Link from 'next/link'
import { MdOutlineFileDownload } from 'react-icons/md'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const TransactionsChart = ({ chartData }: { chartData: TransactionProps[] }) => {

    const updatedChartData = weekDaysChart.map(chartItem => ({
        ...chartItem,
        uv: chartItem.uv
    }));

    chartData.forEach(data => {

        const now = new Date().getDay()
        const currentDay = now == 6 ? 0 : now

        const transactionWeekDay = new Date(data.createdAt).getDay() == 6 ? 0 : new Date(data.createdAt).getDay()
        const weekday = getCurrentPersianWeekday(transactionWeekDay);

        console.log(currentDay , transactionWeekDay)

        const chartItemIndex = updatedChartData.findIndex(chartData => chartData.name === weekday && (currentDay >= transactionWeekDay));

        // we don't want to show any data from last week دوشنبه if we are in شنبه right now
        if (chartItemIndex !== -1) {
            updatedChartData[chartItemIndex] = {
                ...updatedChartData[chartItemIndex],
                uv: updatedChartData[chartItemIndex].uv + 1
            };
        }
    });

    const chartDataUrl = encodeURIComponent(JSON.stringify(chartData))

    const maxValueInChart = updatedChartData.reduce((prev, next) => (prev > next.uv ? prev : next.uv), 0)

    return (
        <div className='bg-white rounded-xl shadow-sm w-full flex flex-col gap-6 p-6'>

            <div className='flex items-center justify-between'>
                <div>
                    <h4 className='font-bold text-2xl text-panel-darkTitle font-peyda'>نمودار تراکنش ها</h4>
                    <p className='font-sans text-[12px] text-panel-caption flex items-center justify-start'>نمودار تعداد تراکنش ها در روز های مختلف هفته</p>
                </div>
                <button className='border border-panel-darkBlue font-bold transition-all duration-300 hover:bg-panel-darkBlue hover:text-white flex items-center gap-2 font-peyda rounded-md text-panel-darkBlue text-sm text-center p-3'>
                    <Link href={`data:text/json;charset=utf-8,${chartDataUrl}`} download={'This week transactions hah'}>دانلود تراکنش ها</Link>
                    <MdOutlineFileDownload className='size-[22px]' />
                </button>
            </div>

            <div className='flex items-center justify-evenly h-[250px] font-peyda'>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={updatedChartData}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis
                            tickFormatter={tick => Math.round(tick).toString()}
                            tickMargin={40}
                            width={80}
                            domain={[0, maxValueInChart % 2 == 0 ? maxValueInChart : maxValueInChart + 1]}
                        />
                        <Tooltip formatter={(value) => [`${value}`, 'تعداد']} />
                        <Area type="monotone" dataKey="uv" stroke="#2D9CDB" fill="#2D9CDB" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

        </div>
    )
}

export default TransactionsChart