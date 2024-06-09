import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { CiEdit } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";
import { IoExitOutline } from "react-icons/io5";
import { FaRegCommentAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { ReactNode, useEffect, useMemo, useState } from "react";
import LikedProduct from "@/components/p-user/LikedProduct";
import UserPanelTemplate from "@/components/UserPanelTemplate";
import UserDataUpdater from "@/components/UserDataUpdater"
import { showToast } from "@/utils";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/Hooks/useRedux";
import { changeProfileActiveMenu, modalDataUpdater } from "@/Redux/Features/globalVarsSlice";
import Image from "next/image";
import { userDataUpdater } from "@/Redux/Features/userSlice";
import CommentData from '@/components/p-user/CommentData'
import Message from "@/components/p-user/Message";
import TransactionData from "@/components/p-user/TransactionData";
import { userDataTypes, userRelatedDataTypes } from "@/global.t";
import prefix from "@/config/prefix";

interface orderStatusProps {
    count: number
    text: string
    status: "PROCESSING" | "DELIVERED" | "CANCELED"
}

const Profile = () => {

    const [userDataToRender, setUserDataToRender] = useState<ReactNode | null>(null)
    const [activeEditShown, setActiveEditShown] = useState<Record<string, unknown> | null>(null)
    const [fetchedData, setFetchedData] = useState<{ userData: userDataTypes, userRelatedData: Partial<userRelatedDataTypes> }>()
    const [isLoaded, setIsLoaded] = useState(false)
    const navigate = useRouter()

    const { userUpdater: updater, activeProfileMenu: activeMenu } = useAppSelector(state => state.globalVarsSlice)
    const dispatch = useAppDispatch()

    const activeEditChanger = (prop: string) => { setActiveEditShown({ [prop]: true }) }
    const dataEditorCloser = () => setActiveEditShown(null)

    const { data, relatedData } = useAppSelector(state => state.userSlice)

    const { nameLastName, username, nationalCode, email, phoneNumber, _id } = data || fetchedData?.userData || {}
    const { Wish, Notification, Transaction, Comment } = relatedData || fetchedData?.userRelatedData || {}

    const { processing, canceled, delivered } = useMemo(() => {

        let processing = 0
        let delivered = 0
        let canceled = 0;

        Transaction?.forEach(data => {
            switch (data.status) {
                case 'PROCESSING':
                    processing++;
                    break;
                case 'DELIVERED':
                    delivered++;
                    break;
                case 'CANCELED':
                    canceled++;
                    break;
                default:
                    break;
            }
        });

        return { processing, delivered, canceled }
    }, [Transaction])

    useEffect(() => {
        (
            async () => {

                if (data?.email) return setIsLoaded(true) // use cached data instead of fetching again

                try {
                    setIsLoaded(false)

                    const res = await fetch('/api/UserRelatedData/get')

                    if (!res.ok) throw new Error()

                    const data = await res.json()

                    setFetchedData({ ...data })
                    setIsLoaded(true)

                } catch (error) { showToast(false, 'از اتصال به اینترنت مطمان شوید', 3000) }
            }
        )()
    }, [data])

    useEffect(() => {

        if (!isLoaded) {
            // setUserDataToRender(<div className="flex-center w-full text-center absolute inset-0 bg-secondary-black pb-36 text-gold font-peyda text-[16px] h-full">بروزرسانی...</div>)
            return
        }

        switch (activeMenu) {
            case "orders":
                setUserDataToRender(
                    <UserPanelTemplate title="سفارش های من">
                        <div className="flex flex-wrap md:flex-nowrap items-center justify-evenly gap-4 border-gray-700 p-3">
                            <OrderStatus count={processing} status="PROCESSING" text="جاری" />
                            <OrderStatus count={delivered} status="DELIVERED" text="تحویل شده" />
                            <OrderStatus count={canceled} status="CANCELED" text="لغو شده" />
                        </div>

                        <div className="w-4/5 m-auto border border-gold my-2 rounded-t-xl"></div>

                        <div className="w-full m-auto flex-center">
                            <table className="bg-primary-black w-full p-3 text-center text-[15px] rounded-md shadow-regular my-4 mx-4">

                                <thead className="bg-secondary-black/50 sm:text-[15px] text-[13px] font-peyda text-title-text">
                                    <tr className="ch:py-4">
                                        <th>کد سفارش</th>
                                        <th>تاریخ خرید</th>
                                        <th>تعداد</th>
                                        <th>قیمت</th>
                                        <th>وضعیت</th>
                                        <th>جزئیات</th>
                                    </tr>
                                </thead>

                                <tbody className="overflow-auto relative h-12">
                                    {
                                        Transaction?.length
                                            ?
                                            [...Transaction].reverse().map(data => <TransactionData key={data._id} {...data} />)
                                            : <tr className="text-center absolute right-0 left-0 font-peyda pt-3 text-white-red text-[16px] w-full m-auto">سفارشی یافت نشد</tr>
                                    }
                                </tbody>

                            </table>
                        </div>

                    </UserPanelTemplate>
                );
                break;
            case "likes":
                setUserDataToRender(
                    <UserPanelTemplate title="علاقه مندی ها">
                        {
                            Wish?.length
                                ?
                                < div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-h-[700px] overflow-y-auto ml-auto p-3 gap-3">
                                    {
                                        [...Wish].reverse().map(prd => <LikedProduct productID={prd.productID} creator={_id as string} key={prd.productID?._id} />)
                                    }
                                </div>
                                :
                                <div className="flex-center pb-6 text-[17px] font-peyda text-center text-white-red">محصولی یافت نشد</div>
                        }
                    </UserPanelTemplate >
                );
                break;
            case "comments":
                setUserDataToRender(
                    <UserPanelTemplate title="کامنت های من">
                        {
                            <div className="w-full m-auto flex-center">
                                <table className="bg-primary-black w-full p-3 text-center text-[15px] rounded-md shadow-regular my-4 mx-4">

                                    <thead className="bg-secondary-black/50 sm:text-[15px] text-[13px] font-peyda text-title-text">
                                        <tr className="ch:py-4">
                                            <th>شناسه</th>
                                            <th>تاریخ</th>
                                            <th>کالا</th>
                                            <th>امتیاز</th>
                                            <th>وضعیت</th>
                                            <th>پیام</th>
                                        </tr>
                                    </thead>

                                    <tbody className="overflow-auto relative h-12">
                                        {
                                            Comment?.length
                                                ?
                                                [...Comment].reverse().map(data => <CommentData key={data._id} {...data} />)
                                                : <tr className="text-center absolute right-0 left-0 font-peyda pt-3 text-white-red text-[16px] w-full m-auto">کامنتی یافت نشد</tr>
                                        }
                                    </tbody>

                                </table>
                            </div>
                        }
                    </UserPanelTemplate >
                );
                break;
            case "messages":
                setUserDataToRender(
                    <UserPanelTemplate title="پیغام‌ها">
                        <div className="flex flex-col gap-2 p-3">
                            {
                                Notification?.length
                                    ?
                                    [...Notification].reverse().map(data => <Message key={data._id} {...data} />)
                                    :
                                    <div className="flex-center pb-6 text-[17px] font-peyda text-center text-white-red">پیامی وجود ندارد</div>
                            }
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
                                name="nameLastName"
                                title="نام و نام خانوادگی"
                                inputValue={nameLastName || ''}
                                readOnly={!activeEditShown?.fullName}
                                editToggle={() => activeEditChanger("fullName")}
                            />

                            <UserDataUpdater
                                dataEditorCloser={dataEditorCloser}
                                name="username"
                                title="نام کاربری"
                                inputValue={username || ''}
                                readOnly={!activeEditShown?.username}
                                editToggle={() => activeEditChanger("username")}
                            />

                            <UserDataUpdater
                                dataEditorCloser={dataEditorCloser}
                                name="nationalCode"
                                title="کد ملی"
                                inputValue={nationalCode || ''}
                                readOnly={!activeEditShown?.nationalCode}
                                editToggle={() => activeEditChanger("nationalCode")}
                            />

                            <UserDataUpdater
                                dataEditorCloser={dataEditorCloser}
                                name="phoneNumber"
                                title="شماره موبایل"
                                inputValue={phoneNumber || ''}
                                readOnly={!activeEditShown?.phoneNumber}
                                editToggle={() => activeEditChanger("phoneNumber")}
                            />

                            <UserDataUpdater
                                dataEditorCloser={dataEditorCloser}
                                editAble={false}
                                name="email"
                                title={"ایمیل"}
                                inputValue={email || ''}
                                readOnly={!activeEditShown?.email}
                                editToggle={() => activeEditChanger("email")}
                            />

                            <UserDataUpdater
                                dataEditorCloser={dataEditorCloser}
                                name="changePass"
                                title="تغییر رمز عبور"
                                inputValue={''}
                                readOnly={!activeEditShown?.changePass}
                                editToggle={() => activeEditChanger("changePass")}
                            />

                        </div>

                    </UserPanelTemplate>
                );
        }
    }, [activeMenu, activeEditShown, isLoaded])

    useEffect(() => {
        if (navigate.query?.menu == 'orders') {
            dispatch(changeProfileActiveMenu('orders'))
            navigate.push({ pathname: navigate.pathname }, undefined, { shallow: true })
        }
    }, [navigate, dispatch])

    const logout = async () => {

        dispatch(modalDataUpdater({
            isShown: true, title: 'خروج از حساب', message: 'آیا قصد خروج از حسابتان را دارید؟', okButtonText: 'بله', fn: async () => {

                const res = await fetch('/api/auth/logout')

                if (!res.ok) { showToast(false, 'خطا - اتصال به اینترنت خود را برسسی کنید'); return }

                showToast(true, 'خروج از حساب موفقیت امیز بود')

                dispatch(userDataUpdater({ isLogin: false }))
                navigate.reload()
            }
        }))
    }

    return (

        <section className="bg-primary-black">

            <Header />

            <span className='md:pt-[160px] pt-[130px] block'></span>


            <div className="flex container flex-col lg:flex-row gap-5 text-white text-[12px] mb-5 overflow-hidden">

                <div data-aos-duration="550" data-aos="fade-left" className="flex-1 ch:px-3 ch:relative ch:py-5 overflow-hidden ch:transition-all bg-secondary-black border border-dark-gold ch:duration-300 h-min rounded-md">

                    <div className={`flex items-center justify-between border-b border-gray-600/15 pb-2 hover:bg-black/15`}>
                        <div className="flex items-center flex-col gap-1">
                            <p className="text-[15px]">{nameLastName || username}</p>
                            <p className="text-[13px] text-description-text">{phoneNumber}</p>
                        </div>
                        <CiEdit onClick={() => dispatch(changeProfileActiveMenu("account-details"))} className="size-7 text-blue-white cursor-pointer" />
                    </div>

                    <div onClick={() => dispatch(changeProfileActiveMenu("account-details"))} className={`flex items-center gap-2 border-b ${activeMenu == "account-details" && "activeMenu ch:mr-2"} border-gray-600/15 pb-3 cursor-pointer hover:bg-black/15`}>
                        <FaRegUser className="size-5" />
                        <p>اطلاعات حساب کاربری</p>
                    </div>

                    <div onClick={() => dispatch(changeProfileActiveMenu("orders"))} className={`flex ${activeMenu == "orders" && "activeMenu ch:mr-2"} items-center relative gap-2 border-b border-gray-600/15 pb-3 cursor-pointer hover:bg-black/15`}>
                        <IoBagHandleOutline className="size-5" />
                        <p>سفارش ها</p>
                    </div>

                    <div onClick={() => dispatch(changeProfileActiveMenu("likes"))} className={`flex ${activeMenu == "likes" && "activeMenu ch:mr-2"} items-center gap-2 border-b border-gray-600/15 pb-3 cursor-pointer justify-between hover:bg-black/15`}>
                        <div className="flex items-center gap-2">
                            <FaRegHeart className="size-[17px]" />
                            <p>لیست های من</p>
                        </div>
                        {Wish?.length ? <div className="bg-white-red text-[15px] flex-center size-5 rounded-sm mr-auto text-center">{Wish?.length}</div> : <></>}
                    </div>

                    <div onClick={() => dispatch(changeProfileActiveMenu("comments"))} className={`flex ${activeMenu == "comments" && "activeMenu ch:mr-2"} items-center gap-2 border-b border-gray-600/15 pb-3 cursor-pointer justify-between hover:bg-black/15`}>
                        <div className="flex items-center gap-2">
                            <FaRegCommentAlt className="size-[17px]" />
                            <p>کامنت ها</p>
                        </div>
                        {Comment?.length ? <div className="bg-white-red text-[15px] flex-center size-5 rounded-sm mr-auto text-center">{Comment?.length}</div> : <></>}
                    </div>

                    <div onClick={() => dispatch(changeProfileActiveMenu("messages"))} className={`flex items-center ${activeMenu == "messages" && "activeMenu ch:mr-2"} justify-between border-b border-gray-600/15 pb-3 cursor-pointer hover:bg-black/15`}>
                        <div className="flex items-center gap-2">
                            <FaRegBell className="size-5" />
                            <p>پیغام‌ها</p>
                        </div>
                        {Notification?.length ? <div className="bg-white-red text-[15px] flex-center size-5 rounded-sm mr-auto text-center">{Notification?.length}</div> : <></>}
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

    useEffect(() => { setSrc(status) }, [status])

    return (
        <div className="flex items-center gap-3 mt-10">
            <div>
                <Image
                    src={`${prefix}/images/${src}.svg`}
                    width={85}
                    height={85}
                    quality={100}
                    alt="orders status"
                />
            </div>
            <div className="flex items-center gap-3 flex-col">
                <p className="text-white font-bold text-[14px]"><span className="text-[15px] font-peyda font-bold">{count}</span> سفارش</p>
                <p className="text-description-text">{text}</p>
            </div>
        </div>
    )
}

export default Profile;