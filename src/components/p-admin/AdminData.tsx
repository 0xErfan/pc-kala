import { userDataTypes } from '@/global.t'
import { showToast } from '@/utils'
import { RiAdminFill } from "react-icons/ri";
import React, { useState } from 'react'
import Image from 'next/image';

const AdminData = ({ nameLastName, _id, email, creator, username, profile }: userDataTypes & { creator: string }) => {

    const [isSending, setIsSending] = useState(false)
    const [message, setMessage] = useState('')

    const sendMessage = async () => {

        if (!message?.trim().length) return showToast(false, 'پیام رو وارد کن خب')

        try {
            const res = await fetch('/api/dashboardNotifications/create', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, creator, target: _id })
            })
            const data = await res.json()

            showToast(res.ok, data.message)

            if (res.ok) {
                setMessage('')
                setIsSending(false)
            }

        } catch (error) { console.log(error) }
    }

    return (
        <div onKeyDown={e => e.key == 'Enter' && sendMessage()} data-aos='fade-in' className='flex items-center ch:h-full font-peyda gap-2 bg-white p-3 rounded-xl overflow-hidden shadow-sm'>

            {
                isSending
                    ?
                    <textarea
                        data-aos='zoom-out'
                        className='min-h-[72px] bg-panel-white rounded-xl px-4 py-2 w-full text-xl'
                        onChange={e => setMessage(e.target.value)}
                        placeholder='پیام را وارد کنید:'>
                    </textarea>
                    :
                    <div className='flex items-center gap-3 overflow-hidden'>

                        <div className='rounded-full size-14 flex-center'>
                            {
                                profile
                                    ?
                                    <Image
                                        className='size-full object-cover rounded-full shrink-0'
                                        src={profile}
                                        alt='Admin profile'
                                        width={200}
                                        height={200}
                                    />
                                    :
                                    <RiAdminFill className='size-10 flex text-black' />
                            }
                        </div>

                        <div className='flex flex-col gap-1'>
                            <div className='font-bold text-[19px]'>{nameLastName || username}</div>
                            <div className='text-panel-darkTitle overflow-ellipsis'>{email}</div>
                        </div>
                    </div>
            }

            {
                isSending
                    ?
                    <div className='flex gap-1 flex-col max-h-20 h-full mb-auto'>

                        <button
                            data-aos='fade-right'
                            name='confirm message'
                            onClick={sendMessage}
                            className={`mr-auto max-w-28 w-full h-full bg-panel-darkGreen transition-all px-4 rounded-md text-white`}>
                            ارسال
                        </button>
                        <button
                            data-aos='fade-left'
                            name='cancel message'
                            onClick={() => setIsSending(false)}
                            className={`mr-auto max-w-28 w-full h-full bg-panel-darkRed transition-all px-4 rounded-md text-white`}>
                            لغو
                        </button>

                    </div>
                    :
                    <button
                        onClick={() => setIsSending(true)}
                        name='open message'
                        className={`mr-auto max-w-28 whitespace-nowrap w-full h-full bg-panel-darkGreen transition-all px-1 sm:px-4 rounded-[10px] text-white`}>
                        ارسال پیام
                    </button>
            }
        </div>
    )
}

export default AdminData