import { FaRegHeart } from "react-icons/fa";
import { CiShoppingBasket } from "react-icons/ci";
import Link from "next/link";
import { priceDiscountCalculator } from "../utils";
import Image from "next/image";
import { BsGpuCard } from "react-icons/bs";
import { HiOutlineCpuChip } from "react-icons/hi2";
import { RiRam2Line } from "react-icons/ri";
import { LuHardDrive } from "react-icons/lu";

const Product = (productProps: unknown) => {

    const { discount, price, name, category, specs, _id } = productProps || {}

    const priceAfterOff = priceDiscountCalculator(price, discount)

    return (
        <div className="sm:max-w-[316px] w-full relative m-auto bg-secondary-black border-t-4 border-dark-red rounded-xl p-3 overflow-hidden text-white text-sm">

            {discount && <div className=" flex-center absolute bg-[#EE273A] size-9 text-white pt-1 text-sm disscount-border">{discount?.toLocaleString('fa-Ir')}٪</div>}

            <Link href={`/products/search/${_id}`}>
                <Image width={500} height={500} priority alt="product-name" blurDataURL="true" src='/images/laptop-default.webp' className="m-auto object-cover my-3 cursor-pointer" />
            </Link>

            <div className="flex items-center gap-3 justify-center whitespace-pre text-title-text text-sm">
                {discount && <div className="red-line-through text-white ">{Number(price)?.toLocaleString('fa-Ir')}</div>}
                <div className="text-blue-white">{priceAfterOff} <span className="text-[10px] text-title-text">تومان</span></div>
            </div>

            <Link href={`/products/search/${_id}`} className="text-center px-3 transition-all min-h-[50px] h-full line-clamp-2 hover:text-blue-dark duration-300 cursor-pointer text-title-text break-all leading-[25px] my-4 ">{name}</Link>

            {
                (category == 'laptop' || category == 'pc')
                &&
                <div className="grid grid-cols-4 gap-2 ch:bg-primary-black ch:rounded-md ch-gap-1 font-peyda text-[13px]">
                    <div className="flex-center flex-col py-[6px] gap-1 ch:size-5 ch:flex ch:items-center ch:justify-center whitespace-pre"> <BsGpuCard /> <p className="text-blue-white">{specs.gpu.value.split(' ')[0]}</p></div>
                    <div className="flex-center flex-col py-[6px] gap-1 ch:size-5 ch:flex ch:items-center ch:justify-center whitespace-pre"> <LuHardDrive /> <p className="text-blue-white">{specs.ssd.value.split(' ').find(value => value.includes('GB') || value.includes('MB') || value.includes('TB'))}</p></div>
                    <div className="flex-center flex-col py-[6px] gap-1 ch:size-5 ch:flex ch:items-center ch:justify-center whitespace-pre"> <HiOutlineCpuChip /> <p className="text-blue-white">{specs.cpu.value.split(' ').filter(value => value.split('').some(char => !isNaN(char)))}</p></div>
                    <div className="flex-center flex-col py-[6px] gap-1 ch:size-5 ch:flex ch:items-center ch:justify-center whitespace-pre"> <RiRam2Line /> <p className="text-blue-white">{specs.ram.value.split(' ').find(value => value.includes('GB') || value.includes('MB'))}</p></div>
                </div>
            }

            <div className="flex items-center gap-3 mt-4 text-description-text ch:cursor-pointer ch:size-8">
                <CiShoppingBasket className="bg-primary-black p-[3px] rounded-full " />
                <FaRegHeart className="p-[6px]" />
            </div>
        </div>
    )
}

export default Product;