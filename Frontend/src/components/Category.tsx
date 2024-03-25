import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

export default function Category() {

    const [isCategoryShown, setIsCategoryShown] = useState(false)

    return (
        <li className="flex-center relative flex-col gap-2">

            <div
                onMouseLeave={() => setIsCategoryShown(false)}
                onMouseOver={() => setIsCategoryShown(true)}
                className={`flex-center ${isCategoryShown && "text-dark-red"} transition-all delay-75 duration-200 gap-1`}>
                کامپیوتر
                <FaAngleDown className={` ${isCategoryShown && "rotate-180 text-dark-red "} size-4 duration-200 transition-all delay-75`} />
            </div>

            <div
                onMouseLeave={() => setIsCategoryShown(false)}
                onMouseOver={() => setIsCategoryShown(true)}
                className={`absolute ${!isCategoryShown ? "invisible opacity-0" : "visible opacity-100"} duration-200 transition-all delay-75 cursor-pointe pt-12`}>
                <ul className="border-t-4 border-b-4 border-dark-red bg-primary-black space-y-4 p-4 w-full fixed left-[50%] -translate-x-[50%] container rounded-xl overflow-hidden">
                    <li>لپتاپ ۱</li>
                    <li>لپتاپ ۱</li>
                    <li>لپتاپ ۱</li>
                    <li>لپتاپ ۱</li>
                    <li>لپتاپ ۱</li>
                    <li>لپتاپ ۱</li>
                </ul>
            </div>
        </li>
    )
}
