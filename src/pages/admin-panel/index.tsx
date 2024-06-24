import Layout from '@/components/p-admin/Layout';
import OrderCard from '@/components/p-admin/OrderCard';
import PieChartComponent from '@/components/p-admin/PieChart';
import { FaAngleLeft } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Rectangle, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import CustomerReview from './CustomerReview';

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
            name: 'پنجشنبه',
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

            <div className='flex flex-col gap-4 2xl:gap-8'>

                <div className='space-y-1'>
                    <h3 className='font-extrabold text-panel-darkTitle font-peyda text-[28px]'>داشبرد</h3>
                    <p className='text-[#A3A3A3] text-[13px]'>سلام عرفان. به پنل ادمین پیسی کالا خوشومدی</p>
                </div>

                <div className='grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 2xl:gap-8 gap-4 pt-10'>

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

                        <div className='flex items-center justify-between'>
                            <div>
                                <h4 className='font-bold text-2xl text-panel-darkTitle font-peyda'>نمودار تراکنش ها</h4>
                                <p className='font-sans text-[12px] text-panel-caption flex items-center justify-start'>نمودار تعداد تراکنش ها در روز های مختلف هفته</p>
                            </div>
                            <button className='border border-panel-darkBlue font-bold transition-all duration-300 hover:bg-panel-darkBlue hover:text-white flex items-center gap-2 font-peyda rounded-md text-panel-darkBlue text-sm text-center p-3'>
                                <p>دانلود تراکنش ها</p>
                                <MdOutlineFileDownload className='size-[22px]' />
                            </button>
                        </div>

                        <div className='flex items-center justify-evenly h-[250px] font-peyda'>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    width={500}
                                    height={400}
                                    data={data}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis tickMargin={40} width={80} />
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

                        <div className='flex items-center md:flex-nowrap flex-wrap justify-center gap-6 font-peyda min-h-[250px] h-full'>
                            <PieChartComponent color='red' percentage={81} title='تراکنش ها' />
                            <PieChartComponent color='green' percentage={22} title='رشد مشتری' />
                            <PieChartComponent color='blue' percentage={62} title='درامد کلی' />
                        </div>
                    </div>
                </div>

                <div className='flex xl:flex-row flex-col items-center 2xl:gap-8 gap-4'>

                    <div className='bg-white rounded-xl flex-1 shadow-sm flex flex-col w-full gap-3 p-6 h-[430px]'>

                        <div>
                            <h4 className='font-bold text-2xl text-panel-darkTitle font-peyda'>نمودار تراکنش ها</h4>
                            <p className='font-sans text-[12px] text-panel-caption flex items-center justify-start'>نمودار تعداد تراکنش ها در روز های مختلف هفته</p>
                        </div>

                        <ResponsiveContainer className={'text-panel-caption text-sm font-peyda'} width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={data}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis tickMargin={40} width={80} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="pv" fill="#FF5B5B" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                                <Bar dataKey="uv" fill="#00B074" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className='bg-white rounded-xl flex-[2] shadow-sm w-full flex flex-col gap-6 p-6 h-[430px]'>

                        <div>
                            <h4 className='font-bold text-2xl text-panel-darkTitle font-peyda'>نمودار تراکنش ها</h4>
                            <p className='font-sans text-[12px] text-panel-caption flex items-center justify-start'>نمودار تعداد تراکنش ها در روز های مختلف هفته</p>
                        </div>

                        <ResponsiveContainer className={'text-panel-caption text-sm font-peyda'} width="100%" height="100%">
                            <LineChart
                                width={500}
                                height={300}
                                data={data}
                            >
                                <XAxis dataKey="name" />
                                <YAxis tickMargin={40} width={80} />
                                <ReferenceLine y={2500} stroke="#E0E0E0" />
                                <ReferenceLine y={5000} stroke="#E0E0E0" />
                                <ReferenceLine y={7500} stroke="#E0E0E0" />
                                <ReferenceLine y={10000} stroke="#E0E0E0" />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                </div>

                <div className='flex flex-col gap-5'>

                    <div className='flex items-center justify-between'>
                        <div>
                            <h4 className='font-bold text-2xl text-panel-darkTitle font-peyda'>نظرات مشتری ها</h4>
                            <p className='font-sans text-[12px] text-panel-caption flex items-center justify-start'>جدید ترین نظرات ثبت شده توسط خریداران</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <button className='shadow-sm bg-white font-bold transition-all duration-300 hover:bg-panel-darkGreen hover:text-white flex items-center gap-2 font-peyda rounded-xl text-panel-darkGreen text-sm text-center p-3'>
                                <FaAngleLeft className=' rotate-180 size-[22px]' />
                            </button>
                            <button className='shadow-sm bg-white font-bold transition-all duration-300 hover:bg-panel-darkGreen hover:text-white flex items-center gap-2 font-peyda rounded-xl text-panel-darkGreen text-sm text-center p-3'>
                                <FaAngleLeft className='size-[22px]' />
                            </button>
                        </div>
                    </div>

                    <div className='flex items-center gap-30'>
                        <CustomerReview />
                    </div>
                </div>

            </div>


            <div className='h-[100px]'></div>

        </Layout>
    )
}

export default MainAdminPage;