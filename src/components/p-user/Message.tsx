import React from 'react'
import Button from '../Button'
import { IoTrashOutline } from 'react-icons/io5'
import { useAppDispatch } from '@/Hooks/useRedux'
import { showToast } from '@/utils'
import { userUpdater } from '@/Redux/Features/globalVarsSlice'

interface MessageProps {
    body: string
    _id: string
    createdAt: string
}

const Message = ({ _id, body, createdAt }: MessageProps) => {

    const dispatch = useAppDispatch()

    const deleteNotificationHandler = async (id: string) => {

        const res = await fetch('/api/notifications/delete', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id)
        })

        if (!res.ok) { showToast(false, 'خطا در اتصال به اینترنت'); return }

        showToast(true, 'پیام با موفقیت حذف شد')
        dispatch(userUpdater())
    }

    return (
        <div
            data-aos-duration="550"
            data-aos="fade-right"
            className="rounded-md p-2 w-full text-[14px] border border-gray-600/15 flex items-center justify-between bg-secondary-black bg-black/15"
        >
            <div className="p-1 space-y-2 flex items-center justify-end flex-col">
                <p dir="ltr" className="text-white/45 flex justify-end w-full">{new Date(createdAt).toLocaleDateString('fa-IR') + ' - ' + new Date(createdAt).toLocaleTimeString('fa-IR')}</p>
                <p>{body}</p>
            </div>
            <Button Icon={<IoTrashOutline />} fn={() => deleteNotificationHandler(_id)} />
        </div>
    )
}

export default Message