import { useAppDispatch } from '@/Hooks/useRedux'
import { modalDataUpdater } from '@/Redux/Features/globalVarsSlice'
import { showToast } from '@/utils'
import { MdKeyboardArrowDown } from "react-icons/md";
import React, { useState } from 'react'
import { ModalProps } from '../Modal'
import { TransactionProps } from '@/global.t'

interface Props {
    rowNumber: number
    transactionsUpdater: () => void
}

const TransactionData = ({ _id, createdAt, customerData, totalPrice, status, rowNumber, transactionsUpdater }: TransactionProps & Props) => {

    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [isDropDownShown, setIsDropDownShown] = useState(false)

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
                    if (res.ok) { transactionsUpdater(); setIsDropDownShown(false) }

                } catch (error) { console.log(error) }
                finally { setIsLoading(false) }
            }
        } as ModalProps))
    }

    return (

        <tr data-aos='zoom-in' className='ch:border-2 ch:border-white ch:ch:text-[11px] ch:md:text-[15px] ch:py-2'>

            <td>{rowNumber + 1}</td>

            <td>{customerData.name + customerData.lName}</td>

            <td>{customerData.email || 'وارد نشده'}</td>

            <td>{new Date(createdAt).toLocaleDateString('fa')}</td>

            <td dir='ltr'>{totalPrice.toLocaleString('fa') + 'T'}</td>

            <td className='w-20 bg-white relative'>

                <div className={`flex-center w-full px-2 `}>

                    <button
                        onClick={() => setIsDropDownShown(prev => !prev)}
                        className={`${status == 'CANCELED' ? 'bg-panel-darkRed' : status == 'DELIVERED' ? 'bg-panel-darkGreen' : 'bg-panel-darkBlue'}  text-white rounded-lg flex justify-between  p-2.5 text-center items-center whitespace-nowrap text-[12px] w-full`}
                    > {status == 'CANCELED' ? 'لغو شده' : status == 'DELIVERED' ? 'ارسال شده' : 'درحال ارسال'}
                        <MdKeyboardArrowDown className={`size-5 ${isDropDownShown && 'rotate-180'} transition-all`} />
                    </button>

                </div>

                <div className={`${isDropDownShown ? 'visible opacity-100' : 'invisible opacity-0'} absolute transition-all -right-32 top-2 rounded-lg font-peyda bg-black`}>
                    <div className="flex ch:cursor-pointer items-center p-3 rounded-md text-white bg-black ch:p-2 flex-col gap-2 text-sm dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        {
                            ['DELIVERED', 'CANCELED', 'PROCESSING']
                                .filter(st => st !== status)
                                .map(statusValue =>
                                    <div onClick={() => status !== statusValue && changeTransactionStatus(statusValue as typeof status)}>{
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