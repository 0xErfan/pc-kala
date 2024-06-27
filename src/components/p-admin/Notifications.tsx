import React, { useState } from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'
import Button from '../Button'

const Notifications = () => {

    const [showNotifications, setShowNotifications] = useState(false)


    return (
        <div onClick={() => setShowNotifications(prev => !prev)} className={`flex-center size-12 bg-panel-lightBlue rounded-xl ${showNotifications ? "cursor-default" : "cursor-pointer"} relative`}>
            <IoMdNotificationsOutline className='text-panel-darkBlue size-[60%]' />
            <span className='size-[28px] absolute text-[12px] rounded-full flex-center text-center bg-panel-darkBlue border-[4px] border-panel-white text-white -top-[9px] -right-[9px]'>4</span>

            <span className={`absolute w-[400px] transition-all bg-white border-2 border-panel-darkBlue rounded-xl ${!showNotifications ? "left-0 top-0 opacity-0 z-0 cursor-pointer invisible" : "left-12 top-12 opacity-100 z-50 cursor-default visible"}  shadow-sm ch:w-full`}>
                <div onClick={() => setShowNotifications(false)}>

                    <div className='flex flex-col ch:px-3 ch:py-1 mt-2 max-h-[384px] overflow-auto'>

                        <div className='flex flex-col gap-1 ch:last:border-none'>
                            <div className='flex items-center justify-between font-peyda text-black'>
                                <p>عرفان افتخاری</p>
                                <p>۱۴۰۳/۱۲/۳</p>
                            </div>
                            <p className='text-[13px] border-b border-panel-caption pb-3 text-panel-darkTitle'>سلام مشکل از بکه خخ</p>
                        </div>

                        <div className='flex flex-col gap-1 ch:last:border-none'>
                            <div className='flex items-center justify-between font-peyda text-black'>
                                <p>عرفان افتخاری</p>
                                <p>۱۴۰۳/۱۲/۳</p>
                            </div>
                            <p className='text-[13px] border-b border-panel-caption pb-3 text-panel-darkTitle'>سلام مشکل از بکه خخ</p>
                        </div>
                        <div className='flex flex-col gap-1 ch:last:border-none'>
                            <div className='flex items-center justify-between font-peyda text-black'>
                                <p>عرفان افتخاری</p>
                                <p>۱۴۰۳/۱۲/۳</p>
                            </div>
                            <p className='text-[13px] border-b border-panel-caption pb-3 text-panel-darkTitle'>سلام مشکل از بکه خخ</p>
                        </div>

                        <div className='flex flex-col gap-1 ch:last:border-none'>
                            <div className='flex items-center justify-between font-peyda text-black'>
                                <p>عرفان افتخاری</p>
                                <p>۱۴۰۳/۱۲/۳</p>
                            </div>
                            <p className='text-[13px] border-b border-panel-caption pb-3 text-panel-darkTitle'>سلام مشکل از بکه خخ</p>
                        </div>
                        <div className='flex flex-col gap-1 ch:last:border-none'>
                            <div className='flex items-center justify-between font-peyda text-black'>
                                <p>عرفان افتخاری</p>
                                <p>۱۴۰۳/۱۲/۳</p>
                            </div>
                            <p className='text-[13px] border-b border-panel-caption pb-3 text-panel-darkTitle'>سلام مشکل از بکه خخ</p>
                        </div>

                        <div className='flex flex-col gap-1 ch:last:border-none'>
                            <div className='flex items-center justify-between font-peyda text-black'>
                                <p>عرفان افتخاری</p>
                                <p>۱۴۰۳/۱۲/۳</p>
                            </div>
                            <p className='text-[13px] border-b border-panel-caption pb-3 text-panel-darkTitle'>سلام مشکل از بکه خخ</p>
                        </div>
                        <div className='flex flex-col gap-1 ch:last:border-none'>
                            <div className='flex items-center justify-between font-peyda text-black'>
                                <p>عرفان افتخاری</p>
                                <p>۱۴۰۳/۱۲/۳</p>
                            </div>
                            <p className='text-[13px] border-b border-panel-caption pb-3 text-panel-darkTitle'>سلام مشکل از بکه خخ</p>
                        </div>

                        <div className='flex flex-col gap-1 ch:last:border-none'>
                            <div className='flex items-center justify-between font-peyda text-black'>
                                <p>عرفان افتخاری</p>
                                <p>۱۴۰۳/۱۲/۳</p>
                            </div>
                            <p className='text-[13px] border-b border-panel-caption pb-3 text-panel-darkTitle'>سلام مشکل از بکه خخ</p>
                        </div>

                    </div>
                    <div className='flex gap-2 ch:w-full ch:flex-1 p-1'><Button filled text='خواندن همه' bgColor='bg-panel-darkBlue' /></div>
                </div>
            </span>
            <span onClick={() => setShowNotifications(true)} className={` ${showNotifications ? 'fixed' : 'hidden'} inset-0 size-full z-40`}></span>
        </div>
    )
}

export default Notifications