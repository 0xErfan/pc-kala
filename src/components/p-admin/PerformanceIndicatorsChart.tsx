import PieChartComponent from '@/components/p-admin/PieChart';
import { MainPageDashboardProps } from '@/pages/admin-panel';

const PerformanceIndicatorsChart = ({ performanceIndicators }: Partial<MainPageDashboardProps>) => {
    return (
        <div className='bg-white rounded-xl shadow-sm flex flex-col w-full gap-3 p-6 h-[372px]'>

            <div className='space-y-1'>
                <h3 className='font-extrabold text-panel-darkTitle font-peyda text-[28px]'>نمودار شاخص‌های عملکرد</h3>
                <p className='text-[#A3A3A3] text-[13px]'>نمای کلی از معیارهای کلیدی سایت را ارائه می‌دهد(نسبت به ماه پیش)</p>
            </div>

            <div className='flex items-center md:flex-nowrap flex-wrap justify-center gap-6 font-peyda min-h-[250px] h-full'>
                <PieChartComponent color='red' percentage={performanceIndicators?.transactionsCountPercentage!} title='تراکنش ها' />
                <PieChartComponent color='green' percentage={performanceIndicators?.userCountGrowsPercentage!} title='رشد کاربر' />
                <PieChartComponent color='blue' percentage={performanceIndicators?.totalIncomeGrowsPercentage!} title='درامد کلی' />
            </div>
        </div>
    )
}

export default PerformanceIndicatorsChart