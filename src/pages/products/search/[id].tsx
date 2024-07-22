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
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Comment from "@/components/Comment";
import Header from "@/components/Header";
import { addProductToBasket, getTimer, productOffTimerProps, sharePage, showToast, totalPriceCalculator } from '@/utils'
import BreadCrumb from "@/components/BreadCrumb";
import { MdClose } from "react-icons/md";
import { GetStaticPropsContext } from "next";
import Image from "next/image";
import Head from "next/head";
import { useAppDispatch, useAppSelector } from "@/Hooks/useRedux";
import { modalDataUpdater, userUpdater } from "@/Redux/Features/globalVarsSlice";
import { useRouter } from "next/router";
import { commentProps, productDataTypes, unknownObjProps } from "@/global.t";
import { BsStarFill } from "react-icons/bs";
import Loader from "@/components/Loader";
import ProductModel from "@/models/Product";
import connectToDB from "@/config/db";

interface FullScreenImageProps {
    url: string
    isShown: boolean
    closeFullScreenFn: () => void
}

const Product = ({ product }: { product: productDataTypes }) => {

    const [activeSection, setActiveSection] = useState<"details" | "comments">("details")
    const [productCount, setProductCount] = useState(1)
    const [productOffTimer, setProductOffTimer] = useState<productOffTimerProps | null>(null)
    const [fullScreenShown, setFullScreenShown] = useState(false)

    const dispatch = useAppDispatch()
    const navigate = useRouter()
    const isLogin = useAppSelector(state => state.userSlice.isLogin)
    const { relatedData, data } = useAppSelector(state => state.userSlice) || []
    const [newCommentData, setNewCommentData] = useState<{ text: string, rate: number }>({ text: '', rate: 1 })
    const [sortCommentsBy, setSortCommentsBy] = useState<'rate' | 'byCustomer' | 'newest'>('newest')

    const [productComments, setProductComments] = useState<commentProps[]>([])
    const [isUpdating, setIsUpdating] = useState(false)
    const [productServices, setProductServices] = useState<unknownObjProps<number>>({ 'گارانتی ۱۸ ماهه پیسی کالا': 0 })
    const [currentImage, setCurrentImage] = useState(0)

    const { name, price, discount, specs, _id, image, category } = product || {}

    const productSpecs = useMemo(() => { return Object.entries(specs || {}) }, [specs])

    const updateProductCount = async (count: number) => {

        if (isUpdating || count < 1) return

        setIsUpdating(true)

        const res = await fetch('/api/basket/add', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userID: data._id, productID: _id, count })
        })

        const finalData = await res.json()

        showToast(res.ok, finalData.message)
        if (res.ok) dispatch(userUpdater())
        setIsUpdating(false)
    }

    const breadCrumbData = [
        { text: "لپتاپ", link: "/products/category/laptop" },
        { text: name },
    ]

    const isProductInBasket = useMemo(() => {

        return relatedData?.BasketItem?.some(data => {

            if (data.productID?._id == _id) {
                setProductCount(data.count)
                setProductServices({ ...data.services, 'گارانتی ۱۸ ماهه پیسی کالا': 0 })
                return true
            }
            setProductCount(1)
        })
    }, [relatedData?.BasketItem, _id])

    const productServicesUpdater = useCallback((value: boolean, title: string, price: number) => {

        if (isUpdating) return // prevent user spam (good for clown ones 🤡😂)

        if (isProductInBasket) {

            setIsUpdating(true)
            // Conditionally update or remove the property, based on the value(if true update else delete)
            let updatedProductServices: unknownObjProps<number>;

            if (value) {
                updatedProductServices = { ...productServices, [title]: price };
            } else {
                updatedProductServices = { ...productServices };
                delete updatedProductServices[title];
            }

            setTimeout(() => {
                addProductToBasket(data._id, _id, productCount, dispatch, updatedProductServices)
                    .then(() => {
                        dispatch(userUpdater())
                        return setIsUpdating(false)
                    })
            }, 800);

            return
        }

        if (value) {
            setProductServices(prev => ({ ...prev, [title]: price }))
        } else {
            delete productServices[title]
            setProductServices({ ...productServices })
        }

    }, [productServices, isProductInBasket]);

    const addNewComment = async () => {

        if (isUpdating) return
        if (newCommentData.text.length < 5) return showToast(false, 'نظر شما باید بیشتر از پنج کاراکتر باشد😙', 3500)
        if (newCommentData.text.length > 4000) return showToast(false, 'نظر شما بسیار طولانی است', 3500)

        setIsUpdating(true)

        const commentData = {
            creator: data?._id,
            body: newCommentData.text,
            productID: _id,
            rate: newCommentData.rate,
            services: { ...productServices },
            isCreatedByCustomer: [...relatedData.Transaction]
                .filter(data => data.status !== 'CANCELED') // canceled transactions can't be counted as customer buy
                .some(data => data.productsList.some(productData => { if (productData.productID?._id == _id) return true })) // check if user bought the product from hes/her transactions record
        }

        try {
            const res = await fetch('/api/comment/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...commentData })
            })

            if (res.ok) {

                dispatch(modalDataUpdater({
                    status: true,
                    isShown: true,
                    okBtnText: 'باش😒',
                    cancelBtnText: false,
                    title: 'ثبت موفق کامنت',
                    message: 'نظر شما با موفقیت ثبت شد و پس از بررسی های لازم منتشر خواهد شد.',
                    fn: () => { },
                }))

                setNewCommentData({ text: '', rate: 1 })
                setIsUpdating(false)
            }

        } catch (error) {
            showToast(false, error as string)
            setIsUpdating(false)
        }
    }

    const userRates = useMemo(() => {

        const allStars = []
        let selectedStars = newCommentData.rate

        for (let i = 0; i < 5; i++) {
            allStars.push(<BsStarFill
                onClick={() => setNewCommentData(prev => ({ ...prev, rate: i + 1 }))} // update new comment obj rate value
                className={`${selectedStars > 0 && 'text-gold'} cursor-pointer size-4`}
                key={i}
            />)
            selectedStars > 0 && selectedStars--
        }

        return [...allStars]
    }, [newCommentData.rate]) // calculate user rate and render the stars 

    const sortedComments = useMemo(() => {

        if (sortCommentsBy == 'newest') return [...productComments].reverse()
        if (sortCommentsBy == 'rate') return [...productComments].reverse().sort((a, b) => b.rate - a.rate)
        if (sortCommentsBy == 'byCustomer') return [...productComments].reverse().sort((a, b) => +b.isCreatedByCustomer - +a.isCreatedByCustomer)

    }, [sortCommentsBy, productComments])

    useEffect(() => {
        const timeout = setInterval(() => { setProductOffTimer(getTimer()) }, 1000)
        return () => clearInterval(timeout)
    }, [])

    useEffect(() => {
        (
            async () => {
                try {
                    const res = await fetch('/api/comment/get', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ _id })
                    })

                    const productComments = await res.json()

                    const acceptedComments = [...productComments].filter(data => data.accepted == 1)

                    setProductComments(acceptedComments)

                } catch (error) { console.log(error) }
            }
        )()
    }, [_id])

    return (

        <section className="primary-bg">

            <Head><title>{name}</title></Head>

            <Header />

            <div className="md:px-5 px-3">

                <BreadCrumb path={breadCrumbData} />

                <div className=" flex flex-col lg:flex-row items-center md:gap-4 gap-8 bg-secondary-black container rounded-md p-4 text-white">

                    <div className=" flex-1 flex flex-col">

                        <div className="flex flex-1 items-center justify-between text-[11px]">

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

                        <div className="flex gap-3 flex-1 h-full items-center my-4">

                            <div className="flex-1  mb-auto">
                                <div className="flex items-center gap-2 flex-col ch:cursor-pointer aspect-square w-full h-[47px]">
                                    {
                                        image?.length
                                            ?
                                            image.map((src, index) =>
                                                <Image
                                                    key={src}
                                                    className="flex-center object-contain p-1 rounded-md border border-dark-red size-[95%]"
                                                    src={src}
                                                    width={100}
                                                    height={100}
                                                    quality={95}
                                                    alt="product-img"
                                                    onClick={() => setCurrentImage(index)}
                                                />
                                            )
                                            : null
                                    }
                                </div>
                            </div>

                            <div className="flex-[5] text-[13px] border relative overflow-hidden mb-auto border-dark-gold rounded-md text-description-text h-[265px] flex-center">

                                <div className="relative overflow-hidden z-10 mb-auto size-full flex-center aspect-square">
                                    <Image
                                        className="flex-center object-contain m-auto py-2 bg-center size-full"
                                        src={image?.length ? image[currentImage] : '/images/imageNotFound.webp'}
                                        width={600}
                                        height={600}
                                        quality={100}
                                        priority
                                        alt="product-img"
                                    />
                                </div>

                                <span
                                    onClick={() => setFullScreenShown(true)}
                                    className="absolute cursor-pointer flex-center bg-secondary-black size-10 border z-40 border-dark-gold left-3 bottom-3 ch:size-5 text-description-text rounded-sm"><IoSearch />
                                </span>

                                <span
                                    onClick={() => sharePage(location.href)}
                                    className="absolute size-10 border z-40 bg-secondary-black border-dark-gold left-16 bottom-3 ch:size-5 cursor-pointer flex-center rounded-sm"><IoShareSocialOutline />
                                </span>

                            </div>

                            <FullScreenImage
                                url={image?.length ? image[currentImage] : '/images/imageNotFound.webp'}
                                isShown={fullScreenShown}
                                closeFullScreenFn={() => setFullScreenShown(false)}
                            />

                        </div>

                        <div className="bg-green flex-1 rounded-md p-4 text-sm text-center">قدرت ما در بهترین قیمت بازار است بهترین عرضه کننده لپ تاپ در ایران</div>

                    </div>

                    <div className="md:flex-[1.2] xl:flex-[1.4] mb-auto">

                        <p>{name}</p>

                        <span className="bg-blue-dark flex gap-1 max-w-[140px] text-[11px] p-1 rounded-sm my-3">شناسه محصول :<div className="text-[13px]">{String(_id).slice(-7, -1)}</div></span>

                        <div className="flex items-center gap-12 text-[12px]">

                            <p>گارانتی دستگاه</p>

                            <select defaultValue={1}
                                className="bg-primary-black rounded-md p-2 border border-dark-gold">
                                <option disabled={true} value={0}>گارانتی دستگاه را انتخاب کنید</option>
                                <option value={1}>گارانتی 18 ماهه شرکتی</option>
                            </select>

                        </div>

                        <div className={`${(category == 'pc' || category == 'laptop') ? 'opacity-100' : 'opacity-30'} py-0 relative`}>

                            {
                                !(category == 'pc' || category == 'laptop')
                                    ?
                                    <span className="inset-0 w-full h-full z-30 cursor-no-drop absolute"></span>
                                    : null
                            }

                            <p className="text-dark-red mt-6 text-sm">خدمات ویژه پی سی کالا :</p>

                            <div className="text-[12px] ch:my-3 ch:text-description-text">

                                <div className="flex items-center gap-1">
                                    <input
                                        checked={Object.keys(productServices)?.some(key => key == 'بیمه محصول')}
                                        onChange={e => productServicesUpdater(e.target.checked, 'بیمه محصول', 1500000)}
                                        name="insurance"
                                        type="checkbox"
                                        className={`${isUpdating && 'cursor-wait'}`}
                                    />
                                    <label htmlFor="insurance">گارانتی طلایی پی سی کالا (پس انداز اندک برای حسرت های ناگهانی) <span className="text-blue-white mx-1">1,500,000 تومان</span></label>
                                </div>

                                <div className="flex items-center gap-1">
                                    <input
                                        checked={Object.keys(productServices)?.some(key => key == 'نصب ویندوز')}
                                        onChange={e => productServicesUpdater(e.target.checked, 'نصب ویندوز', 500000)}
                                        name="windows"
                                        type="checkbox"
                                        className={`${isUpdating && 'cursor-wait'}`}
                                    />
                                    <label htmlFor="windows">نصب ویندوز حرفه ای کار هرکسی نیست ، تیکو بزن . <span className="text-blue-white mx-1">500,000 تومان</span> </label>
                                </div>

                                <div className="flex items-center gap-1">
                                    <input
                                        checked={Object.keys(productServices)?.some(key => key == 'نصب ویندوز اورجینال')}
                                        onChange={e => productServicesUpdater(e.target.checked, 'نصب ویندوز اورجینال', 2500000)}
                                        name="windows-org"
                                        type="checkbox"
                                        className={`${isUpdating && 'cursor-wait'}`}
                                    />
                                    <label htmlFor="windows-org">ویندوز اورجینال (لایسنس 1 ساله)<span className="text-blue-white mx-1">2,500,000 تومان</span> </label>
                                </div>

                                <div className="flex items-center gap-1">
                                    <input
                                        checked={Object.keys(productServices)?.some(key => key == 'نصب انتی ویروس')}
                                        onChange={e => productServicesUpdater(e.target.checked, 'نصب انتی ویروس', 150000)}
                                        name="anti-virus"
                                        type="checkbox"
                                        className={`${isUpdating && 'cursor-wait'}`}
                                    />
                                    <label htmlFor="anti-virus"> نصب آنتی ویروس<span className="text-blue-white mx-1">150,000 تومان</span></label>
                                </div>

                            </div>
                        </div>

                        <div>

                            <div className="flex items-center gap-3 text-title-text text-2xl xl:mt-10 mt-8">
                                {discount && <div className="red-line-through text-white ">{price.toLocaleString('fa-IR')}</div>}
                                <div className="text-blue-white">{totalPriceCalculator(+price, +discount, 1, productServices, true).toLocaleString('fa-IR')}<span className="text-description-text text-xl"> تومان</span></div>
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
                                                <LuPlus className={` ${isUpdating ? 'cursor-wait' : 'cursor-pointer'} `} onClick={() => updateProductCount(productCount + 1)} />
                                                <FiMinus className={` ${isUpdating ? 'cursor-wait' : 'cursor-pointer'} `} onClick={() => updateProductCount(productCount - 1)} />
                                            </div>

                                        </div>
                                    </div>
                                    :
                                    <div className="flex items-center mt-3 gap-3">

                                        <div className="flex h-[44px] items-center border border-dark-gold rounded-md">

                                            <div className="w-10 flex-center border-l h-full border-dark-gold">{productCount}</div>

                                            <div className="flex-center flex-col w-6 ch:cursor-pointer gap-1">
                                                <LuPlus onClick={() => setProductCount(prev => prev + 1)} />
                                                <FiMinus onClick={() => productCount != 1 && setProductCount(prev => prev - 1)} />
                                            </div>

                                        </div>

                                        <Button
                                            text="افزودن به سبد خرید"
                                            fn={() => { isLogin ? addProductToBasket(data._id, _id, productCount, dispatch, productServices) : showToast(false, 'ابتدا وارد حساب خود شوید') }}
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
                                    .map((data, len) => <h4 key={len} className="bg-primary-black flex items-center gap-2 py-1 ch:flex-shrink-0 px-2"><GoCpu />{data[1].value}</h4>)
                            }
                        </div>

                        <div className="mt-5">

                            <div className="p-3 text-center rounded-sm cursor-pointer bg-dark-red text-[13px]">نحوه خرید اقساطی</div>

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
                        <div className={`flex-center flex-col ${activeSection == "comments" && "active-section"} gap-1`}>
                            <GoCommentDiscussion className="text-description-text size-6" />
                            <p>نظرات کاربران</p>
                        </div>
                    </div>
                    {(productComments?.length && activeSection == 'comments') ? <span className="absolute bg-secondary-black aspect-square size-8 rounded-md left-5 top-[25px] flex-center text-center pt-2 text-gold shadow-md text-[16px] p-1">{productComments?.length}</span> : null}

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

                                    <div className={`flex-1 mb-auto w-full`}>

                                        {
                                            productComments?.length ? null : <p className="text-description-text pt-2">اولین کسی باشید که دیدگاهی می نویسد “{name}”</p>
                                        }

                                        {
                                            !isLogin ?
                                                <div className="text-center mt-12 p-3 border border-dark-gold rounded-md w-3/4 m-auto">برای ثبت نظر ابتدا <Link href="/login" className="text-blue-dark">وارد حساب </Link>خود شوید.</div>
                                                :
                                                <div className="mt-6 w-full">

                                                    <div className="flex items-center justify-between ch:flex-1 w-full">

                                                        <label htmlFor="textArea">دیدگاه شما <span className="text-white-red">*</span></label>

                                                        <div className="flex items-center gap-1 justify-evenly">
                                                            <div>امتیاز شما:</div>
                                                            <div className="flex items-center gap-1 ch:size-5">{userRates}</div>
                                                        </div>
                                                    </div>

                                                    <textarea
                                                        className="max-h-60 h-[167px] w-full p-2 rounded-md my-2 bg-primary-black border border-description-text/10"
                                                        value={newCommentData.text}
                                                        onChange={e => setNewCommentData(preve => ({ ...preve, text: e.target.value }))}
                                                        id="textArea" cols={30} rows={10}>
                                                    </textarea>

                                                    <div className="w-full ch:w-full">
                                                        <Button
                                                            text={isUpdating ? '' : 'ثبت نظر'}
                                                            Icon={isUpdating ? <Loader /> : <></>}
                                                            filled
                                                            fn={addNewComment}
                                                        />
                                                    </div>

                                                </div>
                                        }
                                    </div>
                                </div>

                                <div className="mt-24">
                                    <div className="flex items-center justify-between border-b border-title-text pb-2">
                                        <p className="font-peyda text-gold text-[15px]">نقد و بررسی ها</p>
                                        <div className="flex items-center text-[11px] gap-4 text-description-text ch:transition-all">
                                            <BsFilterLeft className="size-5" />
                                            <p onClick={() => setSortCommentsBy('newest')} className={`${sortCommentsBy == 'newest' && 'text-white-red'} cursor-pointer`}>جدیدترین</p>
                                            <p onClick={() => setSortCommentsBy('rate')} className={`${sortCommentsBy == 'rate' && 'text-white-red'} cursor-pointer`}>براساس امتیاز</p>
                                            <p onClick={() => setSortCommentsBy('byCustomer')} className={`${sortCommentsBy == 'byCustomer' && 'text-white-red'} cursor-pointer`}>دیدگاه خریداران</p>
                                        </div>
                                    </div>

                                    {
                                        sortedComments?.length
                                            ?
                                            <div className="flex flex-col mt-3 gap-2">
                                                {
                                                    sortedComments.map((data: commentProps) => <Comment key={data.createdAt} {...data} />)
                                                }
                                            </div>
                                            :
                                            <div className="w-full mt-3 bg-primary-black px-3 py-4 text-[14px] rounded-md">نظری برای این محصول ثبت نشده !</div>
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
                                                    className="flex items-center ch:pr-3 ch:min-h-9 ch:h-full gap-[3px] ch:w-full ch:bg-primary-black"
                                                >
                                                    <div className="rounded-br-3xl flex-1 flex pr-2 font-peyda text-[12px] items-center rounded-tr-sm">{data[1].title}</div>
                                                    <div className="lg:flex-[7] sm:flex-[4] flex-[3.5] text-[12px] sm:text-[13px] flex items-center">{data[1].value}</div>
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
}

const FullScreenImage = ({ url, isShown, closeFullScreenFn }: FullScreenImageProps) => (
    <div className={`fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] size-[350px] sm:size-[400px] md:size-[500px] lg:size-[600px] ${isShown ? 'fixed' : 'invisible'} bg-transparent px-3 sm:p-0 transition-all duration-200 ease-linear z-[999999] flex-center`}
    >
        <Image
            width={500}
            height={500}
            quality={100}
            className="object-cover bg-primary-black rounded-md cursor-zoom-in"
            src={url}
            alt="full-screen-image"
        />

        <div onClick={closeFullScreenFn} className="size-12 absolute bg-white-red ch:size-8 ch:cursor-pointer right-8 top-8 rounded-md flex-center"><MdClose /></div>
    </div>
);

export async function getStaticProps(context: GetStaticPropsContext) {

    try {

        await connectToDB()

        const foundedProduct = await ProductModel.findOne({ _id: context?.params?.id })
        if (!foundedProduct) return { notFound: true }

        return { props: { product: JSON.parse(JSON.stringify(foundedProduct)) } };

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

export default memo(Product)