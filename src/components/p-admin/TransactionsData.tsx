import { useAppDispatch, useAppSelector } from '@/Hooks/useRedux'
import { modalDataUpdater, setActiveStatusBox } from '@/Redux/Features/globalVarsSlice'
import { showToast } from '@/utils'
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from 'react'
import { ModalProps } from '../Modal'
import { TransactionProps } from '@/global.t'

interface Props {
    rowNumber: number
    transactionsUpdater: () => void
}

const TransactionData = ({ _id, createdAt, customerData, totalPrice, status, rowNumber, transactionsUpdater }: TransactionProps & Props) => {

    const dispatch = useAppDispatch()
    const activeStatusBox = useAppSelector(state => state.globalVarsSlice.activeStatusBox)
    const [isLoading, setIsLoading] = useState(false)

    const changeTransactionStatus = async (value: typeof status) => {

        if (isLoading) return

        dispatch(modalDataUpdater({
            isShown: true,
            message: `آیا از تغییر وضعیت سفارش به ${value == 'DELIVERED' ? "'ارسال شده'" : value == 'CANCELED' ? "'لغو شده '" : "'درحال ارسال '"} اطمینان دارید؟`,
            title: 'تغییر وضعیت سفارش',
            status: true,
            fn: async () => {
                try {
                    setIsLoading(true)

                    const res = await fetch('/api/order/statusUpdate', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ _id, status: value })
                    })

                    const data = await res.json()

                    showToast(res.ok, data.message)
                    if (res.ok) { transactionsUpdater(); dispatch(setActiveStatusBox(0)) }

                } catch (error) { console.log(error) }
                finally { setIsLoading(false) }
            }
        } as ModalProps))
    }

    const activeStatusBoxUpdater = () => { dispatch(setActiveStatusBox(_id)) }

    return (

        <tr className='ch:border-2 ch:border-white ch:ch:text-[10px] ch:md:text-[15px] ch:py-2 font-peyda'>

            <td>{rowNumber + 1}</td>

            <td>{customerData.name + customerData.lName}</td>

            <td>{customerData.email || 'وارد نشده'}</td>

            <td>{new Date(createdAt).toLocaleDateString('fa')}</td>

            <td dir='ltr'>{totalPrice.toLocaleString('fa') + 'T'}</td>

            <td className='w-20 relative'>

                <div className={`flex-center w-full px-2 `}>

                    <button
                        onClick={activeStatusBoxUpdater}
                        className={`${status == 'CANCELED' ? 'bg-panel-darkRed' : status == 'DELIVERED' ? 'bg-panel-darkGreen' : 'bg-panel-darkBlue'}  text-white rounded-lg flex justify-between  p-2.5 text-center items-center whitespace-nowrap text-[12px] w-full`}
                        name='update active status box'
                    > {status == 'CANCELED' ? 'لغو شده' : status == 'DELIVERED' ? 'ارسال شده' : 'درحال ارسال'}
                        <MdKeyboardArrowDown className={`size-5 ${activeStatusBox == (_id as any) && 'rotate-180'} transition-all`} />
                    </button>

                </div>

                <div className={`${activeStatusBox == (_id as any) ? 'visible opacity-100 -right-32' : 'invisible opacity-0 -right-0'} z-[999] absolute transition-all top-4 rounded-lg font-peyda bg-black`}>
                    <div className="flex-center m-auto ch:cursor-pointer p-3 rounded-md text-panel-darkTitle shadow-md border-2 border-black/70 bg-panel-white ch:p-2 flex-col gap-2 text-sm">
                        {
                            ['DELIVERED', 'CANCELED', 'PROCESSING']
                                .filter(st => st !== status)
                                .map(statusValue =>
                                    <div key={statusValue} onClick={() => status !== statusValue && changeTransactionStatus(statusValue as typeof status)}>{
                                        statusValue == 'PROCESSING'
                                            ? 'درحال ارسال'
                                            :
                                            statusValue == 'CANCELED' ? 'لغو شده'
                                                : 'ارسال شده'
                                    }</div>
                                )
                        }
                    </div>
                </div>

            </td>
        </tr>
    )
}

export default TransactionData