import { IoClose } from "react-icons/io5"
import Link from "next/link"
import Image from "next/image"
import { removeProductFromBasket, showToast } from "@/utils"
import { useAppDispatch, useAppSelector } from "@/Hooks/useRedux"
import { userUpdater } from "@/Redux/Features/globalVarsSlice"
import { useState } from "react"

export interface ProductCartProps {
    price: number
    finalPrice: number
    count: number
    title: string
    src?: string
    id: string
}

const ProductCart = ({ price, finalPrice, count, title, src, id }: ProductCartProps) => {

    const { data } = useAppSelector(state => state.userSlice)
    const dispatch = useAppDispatch()
    const [isUpdating, setIsUpdating] = useState(false)

    const updateProductCount = async (count: number) => {

        if (isUpdating || count < 1) return

        setIsUpdating(true)

        const res = await fetch('/api/basket/add', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userID: data._id, productID: id, count })
        })

        const finalData = await res.json()

        setTimeout(() => {
            showToast(res.ok, finalData.message)
            if (res.ok) dispatch(userUpdater())
            setIsUpdating(false)
        }, 800); // just debounce so user don't spam 😂🤔
    }

    return (
        <>
            <tr className=" block sm:hidden text-center border-b p-2 border-dark-gold pb-3 text-[13px]">

                <td className="flex flex-col">
                    <div className="sm:flex-1 cursor-pointer ml-auto flex-center "><IoClose className="size-6 rounded-sm bg-primary-black p-1" /></div>

                    <div className="m-auto flex items-center justify-between">
                        <Image width={400} height={400} className="object-cover size-1/2 p-1" alt={title} src={src!} />

                        <div className="flex flex-col gap-1">
                            <div>تعداد: <span className="text-white-red"> {price}</span> * {count} تومان </div>
                            <div>مجموع: <span className="text-white-red">{finalPrice}</span> تومان</div>
                        </div>

                    </div>

                    <Link href={`/product/${id}`} className="sm:flex-[8] hover:text-blue-white transition-all duration-200 cursor-pointer h-full m-auto text-title-text px-2 last:border-none">{title}</Link>
                </td>

            </tr>

            <tr className="border-y w-full isHidden border-gold/30 text-[13px] ch:border-l ch:border-dark-gold ch:last:border-l-none">

                <td className="flex ch:border-l ch:border-dark-gold">

                    <div
                        onClick={() => removeProductFromBasket(id, data._id).then(() => dispatch(userUpdater()))}
                        className="flex-1 cursor-pointer flex-center border-r border-dark-gold"><IoClose className="size-6 rounded-sm bg-primary-black p-1"
                        />
                    </div>

                    <div className="flex-[2] size-20">
                        <Image
                            width={400}
                            src={src as string}
                            height={400}
                            alt={title}
                            className="object-cover size-full p-1"
                        />
                    </div>

                    <Link href={`/products/search/${id}`} className="flex-[8] hover:text-blue-white transition-all duration-200 cursor-pointer h-full m-auto text-title-text px-2 last:border-none">{title}</Link>
                </td>

                <td><span className="text-white-red">{price.toLocaleString('fa-IR')}</span> تومان</td>

                <td>
                    <div className="flex items-center flex-col gap-2">
                        {count}
                        <div className="flex items-center w-12 ch:w-full overflow-hidden justify-evenly text-center rounded-md border ch:transition-all border-dark-gold ch:p-1 ch:first:pl-1 ch:last:pr-1">
                            <div onClick={() => updateProductCount(count + 1)} className={`hover:bg-black/30 ${isUpdating ? 'cursor-wait' : 'cursor-pointer'}`}>+</div>
                            <div onClick={() => updateProductCount(count - 1)} className={`hover:bg-black/30 ${isUpdating ? 'cursor-wait' : 'cursor-pointer'}`}>-</div>
                        </div>
                    </div>
                </td>

                <td><span className="text-white-red">{finalPrice.toLocaleString('fa-IR')}</span> تومان</td>
            </tr>
        </>
    )
}

export default ProductCart