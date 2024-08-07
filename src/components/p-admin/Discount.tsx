import { useAppDispatch } from '@/Hooks/useRedux'
import { modalDataUpdater } from '@/Redux/Features/globalVarsSlice'
import { DiscountDataTypes } from '@/global.t'
import { showToast } from '@/utils'
import React, { useState } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { ModalProps } from '../Modal'

interface Props {
    rowNumber: number
    discountsUpdater: () => void
} 

const Discount = ({ code, maxUse, value, expireAfter, rowNumber, discountsUpdater }: DiscountDataTypes & Props) => {

    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const deleteDiscount = async () => {

        if (isLoading) return

        dispatch(modalDataUpdater({
            isShown: true,
            message: 'آیا از حذف کد تخفیف اطمینان دارید؟',
            title: 'حذف',
            status: false,
            fn: async () => {
                try {
                    setIsLoading(true)

                    const res = await fetch('/api/discount/delete', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ code })
                    })

                    const data = await res.json()
                    
                    showToast(res.ok, data.message)
                    if (res.ok) discountsUpdater()

                } catch (error) { console.log(error) }
                finally { setIsLoading(false) }
            }
        } as ModalProps))
    }

    return (
        <tr data-aos='zoom-in' className='ch:border-2 ch:border-white ch:ch:text-[11px] ch:md:text-[15px] ch:py-2'>

            <td>{rowNumber + 1}</td>

            <td>{code}</td>

            <td>{value.toLocaleString('fa-IR')}</td>

            <td>{expireAfter}</td>

            <td>{expireAfter - maxUse}</td>

            {/* <td onClick={deleteDiscount} className='flex-center w-12 text-panel-darkRed cursor-pointer ch:size-5 md:ch:size-6'><div><MdDeleteOutline /></div></td> */}
            <td onClick={deleteDiscount} className='w-14 cursor-pointer'><div className='flex-center border-none md:border text-panel-darkRed ch:size-6 md:ch:size-7'><MdDeleteOutline /></div></td>
        </tr>
    )
}

export default Discount