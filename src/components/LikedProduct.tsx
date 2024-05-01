import Link from "next/link"
import Button from "./Button"
import { IoTrashOutline } from "react-icons/io5"

const LikedProduct = () => {


    return (
        <div className="max-w-[316px] relative w-full m-auto bg-black/15 border border-gray-600/15 rounded-md p-3 overflow-hidden text-white text-sm">

            <Link href="/products/324987fui32"><img className="m-auto object-cover my-3 cursor-pointer" src="/images/victus-15.webp" alt="product-name" /></Link>

            {"w" &&
                <div className="flex items-center gap-3 justify-center text-title-text text-sm">
                    <div className="red-line-through text-white ">۲۳,۷۳۴,۱۷۴</div>
                    <div className="text-blue-white">۲۳,۱۴۵,۶۲۵ <span className="text-[10px] text-title-text">تومان</span></div>
                </div>
            }

            <Link href="products/324987fui32" className="text-center px-3 transition-all line-clamp-2 hover:text-blue-dark duration-300 cursor-pointer text-title-text break-all leading-[25px] my-4 ">لپ تاپ ایسوس R565EP i7-1165G7/8GB/512GB/MX330-2G</Link>

            <Button Icon={<IoTrashOutline />} fn={() => { }} />
        </div>
    )
}

export default LikedProduct