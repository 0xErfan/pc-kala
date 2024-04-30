import { IoClose } from "react-icons/io5"
import { Link } from "react-router-dom"

export interface ProductCartProps {
    price: number
    finalPrice: number
    count: number
    title: string
    src?: string
    id: number
}

const ProductCart = ({ price, finalPrice, count, title, src, id }: ProductCartProps) => {

    return (
        <>
            <div className=" block sm:hidden text-center border-b p-2 border-dark-gold pb-3 text-[13px]">

                <div className="flex flex-col">
                    <div className="sm:flex-1 cursor-pointer ml-auto flex-center "><IoClose className="size-6 rounded-sm bg-primary-black p-1" /></div>

                    <div className="m-auto flex items-center justify-between">
                        <img className="object-cover size-1/2 p-1" alt={title} src={src} />

                        <div className="flex flex-col gap-1">
                            <div>تعداد: <span className="text-white-red"> {price}</span> * {count} تومان </div>
                            <div>مجموع: <span className="text-white-red">{finalPrice}</span> تومان</div>
                        </div>

                    </div>

                    <Link to={`/product/${id}`} className="sm:flex-[8] hover:text-blue-white transition-all duration-200 cursor-pointer h-full m-auto text-title-text px-2 last:border-none">{title}</Link>
                </div>

            </div>

            <tr className="border-y isHidden border-gold/30 text-[13px] ch:border-l ch:border-dark-gold ch:last:border-l-none">

                <td className="flex ch:border-l ch:border-dark-gold">
                    <div className="flex-1 cursor-pointer flex-center border-r border-dark-gold"><IoClose className="size-6 rounded-sm bg-primary-black p-1" /></div>
                    <div className="flex-[2] size-20"><img alt={title} className="object-cover size-full p-1" src={src} /></div>
                    <Link to={`/product/${id}`} className="flex-[8] hover:text-blue-white transition-all duration-200 cursor-pointer h-full m-auto text-title-text px-2 last:border-none">{title}</Link>
                </td>

                <td><span className="text-white-red">{price}</span> تومان</td>

                <td>{count}</td>

                <td><span className="text-white-red">{finalPrice}</span> تومان</td>
            </tr>
        </>
    )
}

export default ProductCart