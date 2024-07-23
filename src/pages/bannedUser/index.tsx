import { useAppDispatch } from '@/Hooks/useRedux'
import { userDataUpdater } from '@/Redux/Features/userSlice'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const BannedUser = () => {

    const [time, setTime] = useState(7)
    const dispatch = useAppDispatch()
    const navigate = useRouter()

    const logout = async () => {

        await fetch('/api/auth/logout')
        dispatch(userDataUpdater({ isLogin: false }))
        document.cookie = ''
        navigate.replace('/')

    }

    useEffect(() => {
        let interval = setInterval(() => setTime(prev => prev >= 0 ? prev - 1 : 0), 1000)
        return () => clearTimeout(interval)
    }, [])

    useEffect(() => { time === 0 && logout() }, [time])

    return (
        <div className='flex-center primary-bg overflow-x-hidden gap-5 font-sans text-white text-[40px] flex-col bg-secondary-black text-center h-screen w-full'>
            <div>You are banned and can not access this site any more</div>
            <p dir='ltr'>You will be logged out in {time} seconds hah.</p>
        </div>
    )
}

export default BannedUser