import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

export default function Category() {

    const [isCategoryShown, setIsCategoryShown] = useState(false)

    return (
        <li className="flex-center relative flex-col gap-2 cursor-pointer">

            <div
                onMouseLeave={() => setIsCategoryShown(false)}
                onMouseOver={() => setIsCategoryShown(true)}
                className={`flex-center ${isCategoryShown && "text-dark-red"} transition-all delay-[40] duration-200 gap-1`}>
                کامپیوتر
                <FaAngleDown className={` ${isCategoryShown && "rotate-180 text-dark-red "} size-4 duration-200 transition-all delay-[40]`} />
            </div>

            <div
                onMouseLeave={() => setIsCategoryShown(false)}
                onMouseOver={() => setIsCategoryShown(true)}
                className={`absolute ${!isCategoryShown ? "invisible opacity-0" : "visible opacity-100"} left-[60px] duration-200 transition-all delay-[40] cursor-pointe pt-12`}>
                <ul className="border-t-2 border-b-2 border-dark-red bg-primary-black space-y-4 p-4 fixed w-full max-w-[150px] rounded-xl overflow-hidden ch:relative ">
                    <li className="submenu" >لپتاپ ۱</li>
                    <li className="submenu" >لپتاپ ۱</li>
                    <li className="submenu" >لپتاپ ۱</li>
                    <li className="submenu" >لپتاپ ۱</li>
                    <li className="submenu" >لپتاپ ۱</li>
                    <li className="submenu" >لپتاپ ۱</li>
                </ul>
            </div>
        </li>
    )
}
