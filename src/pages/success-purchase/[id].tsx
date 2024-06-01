import Button from "@/components/Button"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Progress from "@/components/Progress"
import connectToDB from "@/config/db"
import { unknownObjProps } from "@/global.t"
import { transactionModel } from "@/models/Transactions"
import { totalPriceCalculator } from "@/utils"
import { GetServerSidePropsContext } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import { useMemo } from "react"

const SuccessPurchase = ({ transactionData }: unknownObjProps<string | number>) => {

    const navigate = useRouter()

    const sumOfProductsWithDiscount = useMemo(() => {
        let sum = 0
        transactionData?.productsList?.map(({ productID, count, services }) => { sum += totalPriceCalculator(productID.price, productID.discount, count, services) })
        return +sum
    }, [transactionData?.productsList])

    return (
        <section className="bg-primary-black">
            <Header />

            <span className='pt-[180px] block'></span>

            <div className="container mb-12">

                <Progress />

                <div className="flex gap-5">

                    <div className="flex-1 ch:bg-secondary-black ch:p-3 gap-1 flex flex-col ch:rounded-sm">

                        <div className="text-[13px] flex flex-col gap-4 text-description-text">

                            <h3 className="text-center font-peyda text-xl text-gold pb-3">اطلاعات سفارش</h3>

                            <div className="flex justify-between">

                                <p className="font-peyda text-md">وضعیت سفارش:</p>

                                <p className={`${transactionData?.status == 'PROCESSING' ? 'text-dark-gold/70' : transactionData?.status == 'DELIVERED' ? 'text-green' : 'text-white-red'}`}>
                                    {
                                        transactionData?.status == 'DELIVERED'
                                            ?
                                            'ارسال موفق'
                                            :
                                            transactionData?.status == 'PROCESSING'
                                                ?
                                                'درحال ارسال'
                                                :
                                                'مرجوع شده'
                                    }
                                </p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-peyda text-md">کد سفارش:</p>
                                <p dir="ltr">#{transactionData?._id.slice(-6, -1).toUpperCase()}</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-peyda text-md">وضعیت پرداخت:</p>
                                <p>تسویه شده</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-peyda text-md">جمع خرید:</p>
                                <p> {sumOfProductsWithDiscount.toLocaleString('fa-IR')} تومان </p>
                            </div>

                        </div>

                        <div className="text-[13px] flex flex-col gap-4 text-description-text font-peyda">

                            <div className="font-bold flex justify-between">
                                <p>نام و نام خانوادگی: </p>
                                <p className="font-sans">{transactionData?.customerData.name + ' ' + transactionData?.customerData.lName}</p>
                            </div>

                            <div className="font-bold flex justify-between">
                                <p>ادرس: </p>
                                <p className="font-sans">{'ایران - ' + transactionData?.customerData.ostan + ' - ' + transactionData?.customerData.province}</p>
                            </div>

                        </div>

                    </div>

                    <div className="flex-[2]  rounded-sm space-y-2">

                        {
                            transactionData?.productsList?.length
                            &&
                            transactionData?.productsList.map(data => <UserOrder key={data.productID._id} {...data} />)
                        }

                        <div className="border p-3 border-gray-500 rounded-sm flex justify-between font-peyda">

                            <div className="flex items-center gap-2">
                                <p className="text-gold/75">کد سفارش: </p>
                                <p dir="ltr" className="text-description-text font-bold"> # {transactionData._id.slice(-6, -1).toUpperCase()}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <p className="text-gold/75">مجموع: </p>
                                <div className="text-description-text font-sans font-bold mt-1"> <span>{sumOfProductsWithDiscount.toLocaleString('fa-IR')}</span> تومان </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 m-auto mt-3 justify-start w-full">
                            <Button fn={() => navigate.replace('/profile?menu=orders')} text="مشاهده پروفایل " filled />
                            <Button fn={() => navigate.replace('/')} text="خانه" />
                        </div>

                    </div>

                </div>
            </div>

            <Footer />
        </section>
    )
}

export default SuccessPurchase;

export async function getServerSideProps(context: GetServerSidePropsContext) {

    await connectToDB()

    const transactionData = await transactionModel.findOne({ _id: context.params?.id })
    if (!transactionData) return { notFound: true }

    return { props: { transactionData: JSON.parse(JSON.stringify(transactionData)) } }
}

const UserOrder = ({ productID, count, services }) => {

    return (
        <div className="border p-2 border-gray-500 flex flex-col">

            <div className="flex gap-2 ch:h-18 ch:m-auto">

                <div className="size-24">
                    <Image
                        className=" object-cover bg-center flex-1 h-full w-full"
                        alt={productID.name}
                        width={100}
                        height={100}
                        quality={100}
                        loading="lazy"
                        src='/images/laptop-default.webp'
                    />
                </div>

                <div className="flex-[4] mb-auto">
                    <p className="text-title-text text-md">{productID.name}</p>
                </div>

            </div>

            <div className="flex justify-between text-description-text">
                <div>تعداد:  <span className="text-white-red font-peyda">{count}</span> </div>
                <div><span className="text-white-red">{totalPriceCalculator(productID.price, productID.discount, count, services, true).toLocaleString('fa-IR')}</span> تومان </div>
            </div>
        </div>
    )
}