import React, { useEffect, useState } from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { MdDeleteOutline } from "react-icons/md";
import Button from '../Button'

const Notifications = () => {

    const [showNotifications, setShowNotifications] = useState(false)

    return (
        <div
            onClick={() => setShowNotifications(prev => !prev)}
            className={`flex-center size-12 bg-panel-lightBlue rounded-xl ${showNotifications ? "cursor-default" : "cursor-pointer"} relative`}
        >

            <IoMdNotificationsOutline className='text-panel-darkBlue size-[60%]' />
            <span className='size-[28px] absolute text-[12px] rounded-full flex-center text-center bg-panel-darkBlue border-[4px] border-panel-white text-white -top-[9px] -right-[9px]'>4</span>

            <span className={`absolute w-[400px] transition-all duration-400 bg-white border-2 border-panel-darkBlue rounded-xl ${!showNotifications ? "left-0 top-0 opacity-0 z-0 cursor-pointer invisible" : "left-12 top-12 opacity-100 z-50 cursor-default visible"}  shadow-sm ch:w-full overflow-hidden`}>
                <div onClick={() => setShowNotifications(false)}>

                    <div className='flex flex-col ch:px-3 ch:py-1 max-h-[384px] overflow-auto'>

                        <NotificationData />
                        <NotificationData />
                        <NotificationData />
                        <NotificationData />
                        <NotificationData />
                        <NotificationData />
                        <NotificationData />
                        <NotificationData />
                        <NotificationData />

                    </div>
                    <div className='flex gap-2 ch:w-full ch:flex-1 p-1'>
                        <Button filled text='خواندن همه' bgColor='bg-panel-darkBlue' />
                        <Button filled text='حذف همه' bgColor='bg-panel-darkRed' />
                    </div>
                </div>
            </span>
            <span onClick={() => setShowNotifications(true)} className={` ${showNotifications ? 'fixed' : 'hidden'} inset-0 size-full z-40`}></span>
        </div>
    )
}

const NotificationData = () => {

    return (
        <div className={`flex transition-all flex-col gap-1 ch:last:border-none relative ch:pt-1`}>
            {/* decease opacity if seen */}

            <div className='flex items-center justify-between'>
                <div className='flex items-center font-peyda text-black'>

                    <p>عرفان افتخاری</p>

                    <div className='w-2 h-px rounded-full px-3 bg-panel-caption rotate-90'></div>

                    <div className='flex items-center gap-2'>
                        <p>۱۴۰۳/۱۲/۳</p>
                        <div className='size-2 rounded-full bg-panel-darkGreen mb-4 animate-pulse'></div>
                    </div>

                </div>
                <MdDeleteOutline className='text-panel-darkRed transition-all hover:scale-125 size-6 cursor-pointer' />
            </div>

            <p className='text-[13px] border-b border-panel-caption pb-3 text-panel-darkTitle'>سلام مشکل از بکه خخ</p>
        </div>
    )
}

export default Notifications;