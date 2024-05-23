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
import { memo, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Comment from "@/components/Comment";
import Header from "@/components/Header";
import { addProductToBasket, getTimer, priceDiscountCalculator, productOffTimerProps, sharePage, showToast } from '@/utils'
import BreadCrumb from "@/components/BreadCrumb";
import { MdClose } from "react-icons/md";
import { GetStaticPropsContext } from "next";
import Image from "next/image";
import Head from "next/head";
import { useAppDispatch, useAppSelector } from "@/Hooks/useRedux";
import { userUpdater } from "@/Redux/Features/globalVarsSlice";
import { useRouter } from "next/router";

interface coordinates {
    x: number
    y: number
}

interface FullScreenImageProps {
    url: string
    isShown: boolean
    closeFullScreenFn: () => void
}

export default memo(function Product({ product }: { product: {} }) {

    const [activeSection, setActiveSection] = useState<"details" | "comments">("details")
    const [productCount, setProductCount] = useState(1)
    const [productOffTimer, setProductOffTimer] = useState<productOffTimerProps | null>(null)
    const [circleCoordinates, setCircleCoordinates] = useState<coordinates>({ x: 0, y: 0 })
    const productImgRef = useRef<HTMLImageElement | null>(null);
    const [zoomShown, setIsZoomShown] = useState<boolean>(false)
    const [fullScreenShown, setFullScreenShown] = useState(false)
    const isLogin = useAppSelector(state => state.userSlice.isLogin)

    const navigate = useRouter()

    const { name, price, discount, specs, _id, image } = product || {}
    const productSpecs = Object.entries(specs)
    const [isUpdating, setIsUpdating] = useState(false)
    const dispatch = useAppDispatch()
    const { relatedData, data } = useAppSelector(state => state.userSlice) || []

    const updateProductCount = async (count: number) => {

        if (isUpdating || count < 1) return

        setIsUpdating(true)

        const res = await fetch('/api/basket/add', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userID: data._id, productID: _id, count })
        })

        const finalData = await res.json()

        setTimeout(() => {
            showToast(res.ok, finalData.message)
            if (res.ok) dispatch(userUpdater())
            setIsUpdating(false)
        }, 800); // just debounce so user don't spam 😂🤔
    }

    const breadCrumbData = [
        { text: "لپتاپ", link: "/products/category/laptop" },
        { text: name },
    ]

    const isProductInBasket = useMemo(() => {
        return relatedData?.BasketItem?.some(data => {
            if (data.productID._id == _id) { setProductCount(data.count); return true }
            setProductCount(1)
        })
    }, [relatedData?.BasketItem, _id])

    useEffect(() => {
        const timeout = setInterval(() => { setProductOffTimer(getTimer()) }, 1000)
        return () => clearInterval(timeout)
    }, [])

    return (

        <section className="primary-bg">

            <Head><title>{name}</title></Head>

            <Header />

            <div className="md:px-5 px-3">

                <BreadCrumb path={breadCrumbData} />

                <div
                    className=" flex flex-col lg:flex-row items-center md:gap-4 gap-8 bg-secondary-black container rounded-md p-4 text-white">

                    <div className=" flex-1">

                        <div className="flex items-center justify-between text-[11px]">

                            <div className="text-sm">
                                <span className="font-peyda text-gold text-[15px]">پیشنهاد ویژه</span>
                                <span className="block"></span>
                                <span className="text-[10px]">فرصت باقی مانده</span>
                            </div>

                            <div className="flex-center gap-2">

                                <div className="flex items-center flex-col justify-center gap-1">
                                    <div className="flex-center p-1 bg-green text-sm white size-7 rounded-full h-full">{productOffTimer?.seconds || "00"}</div>
                                    <p className="text-[10px] text-description-text">ثانیه</p>
                                </div>

                                <div className="flex flex-col justify-center gap-1">
                                    <div className="flex-center p-1 bg-white text-sm text-black/95 size-7 rounded-full h-full">{productOffTimer?.minutes || "00"}</div>
                                    <p className="text-[10px] text-description-text">دقیقه</p>
                                </div>

                                <div className="flex flex-col justify-center gap-1">
                                    <div className="flex-center p-1 bg-white text-sm text-black/95 size-7 rounded-full h-full">{productOffTimer?.hours || "00"}</div>
                                    <p className="text-[10px] text-description-text">ساعت</p>
                                </div>

                                <div className="flex flex-col justify-center gap-1">
                                    <div className="flex-center p-1 bg-white text-sm text-black/95 size-7 rounded-full h-full">{productOffTimer?.days || "00"}</div>
                                    <p className="text-[10px] text-description-text mr-2">روز</p>
                                </div>

                            </div>

                        </div>

                        <div className="flex gap-3 items-center my-4">

                            <div className="flex-1">
                                <div className="flex items-center gap-2 flex-col ch:cursor-pointer">
                                    <Image className="flex-center object-cover p-1 rounded-md border border-dark-red" src="/images/laptop-default.webp" width={500} height={500} alt="product-img" />
                                    <Image className="flex-center object-cover p-1 rounded-md border border-dark-gold" src="/images/laptop-default.webp" width={500} height={500} alt="product-img" />
                                    <Image className="flex-center object-cover p-1 rounded-md border border-dark-gold" src="/images/laptop-default.webp" width={500} height={500} alt="product-img" />
                                    <Image className="flex-center object-cover p-1 rounded-md border border-dark-gold" src="/images/laptop-default.webp" width={500} height={500} alt="product-img" />
                                    <Image className="flex-center object-cover p-1 rounded-md border border-dark-gold" src="/images/laptop-default.webp" width={500} height={500} alt="product-img" />
                                </div>
                            </div>

                            <div
                                className="flex-[5] text-[13px] border relative overflow-hidden border-dark-gold rounded-md text-description-text">
                                <div className={"relative overflow-hidden z-10"}>
                                    <Image
                                        ref={productImgRef}
                                        className="flex-center w-full object-cover py-4"
                                        src="/images/laptop-default.webp"
                                        width={600}
                                        height={600}
                                        alt="product-img"
                                        onPointerEnter={() => { setIsZoomShown(true) }}
                                        onPointerLeave={() => setIsZoomShown(false)}
                                        onPointerMove={e => { setCircleCoordinates({ x: e.clientX, y: e.clientY }) }}
                                    />

                                    <span
                                        style={{ left: (circleCoordinates.x - 70) + "px", top: (circleCoordinates.y + 70) - (productImgRef.current ? productImgRef.current.clientHeight / 2 : 0) + "px" }}
                                        className={`${zoomShown ? "fixed" : "invisible"} fixed overflow-hidden rounded-full border-2 border-white size-36`}><div style={{ backgroundImage: "url('/images/laptop-default.webp')", backgroundPosition: (circleCoordinates.x - (productImgRef.current ? productImgRef.current.x : 0) - 100) + "% " + (circleCoordinates.y - (productImgRef.current ? productImgRef.current.y : 0) - 110) + "%" }} className={"absolute size-full z-20 zoomedImg scale-[2.5]"} />
                                    </span>

                                </div>

                                <span
                                    onClick={() => setFullScreenShown(true)}
                                    className="absolute cursor-pointer flex-center size-10 border z-40 border-dark-gold left-3 bottom-3 ch:size-5 text-description-text rounded-sm"><IoSearch />
                                </span>

                                <span
                                    onClick={() => sharePage(location.href)}
                                    className="absolute size-10 border z-40 border-dark-gold left-16 bottom-3 ch:size-5 cursor-pointer flex-center rounded-sm"><IoShareSocialOutline />
                                </span>

                            </div>

                            <FullScreenImage url='/images/laptop-default.webp' isShown={fullScreenShown} closeFullScreenFn={() => setFullScreenShown(false)} />

                        </div>

                        <div className="bg-green rounded-md p-4 text-sm text-center">قدرت ما در بهترین قیمت بازار است بهترین عرضه کننده لپ تاپ در ایران</div>

                    </div>

                    <div className="md:flex-[1.2] xl:flex-[1.4] mb-auto">

                        <p>{name}</p>

                        <span className="bg-blue-dark flex gap-1 max-w-[140px] text-[11px] p-1 rounded-sm my-3">شناسه محصول :<div className="text-[13px]">{String(_id).slice(-7, -1)}</div></span>

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
                                {discount && <div className="red-line-through text-white ">{price.toLocaleString('fa-Ir')}</div>}
                                <div className="text-blue-white">{priceDiscountCalculator(price, discount)}<span className="text-description-text text-xl"> تومان</span></div>
                            </div>

                            {
                                isProductInBasket
                                    ?
                                    <div className="mt-3 flex items-center gap-2 flex-row-reverse justify-end">

                                        <Button
                                            filled
                                            fn={() => navigate.push('/cart')}
                                            text="موجود در سبد خرید"
                                        />

                                        <div className="flex h-[44px] items-center border border-dark-gold rounded-md">

                                            <div className="w-10 flex-center border-l h-full border-dark-gold">{productCount}</div>

                                            <div className={`flex-center flex-col w-6`}>
                                                <LuPlus className={` ${isUpdating ? 'cursor-not-allowed' : 'cursor-pointer'} `} onClick={() => updateProductCount(productCount + 1)} />
                                                <FiMinus className={` ${isUpdating ? 'cursor-not-allowed' : 'cursor-pointer'} `} onClick={() => updateProductCount(productCount - 1)} />
                                            </div>

                                        </div>
                                    </div>
                                    :
                                    <div className="flex items-center mt-3 gap-3">

                                        <div className="flex h-[44px] items-center border border-dark-gold rounded-md">

                                            <div className="w-10 flex-center border-l h-full border-dark-gold">{productCount}</div>

                                            <div className="flex-center flex-col w-6 ch:cursor-pointer gap-1">
                                                <LuPlus onClick={() => setProductCount(preve => preve + 1)} />
                                                <FiMinus onClick={() => productCount != 1 && setProductCount(preve => preve - 1)} />
                                            </div>

                                        </div>

                                        <Button
                                            text="افزودن به سبد خرید"
                                            fn={() => addProductToBasket(data._id, _id, productCount, dispatch)}
                                            Icon={<MdAddShoppingCart />}
                                            filled
                                        />

                                    </div>
                            }

                        </div>
                    </div>

                    <div className=" flex-1 text-[12px] hidden lg:block text-white mb-auto">
                        <div className="ch:rounded-sm space-y-1">
                            <h4 className="bg-[#343539] mb-2 py-1 px-2">مشخصات اصلی محصول</h4>
                            {
                                [...productSpecs]
                                    .slice(0, 6)
                                    .map((prd, len) => <h4
                                        key={len}
                                        className="bg-primary-black flex items-center gap-2 py-1 ch:flex-shrink-0 px-2"><GoCpu />{prd[1].value}
                                    </h4>)
                            }
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

                <div className="flex font-peyda items-center container ch:cursor-pointer h-[107px] text-description-text relative ch:transition-all bg-secondary-black text-[14px] mt-8 rounded-md p-4">

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

                                        <p className="text-description-text pt-2">اولین کسی باشید که دیدگاهی می نویسد “{name}”</p>

                                        {
                                            !isLogin ?
                                                <div className="text-center mt-12 p-3 border border-dark-gold rounded-md w-3/4 m-auto">برای ثبت نظر ابتدا <Link href="/login" className="text-blue-dark">وارد حساب </Link>خود شوید.</div>
                                                :
                                                <div className="mt-6">

                                                    <label htmlFor="textArea">دیدگاه شما <span className="text-white-red">*</span></label>

                                                    <textarea
                                                        className="max-h-60 h-[167px] w-full p-2 rounded-md my-2 bg-primary-black border border-description-text/10"
                                                        id="textArea" cols={30} rows={10}>
                                                    </textarea>

                                                    <Button text="ثبت نظر" filled={true} fn={() => { }}
                                                    />
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
                                            <div className="w-full mt-3 bg-white-red p-3 rounded-md">نظری برای این محصول ثبت نشده !</div>
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

                                    {
                                        productSpecs.map((data, ind) => {
                                            return (
                                                <div
                                                    key={ind}
                                                    className="flex items-center ch:pr-3 ch:h-8 gap-[3px] ch:w-full ch:bg-primary-black">
                                                    <div className="rounded-br-3xl flex-1 flex items-center rounded-tr-sm">{data[1].title}</div>
                                                    <div className="lg:flex-[7] sm:flex-[4] flex-[2] text-[13px] flex items-center">{data[1].value}</div>
                                                </div>
                                            )
                                        })
                                    }

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
        onClick={e => e.target instanceof HTMLDivElement && e.target.tagName == 'DIV' && closeFullScreenFn()}
        className={`fixed inset-0 w-full ${isShown ? 'fixed' : 'invisible'} bg-transparent px-3 sm:p-0 transition-all duration-200 ease-linear backdrop-blur-sm z-50 flex-center`}
    >
        <Image width={500} height={500} className="object-cover bg-primary-black rounded-md cursor-zoom-in size-[350px] sm:size-[400px] md:size-[500px] lg:size-[600px]" src={url} alt="full-screen-image" />
        <div onClick={closeFullScreenFn} className="size-12 absolute bg-white-red ch:size-8 ch:cursor-pointer right-8 top-8 rounded-md flex-center"><MdClose /></div>
    </div>
);

export async function getStaticProps(context: GetStaticPropsContext) {

    try {

        const response = await fetch(`http://localhost:3000/api/products/search/${context.params?.id}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(context.params?.id)
        });

        if (!response.ok) throw new Error('Failed to fetch product')

        const product = await response.json();

        return { props: { product } };

    } catch (error) {
        console.error('Error fetching product:', error);
        return { notFound: true }
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking',
    };
}