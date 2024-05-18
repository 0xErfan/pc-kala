import Link from "next/link"
import Button from "./Button"
import { IoTrashOutline } from "react-icons/io5"
import { addWish, priceDiscountCalculator } from "@/utils"
import Image from "next/image"
import { unknownObjProps } from "@/global.t"

interface likeProductProps {
    productID: unknownObjProps<string | number>
    creator: number
}

const LikedProduct = ({ productID, creator }: likeProductProps) => {

    const { price, discount, image, _id, name } = productID
    const priceAfterDiscount = priceDiscountCalculator(price as number, discount as number)

    return (
        <div className="max-w-[316px] relative w-full m-auto bg-black/15 border border-gray-600/15 rounded-md p-3 overflow-hidden text-white text-sm">

            <Link href={`/products/${_id}`}><Image width={500} height={500} className="m-auto object-cover my-3 cursor-pointer" src="/images/laptop-default.webp" alt="product-name" /></Link>

            <div className="flex items-center gap-3 justify-center text-title-text text-sm">
                {discount && <div className="red-line-through text-white ">{price.toLocaleString('fa-Ir')}</div>}
                <div className="text-blue-white">{priceAfterDiscount} <span className="text-[10px] text-title-text">تومان</span></div>
            </div>

            <Link href={`/products/${_id}`} className="text-center min-h-[50px] h-full px-3 transition-all line-clamp-2 hover:text-blue-dark duration-300 cursor-pointer text-title-text break-all leading-[25px] my-4 ">{name}</Link>

            <Button Icon={<IoTrashOutline />} fn={() => addWish(creator, _id as number)} />
        </div>
    )
}

export default LikedProduct