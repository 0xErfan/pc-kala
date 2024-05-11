import { categories } from "@/global.t";
import { engCategoryToPersian } from "@/utils";
import Link from "next/link";
import { ReactNode, memo, useState } from "react";
import { FaAngleDown } from "react-icons/fa";

interface CategoryProps {
    screen: string
    title: string
    Icon: ReactNode
    submenus: { title: string, path: string }[]
}

export default memo(function Category({ screen, title, Icon, submenus }: CategoryProps) {

    const [isCategoryShown, setIsCategoryShown] = useState(false)

    return (
        <>
            {
                screen == "large"
                    ?
                    <li className="flex-center relative cursor-pointer flex-col gap-2">

                        <Link href={`/products/category/${engCategoryToPersian(title as categories)}`} onMouseLeave={() => setIsCategoryShown(false)} onMouseOver={() => setIsCategoryShown(true)} className={`flex-center ${isCategoryShown && "text-dark-red"} transition-all delay-[40] duration-200 gap-1`}>
                            <div className="flex font-peyda text-[14px] items-center gap-2">{Icon}{title}</div>
                            <FaAngleDown className={` ${isCategoryShown && "rotate-180"} size-4 duration-200 transition-all delay-[40]`} />
                        </Link>

                        <div
                            onMouseLeave={() => setIsCategoryShown(false)}
                            onMouseOver={() => setIsCategoryShown(true)}
                            className={`absolute ${!isCategoryShown ? "invisible opacity-0" : "visible opacity-100"} right-0 duration-200 transition-all delay-[40] pt-12`}
                        >

                            <ul className="border-t-2 border-b-2 border-dark-red ch:py-2 bg-primary-black p-4 fixed w-full max-w-[180px] ch:cursor-pointer rounded-xl overflow-hidden ch:relative ">
                                {submenus.map(menu => <li key={menu.title} className="submenu"><Link href={menu.path} > {menu.title} </Link></li>)}
                            </ul>

                        </div>
                    </li>
                    :
                    <li className="flex flex-col gap-2 cursor-pointer w-full">

                        <div
                            onClick={() => setIsCategoryShown(preve => !preve)}
                            className={`flex items-center justify-between ${isCategoryShown && "text-dark-red"} text-[15px] fontb transition-all delay-[40] duration-200 gap-1`}>
                            <div className="flex items-center gap-2 font-peyda text-[14px]" >{Icon}{title}</div>
                            <FaAngleDown className={` ${isCategoryShown && "rotate-180 "} size-4 duration-200 transition-all delay-[40]`} />
                        </div>

                        <div
                            onClick={() => setIsCategoryShown(preve => !preve)}
                            className={`${!isCategoryShown ? "invisible h-0" : "visible h-full"} delay-[40] duration-200 transition-all cursor-pointe`}>
                            <ul className="ch:py-2 bg-secondary-black p-3 text-[13px] rounded-md w-full">
                                {submenus.map(menu => <li key={menu.title} className="submenu relative"><Link href={menu.path} > {menu.title} </Link></li>)}
                            </ul>
                        </div>
                    </li>
            }
        </>
    )
})
