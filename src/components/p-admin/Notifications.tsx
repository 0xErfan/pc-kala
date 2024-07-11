import React, { useState } from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'
import Button from '../Button'
import { dashboardNotification } from '@/global.t';
import { modalDataUpdater, userUpdater } from '@/Redux/Features/globalVarsSlice';
import { useAppDispatch, useAppSelector } from '@/Hooks/useRedux';
import { showToast } from '@/utils';
import { ModalProps } from '../Modal';
import DashboardNotification from './DashboardNotification';


const Notifications = ({ notifications }: { notifications: dashboardNotification[] }) => {

    const [showNotifications, setShowNotifications] = useState(false)
    const dispatch = useAppDispatch()
    const notSeenNotifications = [...notifications].filter(data => !data.isSeen)
    const userData = useAppSelector(state => state.userSlice.data)

    const seenAllNotifications = async () => {

        try {
            const res = await fetch('/api/dashboardNotifications/seenAll', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ target: userData?._id })
            })

            if (res.ok) return dispatch(userUpdater())
            throw new Error()

        } catch (error) { showToast(false, 'خطای اینترنت') }

    }

    const deleteAllNotifications = () => {

        dispatch(modalDataUpdater({
            isShown: true,
            message: 'آیا از حذف همه پیام ها اطمینان دارید؟',
            status: false,
            title: 'حذف پیام ها',

            fn: async () => {
                try {
                    const res = await fetch('/api/dashboardNotifications/deleteAll', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ target: userData?._id })
                    })

                    if (res.ok) dispatch(userUpdater())

                } catch (error) { console.log(error) }
            }

        } as ModalProps))

    }

    return (

        <div
            onClick={() => setShowNotifications(prev => !prev)}
            className={`flex-center size-12 bg-panel-lightBlue rounded-xl ${showNotifications ? "cursor-default" : "cursor-pointer"} relative`}
        >

            <IoMdNotificationsOutline className='text-panel-darkBlue size-[60%]' />

            {
                notSeenNotifications?.length
                    ?
                    <span className='size-[28px] absolute text-[12px] rounded-full flex-center text-center bg-panel-darkBlue border-[4px] border-panel-white text-white -top-[9px] -right-[9px]'>
                        {notSeenNotifications.length}
                    </span>
                    : null
            }

            <span className={`sm:absolute fixed w-[400px] transition-all duration-400 bg-white border-2 border-panel-darkBlue rounded-xl ${!showNotifications ? "left-0 top-0 opacity-0 z-0 cursor-pointer invisible" : "left-12 top-12 opacity-100 z-50 cursor-default visible"}  shadow-sm ch:w-full overflow-hidden`}>

                <div onClick={() => setShowNotifications(false)}>

                    <div className='flex flex-col ch:px-3 ch:py-1 max-h-[384px] overflow-auto'>

                        {
                            notifications?.length
                                ? notifications.map(data => <DashboardNotification key={data._id} {...data} />)
                                : null
                        }

                    </div>

                    {
                        notifications?.length
                            ?
                            <div className='flex gap-2 ch:w-full ch:flex-1 p-1'>
                                <Button filled text='خواندن همه' bgColor='bg-panel-darkBlue' fn={seenAllNotifications} />
                                <Button filled text='حذف همه' bgColor='bg-panel-darkRed' fn={deleteAllNotifications} />
                            </div>
                            :
                            <div className='w-full flex-center font-peyda bg-panel-lightBlue text-xl p-3 font-bold text-panel-darkBlue text-center'>پیامی وجود ندارد</div>
                    }

                </div>
            </span>
            <span onClick={() => setShowNotifications(true)} className={` ${showNotifications ? 'fixed' : 'hidden'} inset-0 size-full z-40`}></span>
        </div>
    )
}

export default Notifications;