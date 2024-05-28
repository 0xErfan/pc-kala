import Button from "@/components/Button"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Progress from "@/components/Progress"
import connectToDB from "@/config/db"
import { unknownObjProps } from "@/global.t"
import { transactionModel } from "@/models/Transactions"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"

const SuccessPurchase = ({ orderTransaction }: unknownObjProps<string | number>) => {

    const navigate = useRouter()

    return (
        <section className="bg-primary-black">
            <Header />

            <span className='pt-[180px] block'></span>

            <div className="container h-[500px] ">

                <Progress />

                <div className="p-3 text-center w-3/4 m-auto text-title-text font-peyda text-[30px] bg-green rounded-md">سفارش شما با موفقیت ثبت شد</div>

                <div className="flex items-center gap-3 w-3/4 m-auto mt-3">
                    <Button fn={() => navigate.replace('/profile?menu=orders')} text="مشاهده اطلاعات سفارش ها" filled />
                    <Button fn={() => navigate.replace('/')} text="خانه" />
                </div>

            </div>

            <Footer />
        </section>
    )
}

export default SuccessPurchase;

export async function getServerSideProps(context: GetServerSidePropsContext) {

    await connectToDB()
    const orderTransaction = await transactionModel.findOne({ _id: context.params?.id })
    if (!orderTransaction) return { notFound: true }

    return { props: { orderTransaction: JSON.parse(JSON.stringify(orderTransaction)) } }
}