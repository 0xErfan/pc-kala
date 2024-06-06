import { TransactionProps } from "@/global.t"
import { useRouter } from "next/router"
import { memo } from "react"
import { FaRegEye } from "react-icons/fa"

const Transaction = ({ _id, createdAt, status, productsList, totalPrice }: TransactionProps) => {

    const navigate = useRouter()

    return (
        <tr className="sm:text-[13px] text-[12px] ch:py-3 border-b border-black/15 hover:bg-secondary-black transition-all">

            <td dir="ltr" className="text-[14px] tracking-wide">#{_id.slice(-6, -1).toUpperCase()}</td>

            <td>{new Date(createdAt).toLocaleDateString('fa-IR')}</td>

            <td>{productsList.reduce((previous, next) => previous + next.count, 0)}</td>

            <td className="break-words max-w-[65px]">{totalPrice.toLocaleString('fa-IR')} تومان </td>

            <td>
                <div className={`w-3/4 h-3/4 m-auto flex-center ${status == 'PROCESSING' ? 'bg-dark-gold/70' : status == 'DELIVERED' ? 'bg-green' : 'bg-white-red'} sm:p-2 p-1 rounded-md text-[12px]`}>
                    {
                        status == 'DELIVERED'
                            ?
                            'ارسال موفق'
                            :
                            status == 'PROCESSING'
                                ?
                                'درحال ارسال'
                                :
                                'لغو شده'
                    }
                </div>
            </td>

            <td className="flex-center items-center ch:border ch:border-white/35 sm:ch:size-9 sm:ch:p-2 ch:size-8 ch:p-1 ch:rounded-md ch:cursor-pointer ch:bg-secondary-black"><FaRegEye onClick={() => navigate.push(`success-purchase/${_id}`)} /></td>
        </tr>
    )
}

export default memo(Transaction)