import 'swiper/css';
import 'swiper/css/pagination';
import Layout from '@/components/p-admin/Layout';
import OrderCard from '@/components/p-admin/OrderCard';
import PieChartComponent from '@/components/p-admin/PieChart';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Rectangle, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { TransactionProps, unknownObjProps } from '@/global.t';
import CustomersReview from '@/components/p-admin/CustomersReview';
import connectToDB from '@/config/db';
import { transactionModel } from '@/models/Transactions';
import { getPastDateTime, roundedPrice } from '@/utils';
import TransactionsChart from '@/components/p-admin/TransactionsChart';
import mongoose from 'mongoose';
import UserModel from '@/models/User';

interface Props {
    totalIncome: number,
    transactions: TransactionProps[],
    transactionsData: unknownObjProps<number>
    performanceIndicators: { totalIncomeGrowsPercentage: number, userCountGrowsPercentage: number, transactionsCountPercentage: number }
}

const MainAdminPage = ({ totalIncome, transactions, transactionsData, performanceIndicators }: Props) => {

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

            <div className='flex flex-col gap-4 2xl:gap-8 overflow-hidden ch:overflow-hidden'>

                <div className='grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 2xl:gap-8 gap-4 pt-0'>

                    <OrderCard
                        value={transactionsData?.pending ?? '...'}
                        condition='down'
                        src='/images/totalOrder.svg'
                        bottomTitle='4% (این ماه)'
                        title='درحال ارسال'
                    />

                    <OrderCard
                        value={transactionsData?.delivered ?? '...'}
                        condition='up'
                        src='/images/totalDeliver.svg'
                        bottomTitle='12% (این ماه)'
                        title='ارسال شده'
                    />

                    <OrderCard
                        value={transactionsData?.rejected ?? '...'}
                        condition='down'
                        src='/images/totalCancel.svg'
                        bottomTitle='2% (این ماه)'
                        title='مرجوع شده'
                    />

                    <OrderCard
                        value={roundedPrice(totalIncome)}
                        condition='up'
                        src='/images/totalRevenue.svg'
                        bottomTitle='21% (این ماه)'
                        title='درامد'
                    />
                </div>

                <div className='flex xl:flex-row flex-col items-center ch:flex-1 2xl:gap-8 gap-4'>

                    <TransactionsChart chartData={transactions} />

                    <div className='bg-white rounded-xl shadow-sm flex flex-col w-full gap-3 p-6 h-[372px]'>

                        <div className='space-y-1'>
                            <h3 className='font-extrabold text-panel-darkTitle font-peyda text-[28px]'>نمودار شاخص‌های عملکرد</h3>
                            <p className='text-[#A3A3A3] text-[13px]'>نمای کلی از معیارهای کلیدی سایت را ارائه می‌دهد(نسبت به ماه پیش)</p>
                        </div>

                        <div className='flex items-center md:flex-nowrap flex-wrap justify-center gap-6 font-peyda min-h-[250px] h-full'>
                            <PieChartComponent color='red' percentage={performanceIndicators.transactionsCountPercentage} title='تراکنش ها' />
                            <PieChartComponent color='green' percentage={performanceIndicators.userCountGrowsPercentage} title='رشد کاربر' />
                            <PieChartComponent color='blue' percentage={performanceIndicators.totalIncomeGrowsPercentage} title='درامد کلی' />
                        </div>
                    </div>
                </div>

                <div className='flex xl:flex-row flex-col items-center 2xl:gap-8 gap-4'>

                    <div className='bg-white rounded-xl flex-1 shadow-sm flex flex-col w-full gap-3 p-6 xl:h-[430px] h-auto'>

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

                    <div className='bg-white rounded-xl flex-1 xl:flex-[2] shadow-sm w-full flex flex-col gap-6 p-6 xl:h-[430px] h-auto'>

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

                <CustomersReview />

            </div>

        </Layout>
    )
}

export async function getStaticProps() {

    await connectToDB()

    // -----------------------TotalIncome------------------------------

    mongoose.set('strictPopulate', false); // if the 'productID' didn't exist to populate, we won't get any error

    const currentMonthIncome = await transactionModel.find({
        createdAt: {
            $gte: getPastDateTime('MONTH'),
            $lte: new Date()
        }
    }).populate('productID', 'totalPrice');

    // ------------------------Transactions-----------------------------

    const transactions = await transactionModel.find({
        createdAt: {
            $gte: getPastDateTime('WEEK'),
            $lte: new Date()
        }
    })

    // ------------------------TransactionsStatusCount-----------------------------

    const pipeline = [
        {
            $group: {
                _id: null,
                rejected: { $sum: { $cond: [{ $eq: ["$status", "CANCELED"] }, 1, 0] } }, // if the $cond is true, return 1 else 0 and add it to the counter
                delivered: { $sum: { $cond: [{ $eq: ["$status", "DELIVERED"] }, 1, 0] } },
                pending: { $sum: { $cond: [{ $eq: ["$status", "PROCESSING"] }, 1, 0] } }
            }
        }
    ];
    // we use Mongoose's aggregate() method to perform the grouping and counting operation directly in the database instead of fetching all documents and processing them in Node.js(lead in performance issues).
    const transactionsStatusCount = await transactionModel.aggregate(pipeline);

    // -------------------------PerformanceIndicators----------------------------

    const lastMonthTransactions = await transactionModel.find({
        createdAt: {
            $gte: getPastDateTime(60),
            $lte: getPastDateTime(30)
        }
    })

    const lastMonthUserCounts = await UserModel.countDocuments({
        createdAt: {
            $gte: getPastDateTime(60),
            $lte: getPastDateTime(30)
        }
    })

    const currentMonthUsersCount = await UserModel.countDocuments({
        createdAt: {
            $gte: getPastDateTime(30),
            $lte: new Date()
        }
    })

    const lastMonthTransactionsCount = await transactionModel.countDocuments({
        createdAt: {
            $gte: getPastDateTime(60),
            $lte: getPastDateTime(30)
        }
    })

    const currentMonthTransactionsCount = await transactionModel.countDocuments({
        createdAt: {
            $gte: getPastDateTime(30),
            $lte: new Date()
        }
    })

    const lastMonthIncome = lastMonthTransactions.reduce((prev, next) => prev + next.totalPrice, 0) || 1
    const currentMonthIncome_ = currentMonthIncome.reduce((prev, next) => prev + next.totalPrice, 0) || 1

    const totalIncomeGrowsPercentage = ((currentMonthIncome_ - lastMonthIncome) / lastMonthIncome) * 100
    const userCountGrowsPercentage = ((currentMonthUsersCount - lastMonthUserCounts) / lastMonthUserCounts) * 100
    const transactionsCountPercentage = ((currentMonthTransactionsCount - lastMonthTransactionsCount) / (lastMonthTransactionsCount || 1)) * 100
    
    // -----------------------------------------------------


    return {
        props: {
            totalIncome: currentMonthIncome.reduce((prev, next) => prev + next.totalPrice, 0),
            transactions: JSON.parse(JSON.stringify(transactions)),
            transactionsData: { ...transactionsStatusCount[0] },
            performanceIndicators: { totalIncomeGrowsPercentage, userCountGrowsPercentage, transactionsCountPercentage }
        }
    }
}

export default MainAdminPage;