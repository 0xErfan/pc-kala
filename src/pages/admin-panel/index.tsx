import Layout from '@/components/p-admin/Layout';
import OrderCard from '@/components/p-admin/OrderCard';
import PieChartComponent from '@/components/p-admin/PieChart';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const MainAdminPage = () => {

    const data = [
        {
            name: 'شنبه',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'یک شنبه',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'دوشنبه',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'سه شنبه',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'چهارشنبه',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'جمعه',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
    ];

    return (
        <Layout>

            <div className='space-y-1'>
                <h3 className='font-extrabold text-panel-darkTitle font-peyda text-[28px]'>داشبرد</h3>
                <p className='text-[#A3A3A3] text-[13px]'>سلام عرفان. به پنل ادمین پیسی کالا خوشومدی</p>
            </div>

            <div className='grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 2xl:gap-8 gap-4 pt-10 py-4 2xl:py-8'>

                <OrderCard
                    value='23'
                    condition='down'
                    src='/images/totalOrder.svg'
                    bottomTitle='4% (این ماه)'
                    title='سفارشات'
                />

                <OrderCard
                    value='432'
                    condition='up'
                    src='/images/totalDeliver.svg'
                    bottomTitle='12% (این ماه)'
                    title='ارسال شده'
                />

                <OrderCard
                    value='51'
                    condition='down'
                    src='/images/totalCancel.svg'
                    bottomTitle='2% (این ماه)'
                    title='مرجوع شده'
                />

                <OrderCard
                    value='32M'
                    condition='up'
                    src='/images/totalRevenue.svg'
                    bottomTitle='21% (این ماه)'
                    title='درامد'
                />
            </div>

            <div className='flex xl:flex-row flex-col items-center ch:flex-1 2xl:gap-8 gap-4'>

                <div className='bg-white rounded-xl shadow-sm w-full flex flex-col gap-6 p-6'>

                    <div>
                        <h4 className='font-bold text-2xl text-panel-darkTitle font-peyda'>نمودار تراکنش ها</h4>
                        <p className='font-sans text-[12px] text-panel-caption flex items-center justify-start'>نمودار تعداد تراکنش ها در روز های مختلف هفته</p>
                    </div>

                    <div className='flex items-center justify-evenly h-[250px] font-peyda'>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                width={500}
                                height={400}
                                data={data}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="uv" stroke="#2D9CDB" fill="#2D9CDB" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                </div>

                <div className='bg-white rounded-xl shadow-sm flex flex-col w-full gap-3 p-6 h-[372px]'>

                    <div className='space-y-1'>
                        <h3 className='font-extrabold text-panel-darkTitle font-peyda text-[28px]'>نمودار شاخص‌های عملکرد</h3>
                        <p className='text-[#A3A3A3] text-[13px]'>نمای کلی از معیارهای کلیدی سایت را ارائه می‌دهد</p>
                    </div>

                    <div className='flex items-center justify-evenly font-peyda h-[250px]'>
                        <PieChartComponent color='red' percentage={81} title='تراکنش ها' />
                        <PieChartComponent color='green' percentage={22} title='رشد مشتری' />
                        <PieChartComponent color='blue' percentage={62} title='درامد کلی' />
                    </div>
                </div>
            </div>

            <div className='h-[1000px]'></div>

        </Layout>
    )
}

export default MainAdminPage;