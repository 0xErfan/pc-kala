import { FiMinus } from "react-icons/fi"
import { IoClose } from "react-icons/io5"
import { LuPlus } from "react-icons/lu"
import { Link } from "react-router-dom"

interface ProductCartProps {
    price: number
    finalPrice: number
    count: number
    title: string
    src?: string
    id: number
}

const ProductCart = ({ price, finalPrice, count, title, src, id }: ProductCartProps) => {

    return (

        <tr className="border-y border-gold/30 text-[13px] ch:border-l ch:border-dark-gold ch:last:border-l-none">

            <td className="flex ch:border-l ch:border-dark-gold">
                <div className="flex-1 cursor-pointer flex-center border-r border-dark-gold"><IoClose className="size-6 rounded-sm bg-primary-black p-1" /></div>
                <div className="flex-[1.5] size-20"><img className="object-cover size-full p-1" src={src} /></div>
                <Link to={`/product/${id}`} className="flex-[8] hover:text-blue-white transition-all duration-200 cursor-pointer h-full m-auto text-title-text px-2 last:border-none">{title}</Link>
            </td>

            <td><span className="text-white-red">{price}</span> تومان</td>

            <td>{count}</td>

            <td><span className="text-white-red">{finalPrice}</span> تومان</td>
        </tr>
    )
}

export default ProductCart