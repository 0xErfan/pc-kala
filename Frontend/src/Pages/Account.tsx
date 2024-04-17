import Footer from "../components/Footer"
import Header from "../components/Header"
import { CiEdit } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { BiMessageRounded } from "react-icons/bi";
import { FaRegBell } from "react-icons/fa6";
import { IoExitOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { useEffect, useState } from "react";

interface orderStatusProps {
    count: number
    text: string
    status: "processing" | "delivered" | "returned"
}


const Account = () => {

    const [activeMenu, setActiveMenu] = useState("account-details")

    return (

        <section className="bg-primary-black">

            <Header />

            <span className='md:pt-[160px] pt-[130px] block'></span>


            <div className="flex container gap-5 text-white text-[12px] mb-5">

                <div data-aos-duration="600" data-aos="zoom-in" className="flex-1 ch:px-3 ch:relative ch:py-5 overflow-hidden ch:transition-all bg-secondary-black border border-dark-gold ch:duration-300 rounded-md">

                    <div className={`flex items-center justify-between border-b border-gray-600/15 pb-2 hover:bg-black/15`}>
                        <div className="flex items-center flex-col gap-1">
                            <p className="text-[15px]">مهدی راضایی</p>
                            <p className="text-[13px] text-description-text">09032754452</p>
                        </div>
                        <CiEdit className="size-7 text-blue-white cursor-pointer" />
                    </div>

                    <div onClick={() => setActiveMenu("account-details")} className={`flex items-center gap-2 border-b ${activeMenu == "account-details" && "activeMenu ch:mr-2"} border-gray-600/15 pb-3 cursor-pointer hover:bg-black/15`}>
                        <FaRegUser className="size-5" />
                        <p>اطلاعات حساب کاربری</p>
                    </div>

                    <div onClick={() => setActiveMenu("orders")} className={`flex ${activeMenu == "orders" && "activeMenu ch:mr-2"} items-center relative gap-2 border-b border-gray-600/15 pb-3 cursor-pointer hover:bg-black/15`}>
                        <IoBagHandleOutline className="size-5" />
                        <p>سفارش ها</p>
                    </div>

                    <div onClick={() => setActiveMenu("likes")} className={`flex ${activeMenu == "likes" && "activeMenu ch:mr-2"} items-center gap-2 border-b border-gray-600/15 pb-3 cursor-pointer hover:bg-black/15`}>
                        <FaRegHeart className="size-[17px]" />
                        <p>لیست های من</p>
                    </div>

                    <div onClick={() => setActiveMenu("comments")} className={`flex items-center ${activeMenu == "comments" && "activeMenu ch:mr-2"} gap-2 border-b border-gray-600/15 pb-3 cursor-pointer hover:bg-black/15`}>
                        <BiMessageRounded className="size-5" />
                        <p>دیدگاه ها</p>
                    </div>

                    <div onClick={() => setActiveMenu("messages")} className={`flex items-center ${activeMenu == "messages" && "activeMenu ch:mr-2"} justify-between border-b border-gray-600/15 pb-3 cursor-pointer hover:bg-black/15`}>
                        <div className="flex items-center gap-2">
                            <FaRegBell className="size-5" />
                            <p>پیغام‌ها</p>
                        </div>
                        <div className="bg-white-red text-[15px] flex-center size-5 rounded-sm text-center">5</div>
                    </div>

                    <div className="flex text-white-red items-center gap-2 border-b border-gray-600/15 pb-3 cursor-pointer hover:bg-black/15">
                        <IoExitOutline className="size-5" />
                        <p>خروج</p>
                    </div>

                </div>

                <div data-aos-duration="600" data-aos="zoom-in" className="flex-[3]">

                    <div className="border border-dark-gold bg-secondary-black rounded-md p-4">
                        <div className="inline-block space-y-2 font-peyda text-[15px] flex-col gap-2">
                            <p>سفارش های من</p>
                            <div className="w-5/6 ml-auto bg-white-red h-px rounded-sm"></div>
                        </div>
                        <div className="flex items-center justify-evenly gap-4">
                            <OrderStatus count={2} status="processing" text="جاری" />
                            <OrderStatus count={0} status="delivered" text="تحویل شده" />
                            <OrderStatus count={1} status="returned" text="مرجوع شده" />
                        </div>
                    </div>
                </div>

            </div>

            <Footer />

        </section>

    )
}


const OrderStatus = ({ count, status, text }: orderStatusProps) => {

    const [src, setSrc] = useState<orderStatusProps["status"] | null>(null)

    useEffect(() => {

        switch (status) {
            case "returned": { setSrc("returned"); break }
            case "delivered": { setSrc("delivered"); break }
            case "processing": { setSrc("processing"); break }
        }

    }, [status])

    return (
        <div className="flex items-center gap-3 mt-10">
            <div><img src={`/images/${src}.svg`} /></div>
            <div className="flex items-center gap-3 flex-col">
                <p className="text-white font-bold text-[14px]">{count} سفارش</p>
                <p className="text-description-text">{text}</p>
            </div>
        </div>
    )
}

export default Account;