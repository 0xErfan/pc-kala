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

    const data = [
        { value: 35, fill: colors.light },
        { value: 65, fill: colors.dark },
    ];

    return (

        <div className='flex flex-col items-center justify-center gap-4'>

            <div className='size-[152px] flex flex-col relative'>
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

                <span className='absolute top-[50%] right-[28%] -translate-x-[50%] -translate-y-[50%] text-black text-xl'>{percentage}%</span>
            </div>

            <p className='text-panel-darkTitle'>{title}</p>
        </div>
    )
}

export default memo(PieChartComponent);