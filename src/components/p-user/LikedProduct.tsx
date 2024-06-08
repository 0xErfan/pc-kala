import Link from "next/link"
import Button from "../Button"
import { IoTrashOutline } from "react-icons/io5"
import { addWish } from "@/utils"
import Image from "next/image"
import { productDataTypes } from "@/global.t"
import { useAppDispatch } from "@/Hooks/useRedux"
import { userUpdater } from "@/Redux/Features/globalVarsSlice"
import prefix from "@/config/prefix"

interface likeProductProps {
    productID: productDataTypes
    creator: string
}

const LikedProduct = ({ productID, creator }: likeProductProps) => {

    const { price, discount, image, _id, name } = productID
    const priceAfterDiscount = price - (price * (discount / 100))
    
    const dispatch = useAppDispatch()

    return (
        <div className="max-w-[316px] relative w-full m-auto bg-black/15 border border-gray-600/15 rounded-md p-3 overflow-hidden text-white text-sm">

            <Link href={`/products/search/${_id}`}><Image width={500} height={500} className="m-auto object-cover my-3 cursor-pointer" src={`${prefix}/images/laptop-default.webp`} alt="product-name" /></Link>

            <div className="flex items-center gap-3 justify-center text-title-text text-sm">
                {discount && <div className="red-line-through text-white ">{price.toLocaleString('fa-IR')}</div>}
                <div className="text-blue-white">{priceAfterDiscount} <span className="text-[10px] text-title-text">تومان</span></div>
            </div>

            <Link href={`/products/search/${_id}`} className="text-center min-h-[50px] h-full px-3 transition-all line-clamp-2 hover:text-blue-dark duration-300 cursor-pointer text-title-text break-all leading-[25px] my-4 ">{name}</Link>

            <Button Icon={<IoTrashOutline />} fn={() => addWish(creator, _id).then(() => dispatch(userUpdater()))} />
        </div>
    )
}

export default LikedProduct