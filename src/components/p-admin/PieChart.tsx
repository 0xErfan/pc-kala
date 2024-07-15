import { chartColors } from '@/data'
import React, { memo } from 'react'
import { Pie, PieChart, ResponsiveContainer } from 'recharts'

interface Props {
    percentage: number
    color: 'red' | 'green' | 'blue'
    title: string
}

const PieChartComponent = ({ percentage, color, title }: Props) => {

    const colors = Object.entries(chartColors).find(c => c[0] == color)![1]
    const finalPercentage = percentage > 100 ? 100 : percentage < -100 ? -100 : percentage

    const data = [
        { value: percentage > 100 ? 0 : 100 - percentage, fill: colors.light },
        { value: finalPercentage >= 0 ? finalPercentage : 0, fill: colors.dark },
    ];

    return (

        <div className='flex flex-col items-center relative justify-center gap-4'>

            <div className='size-[152px] flex flex-col'>
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={75}
                        />
                    </PieChart>
                </ResponsiveContainer>

            </div>

            <span dir='ltr' className='absolute top-[50%] right-[50%] translate-x-[50%] -translate-y-[100%] text-black text-xl'>{finalPercentage}%</span>

            <p className='text-panel-darkTitle'>{title}</p>
        </div>
    )
}

export default memo(PieChartComponent);