import Footer from "@/components/Footer"
import { IoSearch, IoShareSocialOutline } from "react-icons/io5";
import { FiMinus } from "react-icons/fi";
import { LuPlus } from "react-icons/lu";
import { GoCommentDiscussion, GoCpu } from "react-icons/go";
import { MdAddShoppingCart, MdOutlineInsertComment, MdOutlinePhoneEnabled } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { BiMessageSquareDetail } from "react-icons/bi";
import { BsFilterLeft } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";
import Button from "@/components/Button";
import { memo, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Comment from "@/components/Comment";
import Header from "@/components/Header";
import { getTimer, productOffTimerProps } from '@/utils'
import BreadCrumb from "@/components/BreadCrumb";
import { MdClose } from "react-icons/md";

interface coordinates {
    x: number
    y: number
}

interface FullScreenImageProps {
    url: string
    isShown: boolean
    closeFullScreenFn: () => void
}

export default memo(function Product() {

    const [activeSection, setActiveSection] = useState<"details" | "comments">("details")
    const [productCount, setProductCount] = useState(1)
    const [productOffTimer, setProductOffTimer] = useState<productOffTimerProps | null>(null)
    const [circleCoordinates, setCircleCoordinates] = useState<coordinates>({ x: 0, y: 0 })
    const productImgRef = useRef<HTMLImageElement | null>(null);
    const [zoomShown, setIsZoomShown] = useState<boolean>(false)
    const [fullScreenShown, setFullScreenShown] = useState(false)

    const breadCrumbData = [
        { text: "لپتاپ", link: "/category/laptops" },
        { text: "ROG Strix SCAR G834JY-AC i9-13980HX/32GB/2TB/RTX4090-16G", link: "/products/234t42r5" },
    ]

    const sharePage = (url: string) => {
        const imageUrl = 'https://example.com/image.jpg';

        if (navigator.share) {
            navigator.share({
                title: 'Share Image URL',
                text: 'Check out this product!',
                url
            })
                .then(() => console.log('Shared successfully'))
                .catch((error) => console.error('Error sharing:', error));
        } else {
            console.error('Web Share API not supported');
        }
    }


    useEffect(() => {
        const timeout = setInterval(() => { setProductOffTimer(getTimer()) }, 1000)
        return () => clearInterval(timeout)
    }, [])


    return (

        <section className="primary-bg">

            <Header />

            <div className="md:px-5 px-3">

                <BreadCrumb path={breadCrumbData} />

                <div
                    className=" flex flex-col lg:flex-row items-center md:gap-4 gap-8 bg-secondary-black container rounded-md p-4 text-white">

                    <div className=" flex-1">

                        <div className="flex items-center justify-between text-[11px]">


                            <p className="text-sm"><span
                                className="font-peyda text-gold text-[15px]">پیشنهاد ویژه</span><span
                                    className="block"></span><span className="text-[10px]">فرصت باقی مانده</span></p>

                            <div className="flex-center gap-2">

                                <div className="flex items-center flex-col justify-center gap-1">
                                    <div
                                        className="flex-center p-1 bg-green text-sm white size-7 rounded-full h-full">{productOffTimer?.seconds || "00"}</div>
                                    <p className="text-[10px] text-description-text">ثانیه</p>
                                </div>
                                <div className="flex flex-col justify-center gap-1">
                                    <div className="flex-center p-1 bg-white text-sm text-black/95 size-7 rounded-full h-full">{productOffTimer?.minutes || "00"}</div>
                                    <p className="text-[10px] text-description-text">دقیقه</p>
                                </div>
                                <div className="flex flex-col justify-center gap-1">
                                    <div
                                        className="flex-center p-1 bg-white text-sm text-black/95 size-7 rounded-full h-full">{productOffTimer?.hours || "00"}</div>
                                    <p className="text-[10px] text-description-text">ساعت</p>
                                </div>
                                <div className="flex flex-col justify-center gap-1">
                                    <div
                                        className="flex-center p-1 bg-white text-sm text-black/95 size-7 rounded-full h-full">{productOffTimer?.days || "00"}</div>
                                    <p className="text-[10px] text-description-text mr-2">روز</p>
                                </div>

                            </div>

                        </div>

                        <div className="flex gap-3 items-center my-4">

                            <div className="flex-1">
                                <div className="flex items-center gap-2 flex-col ch:cursor-pointer">
                                    <img className="flex-center object-cover p-1 rounded-md border border-dark-red" src="/images/victus-15.webp" alt="product-img" />
                                    <img className="flex-center object-cover p-1 rounded-md border border-dark-gold" src="/images/victus-15.webp" alt="product-img" />
                                    <img className="flex-center object-cover p-1 rounded-md border border-dark-gold" src="/images/victus-15.webp" alt="product-img" />
                                    <img className="flex-center object-cover p-1 rounded-md border border-dark-gold" src="/images/victus-15.webp" alt="product-img" />
                                    <img className="flex-center object-cover p-1 rounded-md border border-dark-gold" src="/images/victus-15.webp" alt="product-img" />
                                </div>
                            </div>

                            <div
                                className="flex-[5] text-[13px] border relative overflow-hidden border-dark-gold rounded-md text-description-text">
                                <div className={"relative overflow-hidden z-10"}>
                                    <img
                                        ref={productImgRef}
                                        className="flex-center w-full object-cover py-4"
                                        src="/images/victus-15.webp"
                                        alt="product-img"
                                        onPointerEnter={() => {
                                            setIsZoomShown(true)
                                        }}
                                        onPointerLeave={() => setIsZoomShown(false)}
                                        onPointerMove={e => {

                                            setCircleCoordinates({ x: e.clientX, y: e.clientY })
                                        }
                                        }
                                    />
                                    <span
                                        style={{ left: (circleCoordinates.x - 70) + "px", top: (circleCoordinates.y + 70) - (productImgRef.current ? productImgRef.current.clientHeight / 2 : 0) + "px" }}
                                        className={`${zoomShown ? "fixed" : "invisible"} fixed overflow-hidden rounded-full border-2 border-white size-36`}><div style={{ backgroundImage: "url('/images/victus-15.webp')", backgroundPosition: (circleCoordinates.x - (productImgRef.current ? productImgRef.current.x : 0) - 100) + "% " + (circleCoordinates.y - (productImgRef.current ? productImgRef.current.y : 0) - 110) + "%" }} className={"absolute size-full z-20 zoomedImg scale-[2.5]"} /></span>
                                </div>
                                <span
                                    onClick={() => setFullScreenShown(true)}
                                    className="absolute cursor-pointer flex-center size-10 border z-40 border-dark-gold left-3 bottom-3 ch:size-5 text-description-text rounded-sm"><IoSearch /></span>
                                <span
                                    onClick={() => sharePage('/images/flan/flan')}
                                    className="absolute size-10 border z-40 border-dark-gold left-16 bottom-3 ch:size-5 cursor-pointer flex-center rounded-sm"><IoShareSocialOutline /></span>
                            </div>

                            <FullScreenImage url='/images/victus-15.webp' isShown={fullScreenShown} closeFullScreenFn={() => setFullScreenShown(false)} />

                        </div>

                        <div className="bg-green rounded-md p-4 text-sm text-center">قدرت ما در بهترین قیمت بازار است
                            بهترین عرضه کننده لپ تاپ در ایران
                        </div>
                    </div>

                    <div className="md:flex-[1.2] xl:flex-[1.4] mb-auto">
                        <p>لپ تاپ ایسوس ROG Strix SCAR G834JY-AC i9-13980HX/32GB/2TB/RTX4090-16G</p>
                        <span
                            className="bg-blue-dark inline-block text-[11px] p-1 rounded-sm my-3">شناسه محصول : 72478</span>
                        <div className="flex items-center gap-12 text-[12px]">
                            <p>گارانتی دستگاه</p>
                            <select defaultValue={0}
                                className="bg-primary-black rounded-md p-2 border border-dark-gold">
                                <option disabled={true} value={0}>گارانتی دستگاه را انتخاب کنید</option>
                                <option value={1}>گارانتی 18 ماهه شرکتی</option>
                            </select>
                        </div>

                        <p className="text-dark-red mt-6 text-sm">خدمات ویژه پی سی کالا :</p>

                        <div className="text-[12px] ch:my-3 ch:text-description-text">

                            <div className="flex items-center gap-1">
                                <input name="inshurance" type="checkbox" />
                                <label htmlFor="inshurance">گارانتی طلایی پی سی کالا (پس انداز اندک برای حسرت های
                                    ناگهانی) <span className="text-blue-white mx-1">10,602,042 تومان</span></label>
                            </div>

                            <div className="flex items-center gap-1">
                                <input name="windows" type="checkbox" />
                                <label htmlFor="windows">نصب ویندوز حرفه ای کار هرکسی نیست ، تیکو بزن . <span
                                    className="text-blue-white mx-1">500,000 تومان</span> </label>
                            </div>

                            <div className="flex items-center gap-1">
                                <input name="windows-org" type="checkbox" />
                                <label htmlFor="windows-org">ویندوز اورجینال (لایسنس 1 ساله)<span
                                    className="text-blue-white mx-1">2,500,000 تومان</span> </label>
                            </div>

                            <div className="flex items-center gap-1">
                                <input name="anti-virus" type="checkbox" />
                                <label htmlFor="anti-virus"> نصب آنتی ویروس<span className="text-blue-white mx-1">150,000 تومان</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 text-title-text text-2xl mt-10">
                                <div className="red-line-through text-white ">۲۳,۷۳۴,۱۷۴</div>
                                <div className="text-blue-white">۲۳,۱۴۵,۶۲۵ <span
                                    className="text-description-text text-xl">تومان</span></div>
                            </div>
                            <div className="flex items-center mt-3 gap-3">
                                <div className="flex h-[44px] items-center border border-dark-gold rounded-md">
                                    <div
                                        className="w-10 flex-center border-l h-full border-dark-gold">{productCount}</div>
                                    <div className="flex-center flex-col w-6 ch:cursor-pointer gap-1">
                                        <LuPlus onClick={() => setProductCount(preve => preve + 1)} />
                                        <FiMinus
                                            onClick={() => productCount != 1 && setProductCount(preve => preve - 1)} />
                                    </div>
                                </div>
                                <Button filled={true} text="افزودن به سبد خرید" fn={() => console.log("hi2")}
                                    Icon={<MdAddShoppingCart />} />
                            </div>
                        </div>
                    </div>

                    <div className=" flex-1 text-[12px] hidden lg:block text-white mb-auto">
                        <div className="ch:rounded-sm space-y-1">
                            <h4 className="bg-[#343539] mb-2 py-1 px-2">مشخصات اصلی محصول</h4>
                            <h4 className="bg-primary-black flex items-center gap-2 py-1 px-2"><GoCpu /> intel i9-13980HX
                            </h4>
                            <h4 className="bg-primary-black flex items-center gap-2 py-1 px-2"><GoCpu /> +18inch QHD</h4>
                            <h4 className="bg-primary-black flex items-center gap-2 py-1 px-2"><GoCpu /> RTX4090-16G</h4>
                            <h4 className="bg-primary-black flex items-center gap-2 py-1 px-2"><GoCpu /> 32GB DDR5</h4>
                            <h4 className="bg-primary-black flex items-center gap-2 py-1 px-2"><GoCpu /> 2TB-SSD</h4>
                        </div>

                        <div className="mt-5">
                            <div className="p-3 text-center rounded-sm cursor-pointer bg-dark-red text-[13px]">نحوه خرید
                                اقساطی
                            </div>
                            <div className="flex items-center gap-2 mt-2 ch:rounded-sm ch:cursor-pointer">
                                <div
                                    className="flex items-center flex-1 flex-center font-bold gap-2 p-2 bg-secondary-black text-title-text border-dashed hover:bg-blue-dark transition-all border border-blue-dark">
                                    <MdOutlinePhoneEnabled className="size-5" />نیاز به مشاوره
                                </div>
                                <div
                                    className="flex items-center flex-1 flex-center font-bold gap-2 p-2 text-secondary-black bg-title-text">
                                    <GrGroup className="size-5 text-tex" />امور مشتریان
                                </div>
                            </div>
                        </div>

                    </div>


                </div>

                <div
                    className="flex items-center container ch:cursor-pointer h-[107px] text-description-text relative ch:transition-all bg-secondary-black text-[12px] mt-8 rounded-md p-4">

                    <div onClick={() => setActiveSection("details")} className={`flex-1 relative`}>
                        <div className={`flex-center flex-col ${activeSection == "details" && "active-section"} gap-1`}>
                            <TbListDetails className="text-description-text size-6" />
                            <p>مشخصات فیزیکی</p>
                        </div>
                    </div>

                    <div onClick={() => setActiveSection("comments")} className={`flex-1 relative`}>
                        <div
                            className={`flex-center flex-col ${activeSection == "comments" && "active-section"} gap-1`}>
                            <GoCommentDiscussion className="text-description-text size-6" />
                            <p>نظرات کاربران</p>
                        </div>
                    </div>

                </div>

                <div
                    className="container text-description-text bg-secondary-black text-[12px] mt-2 rounded-md mb-12 p-4">

                    {
                        activeSection == "comments"
                            ?
                            <div>

                                <div className="flex flex-col md:flex-row items-center gap-5">
                                    <div className={`flex-1 space-y-3`}>
                                        <div className="flex items-center gap-2">
                                            <MdOutlineInsertComment className="size-8" />
                                            <h3>نظرات کاربران</h3>
                                        </div>
                                        <div
                                            className="border text-description-text rounded-md border-dotted border-gold/30 p-4">
                                            <span className="text-white">                        لطفا پیش از ارسال نظر، خلاصه قوانین زیر را مطالعه کنید:</span>
                                            <br /><br />
                                            فارسی بنویسید و از کیبورد فارسی استفاده کنید. بهتر است از فضای خالی (Space)
                                            بیش‌از‌حدِ معمول، شکلک یا ایموجی استفاده نکنید و از کشیدن حروف یا کلمات با
                                            صفحه‌کلید بپرهیزید.
                                            <br /><br />
                                            نظرات خود را براساس تجربه و استفاده‌ی عملی و با دقت به نکات فنی ارسال کنید؛
                                            بدون تعصب به محصول خاص، مزایا و معایب را بازگو کنید و بهتر است از ارسال
                                            نظرات چندکلمه‌‌ای خودداری کنید.
                                            <br /><br />
                                            بهتر است در نظرات خود از تمرکز روی عناصر متغیر مثل قیمت، پرهیز کنید.
                                            <br /><br />
                                            به کاربران و سایر اشخاص احترام بگذارید. پیام‌هایی که شامل محتوای توهین‌آمیز
                                            و کلمات نامناسب باشند، حذف می‌شوند.
                                        </div>
                                    </div>

                                    <div className={`flex-1 mb-auto`}>
                                        <p className="text-description-text pt-2">اولین کسی باشید که دیدگاهی می نویسد
                                            “لپ تاپ لنوو IdeaPad GAMING3 i7-11370H/32GB/1TB/GTX 1650-4G”</p>
                                        {
                                            ("") ?
                                                <div className="text-center mt-12">برای ثبت نظر ابتدا <Link href="/login"
                                                    className="text-blue-dark">وارد
                                                    حساب </Link>خود شوید.</div>
                                                :
                                                <div className="mt-6">
                                                    <label htmlFor="textArea">دیدگاه شما <span
                                                        className="text-white-red">*</span></label>
                                                    <textarea
                                                        className="max-h-60 h-[167px] w-full p-2 rounded-md my-2 bg-primary-black border border-description-text/10"
                                                        id="textArea" cols={30} rows={10}></textarea>
                                                    <Button text="ثبت نظر" filled={true} fn={() => {
                                                    }} />
                                                </div>
                                        }
                                    </div>
                                </div>

                                <div className="mt-24">
                                    <div className="flex items-center justify-between border-b border-title-text pb-2">
                                        <p className="font-peyda text-gold text-[15px]">نقد و بررسی ها</p>
                                        <div className="flex items-center text-[11px] gap-4 text-description-text">
                                            <BsFilterLeft className="size-5" />
                                            <p className="text-white-red">جدیدترین</p>
                                            <p>دیدکاه خریداران</p>
                                        </div>
                                    </div>
                                    {
                                        " "
                                            ?
                                            <div className="flex flex-col mt-3 gap-2">
                                                <Comment />
                                                <Comment />
                                                <Comment />
                                            </div>
                                            :
                                            <div className="w-full mt-3 bg-white-red p-3 rounded-md">نظری برای این محصول
                                                ثبت نشده !</div>
                                    }
                                </div>
                            </div>
                            :
                            <div>
                                <div className="flex items-center text-md gap-2">
                                    <BiMessageSquareDetail className="size-6" />
                                    <p>مشخصات کلی</p>
                                </div>

                                <div className="space-y-1 mt-4 text-white text-[10px]">

                                    <div
                                        className="flex items-center ch:pr-3 ch:h-8 gap-[3px] ch:w-full ch:bg-primary-black">
                                        <div className="rounded-br-3xl flex-1 flex items-center rounded-tr-sm">سازنده
                                            پردازنده
                                        </div>
                                        <div
                                            className="lg:flex-[7] sm:flex-[4] flex-[2] text-[13px] flex items-center">Intel
                                        </div>
                                    </div>

                                    <div
                                        className="flex items-center ch:pr-3 ch:h-8 gap-[3px] ch:w-full ch:bg-primary-black">
                                        <div className="rounded-br-3xl flex-1 flex items-center rounded-tr-sm">سازنده
                                            پردازنده
                                        </div>
                                        <div
                                            className="lg:flex-[7] sm:flex-[4] flex-[2] text-[13px] flex items-center">Intel
                                        </div>
                                    </div>

                                    <div
                                        className="flex items-center ch:pr-3 ch:h-8 gap-[3px] ch:w-full ch:bg-primary-black">
                                        <div className="rounded-br-3xl flex-1 flex items-center rounded-tr-sm">سازنده
                                            پردازنده
                                        </div>
                                        <div
                                            className="lg:flex-[7] sm:flex-[4] flex-[2] text-[13px] flex items-center">Intel
                                        </div>
                                    </div>

                                    <div
                                        className="flex items-center ch:pr-3 ch:h-8 gap-[3px] ch:w-full ch:bg-primary-black">
                                        <div className="rounded-br-3xl flex-1 flex items-center rounded-tr-sm">سازنده
                                            پردازنده
                                        </div>
                                        <div
                                            className="lg:flex-[7] sm:flex-[4] flex-[2] text-[13px] flex items-center">Intel
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }

                </div>

            </div>

            <Footer />

        </section>
    )


})

const FullScreenImage = ({ url, isShown, closeFullScreenFn }: FullScreenImageProps) => (
    <div
        // onClick={e => e.target.tagName == 'DIV' && closeFullScreenFn()}
        className={`fixed inset-0 w-full ${isShown ? 'fixed' : 'invisible'} bg-transparent px-3 sm:p-0 transition-all duration-200 ease-linear backdrop-blur-sm z-50 flex-center`}
    >
        <img className="object-cover bg-primary-black rounded-md cursor-zoom-in size-[350px] sm:size-[400px] md:size-[500px] lg:size-[600px]" src={url} alt="full-screen-image" />
        <div onClick={closeFullScreenFn} className="size-12 absolute bg-white-red ch:size-8 ch:cursor-pointer right-8 top-8 rounded-md flex-center"><MdClose /></div>
    </div>
);