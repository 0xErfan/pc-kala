import Footer from "@/components/Footer"
import Header from "@/components/Header"
import ProductCart from "@/components/ProductCart";
import Button from "@/components/Button";
import Progress from "@/components/Progress";
import Link from "next/link";
import { useAppSelector } from "@/Hooks/useRedux";
import { priceDiscountCalculator } from "@/utils";

const Card = () => {

    const { BasketItem } = useAppSelector(state => state.userSlice.relatedData)

    return (
        <>
            <Header />

            <section className=" bg-primary-black text-[11px]">

                <span className='md:pt-[160px] pt-[130px] block'></span>

                <div className="container mb-8">

                    <Progress />

                    <div className="flex items-center gap-5 flex-col lg:flex-row text-white ch:rounded-md ch:p-3 mt-12 ch:bg-secondary-black">

                        <div className="lg:flex-[3.2] flex-1 mb-auto h-full">

                            <div className="sm:hidden block  flex-col items-center">
                                {
                                    BasketItem?.length
                                        ?
                                        [...BasketItem]?.map(data => {
                                            return <ProductCart
                                                key={data._id}
                                                title={data.productID.name}
                                                count={data.count}
                                                price={data.productID.price.toLocaleString('fa-Ir')}
                                                finalPrice={(data.productID.price * data.count).toLocaleString('fa-Ir')}
                                                id={data.productID._id}
                                                src="/images/laptop-default.webp"
                                            />
                                        })
                                        :
                                        <div></div>
                                }
                            </div>

                            <table className="w-full sm:block hidden text-center">


                                {
                                    BasketItem?.length
                                        ?
                                        <thead>
                                            <tr className="bg-primary-black w-full ch:p-5">
                                                <th className="max-w-full w-full">محصول</th>
                                                <th className="min-w-[120px]">قیمت</th>
                                                <th className="min-w-[60px]">تعداد</th>
                                                <th className="min-w-[120px]">جمع کل</th>
                                            </tr>
                                        </thead>
                                        : <div className="text-center w-full text-white-red font-peyda text-[16px]">سبد خرید خالی است</div>
                                }

                                <tbody>

                                    {
                                        BasketItem?.length
                                            ?
                                            BasketItem?.map(data => {
                                                return <ProductCart
                                                    key={data._id}
                                                    title={data.productID.name}
                                                    count={data.count}
                                                    price={data.productID.price.toLocaleString('fa-Ir')}
                                                    finalPrice={(data.productID.price * data.count).toLocaleString('fa-Ir')}
                                                    id={data.productID._id}
                                                    src="/images/laptop-default.webp"
                                                />
                                            })
                                            : null
                                    }

                                </tbody>
                            </table>

                            {
                                BasketItem?.length
                                    ?
                                    <div className="mt-20 border relative border-title-text rounded-md p-3">
                                        <span className="absolute w-20 h-4 p-3 bg-primary-black top-0 right-[30px] rounded-sm flex-center -translate-y-[50%]">کد تخفیف:</span>
                                        <div className="mt-5 flex items-center justify-between rounded-sm bg-primary-black border border-white/10">
                                            <input placeholder="کد تخفیف:" className="w-full text-[16px] placeholder:text-[12px] flex-[5] outline-none bg-transparent p-2" type="text" />
                                            <div className="p-2"><Button filled text="اعمال کد تخفیف" fn={() => { }} /></div>
                                        </div>
                                    </div>
                                    : null
                            }

                        </div>

                        <div className="flex-1 w-full mb-auto border border-gold/30">
                            <div className="flex items-center gap-2 text-[14px] font-peyda text-gold">
                                <div className="size-3 p-1 rounded-full bg-gold"></div>
                                <div>جمع کل سبد خرید</div>
                            </div>

                            <div className="flex gap-3 text-[12px] flex-col my-6">
                                <div className="flex items-center justify-between text-title-text">
                                    <p>جمع جزء</p>
                                    <p><span className="text-white-red">23432555</span> تومان</p>
                                </div>

                                <div className="flex items-center justify-between text-title-text">
                                    <p>مجموع</p>
                                    <p><span className="text-white-red">354665655</span> تومان</p>
                                </div>

                                <div className="flex items-center justify-between text-title-text">
                                    <p>تخفیف شما از این خرید</p>
                                    <p className="bg-blue-white p-1 rounded-xl text-[12px] text-white rounded-tl-none"><span>354665655</span> تومان</p>
                                </div>
                            </div>


                            <Link href={'/checkout'}><Button filled text="ادامه جهت تسویه حساب" fn={() => { }} /></Link>

                        </div>
                    </div>

                </div>

                <Footer />
            </section>

        </>

    )
}

export default Card