import Layout from '@/components/p-admin/Layout';
import OrderCard from '@/components/p-admin/OrderCard';

const MainAdminPage = () => {
    return (
        <Layout>

            <div>
                <h3 className='font-extrabold text-panel-darkTitle font-peyda text-[28px]'>داشبرد</h3>
                <p className='text-[#A3A3A3] text-[13px]'>سلام عرفان. به پنل ادمین پیسی کالا خوشومدی</p>
            </div>

            <div className='grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 2xl:gap-8 gap-4 py-10'>

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

        </Layout>
    )
}

export default MainAdminPage;