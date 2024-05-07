import { IoSearch } from "react-icons/io5";
import { CiShoppingBasket } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { MdPhoneInTalk } from "react-icons/md";
import Category from "./Category";
import SideMenu from "./SideMenu";
import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAppSelector } from "@/Hooks/useRedux";


import { FaComputer } from "react-icons/fa6";
import { IoIosLaptop } from "react-icons/io";
import { HiOutlineCpuChip } from "react-icons/hi2";
import { PiHeadphones } from "react-icons/pi";
import { GiConsoleController } from "react-icons/gi";

export default function Header() {

    const [sideMenuDataToShow, setSideMenuDataToShow] = useState<"basket" | "sideMenu">("sideMenu")
    const navigate = useRouter()
    const textInputElem = useRef<HTMLInputElement | null>(null)
    const isLogin = useAppSelector(state => state.userSlice.isLogin)

    const globalSearch = () => {
        const searchValue = textInputElem.current?.value.trim()
        searchValue?.length && navigate.push(`/search/${searchValue}`)
    }

    return (
        <section className="z-50 fixed left-0 w-full">

            {/* for large screens */}
            <div className="hidden md:block bg-secondary-black py-4">

                <div className="container flex items-center m-auto justify-between w-full">
                    <Link href="/" className="max-w-[200px] relative">
                        <Image
                            alt="pc-kala-shop"
                            src='/images/home/title.webp'
                            width={300}
                            height={100}
                            className="object-cover"
                            quality={85}
                        />
                    </Link>

                    <SideMenu
                        changeTypeFn={() => {
                            setSideMenuDataToShow("sideMenu")
                            return true
                        }}
                        dataToShow={sideMenuDataToShow} />

                    <div className="flex-center text-white gap-2 ch:ml-auto bg-primary-black p-2 rounded-md  w-2/5 ">
                        <IoSearch className={"cursor-pointer size-6"} onClick={globalSearch} />
                        <input onKeyDown={e => e.key == "Enter" && globalSearch()}
                            ref={textInputElem}
                            className=" bg-transparent w-full text-sm " type="text"
                            placeholder="محصول خود را بیابید..." />
                    </div>


                    <div className="flex-center gap-12 text-description-text ">
                        <div className="lg:flex items-center justify-center gap-1 hidden">
                            <div className="text-left">
                                <div>۰۲۱۹۸۷۶۵</div>
                                <div className="text-blue-dark">۰۳۱۴۴۵۵۶۶۷۷</div>
                            </div>
                            <MdPhoneInTalk className="size-7 text-blue-dark" />
                        </div>

                        <div className="flex-center gap-2 ch:ch:rounded-md ch:ch:bg-[#393A3D] ch:ch:size-9 ch:ch:p-2">
                            <Link href={` ${isLogin ? '/profile' : '/login'} `}><FaRegUser /></Link>
                            <div className="cursor-pointer" onClick={() => setSideMenuDataToShow("basket")}>
                                <div className="flex-center relative">
                                    <span
                                        className="absolute -top-[10px] -left-[10px] p-1 rounded-full size-6 flex-center text-[11px] bg-primary-black">12</span>
                                    <CiShoppingBasket className="size-[35px] text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container text-white">
                    <ul className="flex items-center lg:gap-[36px] gap-8 mt-5 text-[14px] ">
                        <Category key={'کامپیوتر'} title="کامپیوتر" screen="large" Icon={<FaComputer className="size-5" />} />
                        <Category key={'لپتاپ'} title="لپتاپ" screen="large" Icon={<IoIosLaptop className="size-6" />} />
                        <Category key={'قطعات'} title="قطعات کامپیوتر" screen="large" Icon={<HiOutlineCpuChip className="size-6" />} />
                        <Category key={'لوازم'} title="لوازم جانبی" screen="large" Icon={<PiHeadphones className="size-6" />} />
                        <Category key={'کنسول'} title="کنسول بازی" screen="large" Icon={<GiConsoleController className="size-6" />} />
                    </ul>
                </div>
            </div>

            {/* for smaller screens */}
            <div className="md:hidden block bg-secondary-black sticky top-0 py-4">

                <div className="container flex items-center justify-between gap-4 w-full">

                    <SideMenu changeTypeFn={() => { setSideMenuDataToShow("sideMenu"); return true }} dataToShow={sideMenuDataToShow} />

                    <Link href="/" className="max-w-[200px]">
                        <Image
                            alt="pc-kala-shop"
                            src='/images/home/title.webp'
                            width={150}
                            height={50}
                            className="object-cover"
                            quality={85}
                            blurDataURL="true"
                        />
                    </Link>

                    <div className="flex-center gap-12 text-description-text ">

                        <div
                            className="flex-center gap-2 ch:ch:rounded-md ch:ch:bg-[#393A3D] sm:ch:ch:size-9 ch:ch:size-8 ch:ch:p-2">
                            <Link href={` ${isLogin ? '/profile' : '/login'} `}><FaRegUser /></Link>
                            <div onClick={() => setSideMenuDataToShow("basket")}>
                                <div className="flex-center relative">
                                    <span
                                        className="absolute -top-[10px] -left-[10px] p-1 rounded-full size-6 flex-center text-[11px] bg-primary-black">12</span>
                                    <CiShoppingBasket className="size-[35px] text-white" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </section>
    )
}