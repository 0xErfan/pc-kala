import Footer from "../components/Footer"
import Header from "../components/Header"
import ProductCart from "../components/ProductCart";
import Button from "../components/Button";
import Progress from "../components/Progress";
import { Link } from "react-router-dom";

const Card = () => {

    return (
        <>
            <Header />

            <section className=" bg-primary-black text-[11px]">

                <span className='md:pt-[160px] pt-[130px] block'></span>

                <div className="container mb-8">

                    <Progress />

                    <div className="flex items-center gap-5 flex-col lg:flex-row text-white ch:rounded-md ch:p-3 mt-12 ch:bg-secondary-black">

                        <div className="lg:flex-[3.2] flex-1">

                            <div className="sm:hidden block  flex-col items-center">
                                {
                                    [2, 43, 2].map(prd => {
                                        return <ProductCart
                                            key={prd}
                                            title="لپ تاپ ایسوس TUF Gaming F15 FX507VV4-AB i9-13900H/16GB/512GB/RTX4060-8G - گارانتی 18 ماهه شرکتی"
                                            count={12}
                                            price={12343523}
                                            finalPrice={34523455}
                                            id={12}
                                            src="/images/victus-15.webp"
                                        />
                                    })
                                }
                            </div>

                            <table className="w-full sm:block hidden text-center">

                                <thead>
                                    <tr className="bg-primary-black ch:p-5">
                                        <td>محصول</td>
                                        <td>قیمت</td>
                                        <td>تعداد</td>
                                        <td>جمع جزء</td>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        [2, 43, 2].map(prd => {
                                            return <ProductCart
                                                key={prd}
                                                title="لپ تاپ ایسوس TUF Gaming F15 FX507VV4-AB i9-13900H/16GB/512GB/RTX4060-8G - گارانتی 18 ماهه شرکتی"
                                                count={12}
                                                price={12343523}
                                                finalPrice={34523455}
                                                id={12}
                                                src="/images/victus-15.webp"
                                            />
                                        })
                                    }

                                </tbody>
                            </table>

                            <div className="mt-20 border relative border-title-text rounded-md p-3">
                                <span className="absolute w-20 h-4 p-3 bg-primary-black top-0 right-[30px] rounded-sm flex-center -translate-y-[50%]">کد تخفیف:</span>
                                <div className="mt-5 flex items-center justify-between rounded-sm bg-primary-black border border-white/10">
                                    <input placeholder="کد تخفیف:" className="w-full text-[16px] placeholder:text-[12px] flex-[5] outline-none bg-transparent p-2" type="text" />
                                    <div className="p-2"><Button filled text="اعمال کد تخفیف" fn={() => { }} /></div>
                                </div>
                            </div>

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


                            <Link to={'/checkout'}><Button filled text="ادامه جهت تسویه حساب" fn={() => { }} /></Link>

                        </div>
                    </div>

                </div>

                <Footer />
            </section>

        </>

    )
}

export default Card