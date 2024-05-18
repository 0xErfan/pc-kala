import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { CiEdit } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";
import { IoExitOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { ReactNode, useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import Button from "@/components/Button";
import LikedProduct from "@/components/LikedProduct";
import UserPanelTemplate from "@/components/UserPanelTemplate";
import UserDataUpdater from "@/components/UserDataUpdater"
import { showToast } from "@/utils";
import { useRouter } from "next/router";
import { useAppSelector } from "@/Hooks/useRedux";
import { GetServerSidePropsContext } from "next";
import { BasketItemModel, NotificationModel, OrderModel, WishModel } from "@/models/UserRelatedSchemas";
import { CommentModel } from "@/models/Comment";

interface orderStatusProps {
    count: number
    text: string
    status: "processing" | "delivered" | "returned"
}

const Profile = ({ userData, userRelatedData }) => {

    const [activeMenu, setActiveMenu] = useState("account-details")
    const [userDataToRender, setUserDataToRender] = useState<ReactNode | null>(null)
    const [activeEditShown, setActiveEditShown] = useState<Record<string, unknown> | null>(null)
    const activeEditChanger = (prop: string) => { setActiveEditShown({ [prop]: true }) }
    const dataEditorCloser = () => setActiveEditShown(null)
    const navigate = useRouter()

    const { nameLastName, username, meliCode, email, phonoNumber } = userData || {}

    const { Wish, Order, Notifications, Comment } = userRelatedData || []

    useEffect(() => {
        switch (activeMenu) {
            case "orders":
                setUserDataToRender(
                    <UserPanelTemplate title="سفارش های من">
                        <div className="flex flex-wrap md:flex-nowrap items-center justify-evenly gap-4 border-gray-700 p-3">
                            <OrderStatus count={2} status="processing" text="جاری" />
                            <OrderStatus count={0} status="delivered" text="تحویل شده" />
                            <OrderStatus count={1} status="returned" text="مرجوع شده" />
                        </div>
                    </UserPanelTemplate>
                );
                break;
            case "likes":
                setUserDataToRender(
                    <UserPanelTemplate title="علاقه مندی ها">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ml-auto p-3 gap-3">
                            {
                                [...Wish].length
                                    ?
                                    [...Wish].map(prd => <LikedProduct {...prd} key={prd._id} />)
                                    :
                                    <div className="flex-center text-[15px] font-peyda text-white-red">محصولی یافت نشد</div>
                            }
                        </div>
                    </UserPanelTemplate>
                );
                break;
            case "messages":
                setUserDataToRender(
                    <UserPanelTemplate title="پیغام‌ها">
                        <div className="flex flex-col gap-2 p-3">
                            <div data-aos-duration="550" data-aos="fade-right" className="rounded-md p-2 w-full text-[14px] border border-gray-600/15 flex items-center justify-between bg-secondary-black bg-black/15">
                                <p>پیغام‌ خوشامد گویی</p>
                                <Button Icon={<IoTrashOutline />} fn={() => { }} />
                            </div>
                            <div data-aos-duration="550" data-aos="fade-right" className="rounded-md p-2 w-full text-[14px] border border-gray-600/15 flex items-center justify-between bg-secondary-black bg-black/15">
                                <p>پیغام‌ خوشامد گویی</p>
                                <Button Icon={<IoTrashOutline />} fn={() => { }} />
                            </div>
                        </div>
                    </UserPanelTemplate>
                );
                break;
            default:
                setUserDataToRender(
                    <UserPanelTemplate title="اطلاعات شخصی">
                        <div className="grid grid-cols-1 md:grid-cols-2 ch:border ch:border-gray-600/15 ch:pt-2">

                            <UserDataUpdater
                                dataEditorCloser={dataEditorCloser}
                                fn={() => { }}
                                name="name-lname"
                                title="نام و نام خانوادگی"
                                inputValue={nameLastName}
                                readOnly={!activeEditShown?.fullName}
                                editToggle={() => activeEditChanger("fullName")}
                            />

                            <UserDataUpdater
                                dataEditorCloser={dataEditorCloser}
                                fn={() => { }}
                                name="cashBack"
                                title="نام کاربری"
                                inputValue={username}
                                readOnly={!activeEditShown?.username}
                                editToggle={() => activeEditChanger("username")}
                            />

                            <UserDataUpdater
                                dataEditorCloser={dataEditorCloser}
                                fn={() => { }}
                                name="meli-code"
                                title="کد ملی"
                                inputValue={meliCode}
                                readOnly={!activeEditShown?.meliCode}
                                editToggle={() => activeEditChanger("meliCode")}
                            />

                            <UserDataUpdater
                                dataEditorCloser={dataEditorCloser}
                                fn={() => { }}
                                name="phonoNumber"
                                title="شماره موبایل"
                                inputValue={phonoNumber}
                                readOnly={!activeEditShown?.phonoNumber}
                                editToggle={() => activeEditChanger("phonoNumber")}
                            />

                            <UserDataUpdater
                                dataEditorCloser={dataEditorCloser}
                                fn={() => { }}
                                name="email"
                                title={"ایمیل"}
                                inputValue={email}
                                readOnly={!activeEditShown?.email}
                                editToggle={() => activeEditChanger("email")}
                            />

                            <UserDataUpdater
                                dataEditorCloser={dataEditorCloser}
                                fn={() => { }}
                                name="changePass"
                                title="تغییر رمز عبور"
                                inputValue={""}
                                readOnly={!activeEditShown?.changePass}
                                editToggle={() => activeEditChanger("changePass")}
                            />

                        </div>
                    </UserPanelTemplate>
                );
        }
    }, [activeMenu, activeEditShown])

    const logout = async () => {
        const res = await fetch('/api/auth/logout')

        if (!res.ok) showToast(false, 'خطا - اتصال به اینترنت خود را برسسی کنید')
        showToast(true, 'خروج از حساب موفقیت امیز بود')
        navigate.replace('/')
    }

    return (

        <section className="bg-primary-black">

            <Header />

            <span className='md:pt-[160px] pt-[130px] block'></span>


            <div className="flex container flex-col lg:flex-row gap-5 text-white text-[12px] mb-5 overflow-hidden">

                <div data-aos-duration="550" data-aos="fade-left" className="flex-1 ch:px-3 ch:relative ch:py-5 overflow-hidden ch:transition-all bg-secondary-black border border-dark-gold ch:duration-300 h-min rounded-md">

                    <div className={`flex items-center justify-between border-b border-gray-600/15 pb-2 hover:bg-black/15`}>
                        <div className="flex items-center flex-col gap-1">
                            <p className="text-[15px]">مهدی راضایی</p>
                            <p className="text-[13px] text-description-text">09032754452</p>
                        </div>
                        <CiEdit onClick={() => setActiveMenu("account-details")} className="size-7 text-blue-white cursor-pointer" />
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

                    <div onClick={() => setActiveMenu("messages")} className={`flex items-center ${activeMenu == "messages" && "activeMenu ch:mr-2"} justify-between border-b border-gray-600/15 pb-3 cursor-pointer hover:bg-black/15`}>
                        <div className="flex items-center gap-2">
                            <FaRegBell className="size-5" />
                            <p>پیغام‌ها</p>
                        </div>
                        <div className="bg-white-red text-[15px] flex-center size-5 rounded-sm text-center">5</div>
                    </div>

                    <div onClick={logout} className="flex text-white-red items-center gap-2 border-b border-gray-600/15 pb-3 cursor-pointer hover:bg-black/15">
                        <IoExitOutline className="size-5" />
                        <p>خروج</p>
                    </div>

                </div>

                {userDataToRender}

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

export default Profile;

export async function getServerSideProps(context: GetServerSidePropsContext) {


    try {

        const token = context.req.cookies?.token

        const response = await fetch('http://localhost:3000/api/auth/me', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(token)
        })

        const userData = await response.json()

        const userRelatedModels = [NotificationModel, CommentModel, WishModel, OrderModel, BasketItemModel]

        const userRelatedData: {} = {}

        for (const Model of userRelatedModels) {

            const foundedData = await Model
                .find({ $or: [{ creator: userData._id }, { user: userData._id }] })
                .populate(['productID'])
                .exec()

            userRelatedData[Model.modelName] = foundedData
        }

        return { props: { userData: JSON.parse(JSON.stringify(userData)), userRelatedData: JSON.parse(JSON.stringify(userRelatedData)) } }

    } catch (err) {
        console.log(err)
        return { props: { error: 'از اتصال به اینترنت اطمینان فرمایید' } }
    }
}