import Image from 'next/image';
import React from 'react'
import { FaStar } from "react-icons/fa";

const CustomerReview = () => {
    return (
        <div className='flex items-center max-w-[525px] m-auto w-full relative shadow-sm'>
            <div className='p-6 flex items-center gap-8 bg-white rounded-xl shadow-sm w-[458px] relative overflow-visible'>
                <div className='flex flex-col gap-5 flex-[2]'>
                    <div className='flex items-center gap-2'>
                        <div className='size-[54px] flex-center rounded-full'><img className='size-full rounded-full object-cover' src={'https://t3.ftcdn.net/jpg/01/73/77/00/360_F_173770068_LRQyNUZQn9WtQyJoJsOEwK8qwBzypBm0.jpg'} /></div>
                        <div className='flex font-peyda items-start flex-col gap-1'>
                            <p className='text-panel-darkTitle font-bold'>غلام محمدی</p>
                            <p className='text-[12px] text-panel-caption font-sans'>۲ روز پیش</p>
                        </div>
                    </div>
                    <p className='font-sans text-[13px] text-panel-darkTitle'>در سایت پی سی کالا، تنوع بی نظیر در انواع مدلها و سری های بازار با انواع کانفیگ های مورد نیاز کاربران که در هیچ وب سایت دیگری یافت نخواهید کرد. هر نیازی که در خصوص خرید لپ تاپ دارید </p>
                    <div className='flex items-center gap-2'>
                        <FaStar className='text-gold' />
                        <FaStar className='text-gold' />
                        <FaStar className='text-gold' />
                        <FaStar className='text-gold' />
                        <FaStar className='text-panel-caption' />
                        <p className='font-peyda text-panel-darkTitle pt-1'>4</p>
                    </div>
                </div>
                <div className='flex-1'></div>
            </div>
            <div className='overflow-hidden absolute border border-panel-lightBlue xl:-left-6 -left-2 xl:size-[233px] size-[200px] rounded-full bg-panel-caption shadow-sm z-20 ch:size-full'><Image className=' object-cover p-2' src={'https://pc-kala.storage.iran.liara.space/Acer%20Nitro%205%203060%20Gaming%20Laptop%2C%2015.6%20FHD%20IPS%20144Hz%2C%20GeForce%20RTX%203060.webp'} width={300} height={300} quality={100} alt='photo' /></div>
        </div>

    )
}

export default CustomerReview