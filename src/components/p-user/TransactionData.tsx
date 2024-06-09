import { TransactionProps } from "@/global.t"
import { useRouter } from "next/router"
import { memo } from "react"
import { FaRegEye } from "react-icons/fa"

const Transaction = ({ _id, createdAt, status, productsList, totalPrice }: TransactionProps) => {

    const navigate = useRouter()

    return (
        <tr className="sm:text-[13px] text-[12px] ch:py-3 border-b border-black/15 hover:bg-secondary-black transition-all">

            <td dir="ltr" className="text-[14px] tracking-wide">#{_id.slice(-5, -1).toUpperCase()}</td>

            <td>{new Date(createdAt).toLocaleDateString('fa-IR')}</td>

            <td>{productsList.reduce((previous, next) => previous + next.count, 0)}</td>

            <td>
                <div className="break-words flex items-center gap-2 max-w-[65px]">{totalPrice.toLocaleString('fa-IR')} <span className="sm:block hidden">تومان</span> </div>
            </td>

            <td>
                <div className={`sm:w-3/4 w-[90%] sm:h-3/4 h-[90%] m-auto text-[10px] sm:text-[12px] flex-center ${status == 'PROCESSING' ? 'bg-dark-gold/70' : status == 'DELIVERED' ? 'bg-green' : 'bg-white-red'} sm:p-2 p-1 whitespace-nowrap rounded-md`}>
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

            <td>
                <div className="flex-center items-center ch:border ch:border-white/35 sm:ch:size-9 sm:ch:p-2 ch:size-7 ch:p-1 ch:rounded-md ch:cursor-pointer ch:bg-secondary-black">
                    <FaRegEye onClick={() => navigate.push(`transactionDetails/${_id}`)} />
                </div>
            </td>
        </tr >
    )
}

export default memo(Transaction)