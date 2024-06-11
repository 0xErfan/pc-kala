import { FaHeart } from "react-icons/fa";
import { CiShoppingBasket } from "react-icons/ci";
import Link from "next/link";
import { addProductToBasket, addWish, showToast } from "../utils";
import Image from "next/image";
import { BsGpuCard } from "react-icons/bs";
import { HiOutlineCpuChip } from "react-icons/hi2";
import { RiRam2Line } from "react-icons/ri";
import { LuHardDrive } from "react-icons/lu";
import { productDataTypes } from "@/global.t";
import { useAppDispatch, useAppSelector } from "@/Hooks/useRedux";
import { useEffect, useState } from "react";
import { userUpdater } from "@/Redux/Features/globalVarsSlice";
import prefix from "@/config/prefix";

const Product = (product: productDataTypes) => {

    const { data, relatedData } = useAppSelector(state => state.userSlice) || {}
    const { discount, price, name, category, specs, _id } = product || {}
    const priceAfterOff = price - (price * (discount / 100))

    const dispatch = useAppDispatch()

    const [isProductInUserWish, setIsProductInUserWish] = useState(false)
    const [isProductInBasket, setIsProductInBasket] = useState(false)

    const isLoggedIn = useAppSelector(state => state.userSlice.isLogin)

    useEffect(() => {

        relatedData?.Wish?.some(data => {
            if (data.productID?._id == _id) {
                setIsProductInUserWish(true)
                return true
            }
        })

        setIsProductInBasket(
            relatedData?.BasketItem?.some(data => {
                if (data.productID?._id == _id) {
                    setIsProductInBasket(true)
                    return true
                }
            })
        )

    }, [relatedData?.Wish, relatedData?.BasketItem, _id])

    const addWishHandler = () => {

        if (!isLoggedIn) return showToast(false, 'ابتدا وارد حساب خود شوید')

        addWish(data._id, _id)
            .then(() => setIsProductInUserWish(prev => !prev))
            .then(() => dispatch(userUpdater()))
    }

    return (
        <div className="sm:max-w-[316px] transition-all duration-300 w-full relative m-auto bg-secondary-black border-t-4 border-dark-red rounded-xl p-3 overflow-hidden text-white text-sm">

            {discount && <div className=" flex-center absolute bg-[#EE273A] size-9 text-white pt-1 text-sm discount-border">{discount?.toLocaleString('fa-IR')}٪</div>}

            <Link href={`/products/search/${_id}`}>
                <Image
                    className="m-auto object-cover cursor-pointer md:size-[80%] size-[73%]"
                    src={`${prefix}/images/laptop-default.webp`}
                    width={500}
                    height={500}
                    priority
                    alt="product-name"
                    blurDataURL="true"
                />
            </Link>

            <div className="flex items-center gap-3 justify-center whitespace-pre text-title-text text-sm">
                {discount && <div className="red-line-through text-white ">{Number(price)?.toLocaleString('fa-IR')}</div>}
                <div className="text-blue-white">{priceAfterOff.toLocaleString('fa-IR')} <span className="text-[10px] text-title-text">تومان</span></div>
            </div>

            <Link href={`/products/search/${_id}`} className="text-center px-3 transition-all min-h-[50px] h-full line-clamp-2 hover:text-blue-dark duration-300 cursor-pointer text-title-text break-all leading-[25px] my-4 ">{name}</Link>

            {
                (category == 'laptop' || category == 'pc')
                    ?
                    <div className="grid grid-cols-4 gap-2 ch:bg-primary-black ch:rounded-md ch-gap-1 font-peyda text-[13px]">
                        <div className="flex-center flex-col py-[6px] gap-1 ch:size-5 ch:flex ch:items-center ch:justify-center whitespace-pre"> <BsGpuCard /> <p className="text-blue-white">{specs.gpu.value.split(' ')[0]}</p></div>
                        <div className="flex-center flex-col py-[6px] gap-1 ch:size-5 ch:flex ch:items-center ch:justify-center whitespace-pre"> <LuHardDrive /> <p className="text-blue-white">{specs.ssd.value.split(' ').find(value => value.includes('GB') || value.includes('MB') || value.includes('TB'))}</p></div>
                        <div className="flex-center flex-col py-[6px] gap-1 ch:size-5 ch:flex ch:items-center ch:justify-center whitespace-pre"> <HiOutlineCpuChip /> <p className="text-blue-white">{specs.cpu.value.split(' ').find(value => value.length > 3 && value.split('').some(char => !isNaN(+char)))}</p></div>
                        <div className="flex-center flex-col py-[6px] gap-1 ch:size-5 ch:flex ch:items-center ch:justify-center whitespace-pre"> <RiRam2Line /> <p className="text-blue-white">{specs.ram.value.split(' ').find(value => value.includes('GB') || value.includes('MB'))}</p></div>
                    </div>
                    :
                    <div className="md:h-[56px]"></div>
            }

            <div className="flex items-center gap-3 mt-4 text-description-text ch:cursor-pointer ch:size-8">

                <CiShoppingBasket
                    onClick={() => isLoggedIn ? addProductToBasket(data._id, _id, undefined, dispatch) : showToast(false, 'ابتدا وارد حساب خود شوید')}
                    className={`bg-primary-black ${!isProductInBasket ? 'text-description-text' : 'text-green'} transition-all p-[3px] rounded-full`}
                />

                <FaHeart
                    onClick={addWishHandler}
                    className={`p-[6px] ${!isProductInUserWish ? 'text-description-text' : 'text-white-red'} transition-all`}
                />

            </div>
        </div>
    )
}

export default Product;