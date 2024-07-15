import 'swiper/css';
import 'swiper/css/pagination';
import Layout from '@/components/p-admin/Layout';
import OrderCard from '@/components/p-admin/OrderCard';
import { TransactionProps, unknownObjProps } from '@/global.t';
import CustomersReview from '@/components/p-admin/CustomersReview';
import connectToDB from '@/config/db';
import { transactionModel } from '@/models/Transactions';
import { getPastDateTime, roundedPrice } from '@/utils';
import TransactionsChart from '@/components/p-admin/TransactionsChart';
import mongoose from 'mongoose';
import UserModel from '@/models/User';
import VisitModel from '@/models/Visit';
import PerformanceIndicatorsChart from '@/components/p-admin/PerformanceIndicatorsChart';
import VisitsChartDate from '@/components/p-admin/VisitsChartDate';

export interface MainPageDashboardProps {
    totalIncome: number,
    transactions: TransactionProps[],
    transactionsData: [unknownObjProps<unknownObjProps<number>>]
    performanceIndicators: { totalIncomeGrowsPercentage: number, userCountGrowsPercentage: number, transactionsCountPercentage: number }
    visitsData: { lastWeekVisitsData: { count: number, createdAt: string, date: string }[], currentWeekVisitsData: { count: number, createdAt: string, date: string }[] }
}

const MainAdminPage = ({ totalIncome, transactions, transactionsData, performanceIndicators, visitsData }: MainPageDashboardProps) => {

    const { rejected, pending, delivered } = transactionsData[0]

    return (
        <Layout>

            <div className='flex flex-col gap-4 2xl:gap-8 overflow-hidden ch:overflow-hidden'>

                <div className='grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 2xl:gap-8 gap-4 pt-0'>

                    <OrderCard
                        value={pending.count}
                        condition={`${pending.percentage >= 0 ? 'up' : 'down'}`}
                        src='/images/totalOrder.svg'
                        bottomTitle={`${pending.percentage < -100 ? -100 : pending.percentage > 100 ? 100 : pending.percentage}% (این ماه)`}
                        title='درحال ارسال'
                    />

                    <OrderCard
                        value={delivered.count}
                        condition={`${delivered.percentage >= 0 ? 'up' : 'down'}`}
                        src='/images/totalDeliver.svg'
                        bottomTitle={`${delivered.percentage < -100 ? -100 : delivered.percentage > 100 ? 100 : delivered.percentage}% (این ماه)`}
                        title='ارسال شده'
                    />

                    <OrderCard
                        value={rejected.count}
                        condition={`${rejected.percentage >= 0 ? 'up' : 'down'}`}
                        src='/images/totalCancel.svg'
                        bottomTitle={`${rejected.percentage < -100 ? -100 : rejected.percentage > 100 ? 100 : rejected.percentage}% (این ماه)`}
                        title='مرجوع شده'
                    />

                    <OrderCard
                        value={roundedPrice(totalIncome)}
                        condition={`${performanceIndicators.totalIncomeGrowsPercentage.toString().includes('-') ? 'down' : 'up'}`}
                        src='/images/totalRevenue.svg'
                        bottomTitle={`${performanceIndicators.totalIncomeGrowsPercentage > 100 ? 100 : performanceIndicators.totalIncomeGrowsPercentage}% (این ماه)`}
                        title='درامد'
                    />
                </div>

                <div className='flex xl:flex-row flex-col items-center ch:flex-1 2xl:gap-8 gap-4'>

                    <TransactionsChart chartData={transactions} />

                    <PerformanceIndicatorsChart performanceIndicators={performanceIndicators} />

                </div>

                <div className='flex xl:flex-row flex-col items-center 2xl:gap-8 gap-4'>
                    <VisitsChartDate visitsData={visitsData} />
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

    // we use Mongoose's aggregate() method to perform the grouping and counting operation directly in the database instead of fetching all documents and processing them in Node.js(lead in performance issues).
    const transactionsStatusCount = await transactionModel.aggregate([
        {
            $match: {
                createdAt: { $gte: getPastDateTime('MONTH') }
            }
        },
        {
            $group: {
                _id: null,
                rejected: { $sum: { $cond: [{ $eq: ["$status", "CANCELED"] }, 1, 0] } }, // if the $cond is true, return 1 else 0 and add it to the counter
                delivered: { $sum: { $cond: [{ $eq: ["$status", "DELIVERED"] }, 1, 0] } },
                pending: { $sum: { $cond: [{ $eq: ["$status", "PROCESSING"] }, 1, 0] } }
            }
        }
    ]);

    const lastMonthTransactionsStatusCount = await transactionModel.aggregate([
        {
            $match: {
                createdAt: { $gte: getPastDateTime(60), $lt: getPastDateTime(30) }
            }
        },
        {
            $group: {
                _id: null,
                rejected: { $sum: { $cond: [{ $eq: ["$status", "CANCELED"] }, 1, 0] } },
                delivered: { $sum: { $cond: [{ $eq: ["$status", "DELIVERED"] }, 1, 0] } },
                pending: { $sum: { $cond: [{ $eq: ["$status", "PROCESSING"] }, 1, 0] } }
            }
        }
    ]);

    const transactionsStatusCountData = {
        rejected: {
            percentage: ((transactionsStatusCount[0]?.rejected || 0) - (lastMonthTransactionsStatusCount[0]?.rejected || 0)) / (lastMonthTransactionsStatusCount[0]?.rejected || 1) * 100,
            count: transactionsStatusCount[0]?.rejected
        },
        delivered: {
            percentage: ((transactionsStatusCount[0]?.delivered || 0) - (lastMonthTransactionsStatusCount[0]?.delivered || 0)) / (lastMonthTransactionsStatusCount[0]?.delivered || 1) * 100,
            count: transactionsStatusCount[0]?.delivered
        },
        pending: {
            percentage: ((transactionsStatusCount[0]?.pending || 0) - (lastMonthTransactionsStatusCount[0]?.pending || 0)) / (lastMonthTransactionsStatusCount[0]?.pending || 1) * 100,
            count: transactionsStatusCount[0]?.pending
        }
    }

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

    // -------------------------VisitsData----------------------------

    const lastWeekVisitsData = await VisitModel.find({ date: { $gte: getPastDateTime(14), $lte: getPastDateTime(6) } }, 'count date')
    const currentWeekVisitsData = await VisitModel.find({ date: { $gte: getPastDateTime(7), $lte: new Date() } }, 'count date')

    return {
        props: {
            totalIncome: currentMonthIncome.reduce((prev, next) => prev + next.totalPrice, 0),
            transactions: JSON.parse(JSON.stringify(transactions)),
            transactionsData: [transactionsStatusCountData],
            performanceIndicators: { totalIncomeGrowsPercentage, userCountGrowsPercentage, transactionsCountPercentage },
            visitsData: JSON.parse(JSON.stringify({ lastWeekVisitsData, currentWeekVisitsData }))
        }
    }
}

export default MainAdminPage;