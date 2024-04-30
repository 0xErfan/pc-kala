import { CiHardDrive } from "react-icons/ci"
import { FaRegHeart } from "react-icons/fa";
import { CiShoppingBasket } from "react-icons/ci";
import { Link } from "react-router-dom";
import { priceDiscountCalculator } from "../utils";

const Product = (productProps: unknown) => {

    const discount = Math.ceil(Math.random() * 55)
    const originalPrice = productProps?.product?.price
    const priceAfterOff = priceDiscountCalculator(originalPrice, discount)

    return (
        <div className="sm:max-w-[316px] w-full relative m-auto bg-secondary-black border-t-4 border-dark-red rounded-xl p-3 overflow-hidden text-white text-sm">

            <div className=" flex-center absolute bg-[#EE273A] size-9 text-white pt-1 text-sm disscount-border">{discount.toLocaleString('fa-Ir')}٪</div>

            <Link to="/products/324987fui32"><img className="m-auto object-cover my-3 cursor-pointer" src={'images/victus-15.webp'} alt="product-name" /></Link>

            <div className="flex items-center gap-3 justify-center text-title-text text-sm">
                <div className="red-line-through text-white ">{Number(originalPrice).toLocaleString('fa-Ir')}</div>
                <div className="text-blue-white">{priceAfterOff} <span className="text-[10px] text-title-text">تومان</span></div>
            </div>

            <Link to="products/324987fui32" className="text-center px-3 transition-all line-clamp-2 hover:text-blue-dark duration-300 cursor-pointer text-title-text break-all leading-[25px] my-4 ">hi</Link>

            <div className="grid grid-cols-4 gap-2 ch:bg-primary-black ch:rounded-md ch-gap-1">

                <div className="flex-center flex-col py-[6px] gap-1 ch:size-5"> <CiHardDrive /> <p className="text-blue-white">512</p></div>
                <div className="flex-center flex-col py-[6px] gap-1 ch:size-5"> <CiHardDrive /> <p className="text-blue-white">512</p></div>
                <div className="flex-center flex-col py-[6px] gap-1 ch:size-5"> <CiHardDrive /> <p className="text-blue-white">512</p></div>
                <div className="flex-center flex-col py-[6px] gap-1 ch:size-5"> <CiHardDrive /> <p className="text-blue-white">512</p></div>
            </div>

            <div className="flex items-center gap-3 mt-4 text-description-text ch:cursor-pointer ch:size-8">
                <CiShoppingBasket className="bg-primary-black p-[3px] rounded-full " />
                <FaRegHeart className="p-[6px]" />
            </div>
        </div>
    )
}

export default Product