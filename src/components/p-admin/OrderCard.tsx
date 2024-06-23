import Image from 'next/image'
import React from 'react'
import { IoIosArrowRoundUp } from 'react-icons/io'

interface Props {
    value: string
    title: string
    bottomTitle: string
    condition: 'up' | 'down'
    src: string
}

const OrderCard = ({ value, title, bottomTitle, condition, src }: Props) => {

    return (
        <div className='flex-center gap-4 bg-white py-7 rounded-xl'>

            <div>
                <h3 className='font-extrabold text-panel-darkTitle text-[30px] font-peyda text-end'>{value}</h3>

                <div className='space-y-1 text-end'>

                    <p className='text-[12px] text-panel-darkTitle'>{title}</p>

                    <div className='flex items-center justify-end gap-2 text-[12px] text-panel-darkTitle'>
                        <p dir='ltr' className='text-[12px] text-[#A3A3A3]'>{bottomTitle}</p>
                        <div className={`size-5 ch:size-[90%] ${condition == 'up' ? 'ch:text-panel-darkGreen bg-panel-lightGreen' : 'ch:text-panel-darkRed bg-panel-lightRed'}  rounded-full flex-center`}><IoIosArrowRoundUp className={`${condition == 'up' ? '' : 'rotate-180'}`} /></div>
                    </div>
                </div>
            </div>

            <div className='size-[85px] flex-center bg-panel-lightGreen rounded-full'>
                <Image
                    src={src}
                    alt='totalCancel'
                    width={50}
                    height={50}
                    quality={100}
                    className='size-[50%] object-cover overflow-visible'
                />
            </div>
        </div>
    )
}

export default OrderCard