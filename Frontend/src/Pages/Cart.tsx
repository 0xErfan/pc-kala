import { Link } from "react-router-dom";
import Footer from "../components/Footer"
import Header from "../components/Header"
import { CgFileDocument } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import ProductCart from "../components/ProductCart";
const Card = () => {
    return (
        <>
            <Header />

            <section className=" bg-primary-black text-[11px]">

                <span className='pt-[160px] block'></span>

                <div className="container">

                    <div className="flex items-center justify-evenly ch:cursor-pointer gap-24">

                        <Link to="/" className="flex items-center flex-col gap-2">
                            <CgFileDocument className="size-11 rounded-md text-dark-red/90 p-2 bg-secondary-black" />
                            <p className="text-description-text transition-all hover:text-white">سبد خرید</p>
                        </Link>
                        <Link to="/" className="flex items-center flex-col gap-2">
                            <CgFileDocument className="size-11 rounded-md text-dark-red/90 p-2 bg-secondary-black" />
                            <p className="text-description-text transition-all hover:text-white">جزئیات پرداخت</p>
                        </Link>
                        <Link to="/" className="flex items-center flex-col gap-2">
                            <CgFileDocument className="size-11 rounded-md text-dark-red/90 p-2 bg-secondary-black" />
                            <p className="text-description-text transition-all hover:text-white">تکمیل سفارش</p>
                        </Link>

                    </div>

                    <div className="flex items-center gap-5 text-white ch:rounded-md ch:p-3 mt-12 ch:bg-secondary-black">
                        <div className="flex-[3.2]">

                            <table className="w-full text-center">

                                <thead className="">
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

                        </div>
                        <div className="flex-1 mb-auto border border-gold/30">w</div>
                    </div>

                </div>

                <div className="h-[500px]"></div>

                <Footer />
            </section>

        </>

    )
}

export default Card