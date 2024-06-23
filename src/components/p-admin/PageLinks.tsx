import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactNode, memo, useEffect, useState } from 'react'

interface Props {
    path: string
    Icon: ReactNode
    title: string
    IconSize?: string
}

const PageLinks = ({ path, Icon, title }: Props) => {

    const route = useRouter()
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        if (route.asPath === path) return setIsActive(true) // for admin root page
        setIsActive(route.asPath.includes(path.split('/')[2]))
    }, [route.asPath])

    return (
        <Link
            href={path}
            className={`flex gap-2 items-center relative justify-center xl:justify-start p-3 transition-all rounded-md ${isActive && 'bg-panel-lightGreen text-panel-darkGreen'}  ch:font-extrabold font-peyda`}
        >
            <div className={`size-6 flex-center ch:size-full`}>{Icon}</div>
            <span className='mt-1 hidden xl:block whitespace-nowrap'>{title}</span>
            {isActive ? <span data-aos='fade-in' className='absolute -right-5 h-5/6 w-[6px] rounded-l-md bg-panel-darkGreen'></span> : ""}

        </Link>
    )
}

export default memo(PageLinks);