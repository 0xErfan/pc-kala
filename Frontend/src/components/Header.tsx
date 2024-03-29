import { IoSearch } from "react-icons/io5";
import { CiShoppingBasket } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { MdPhoneInTalk } from "react-icons/md";
import Category from "./Category";
import { Link } from "react-router-dom";
import SideMenu from "./SideMenu";

export default function Header() {

    return (
        <section className="z-40 fixed left-0 w-full">

            {/* for large screens */}
            <div className="hidden md:block bg-secondary-black py-4">

                <div className="container flex items-center m-auto justify-between w-full" >
                    <Link to="/" className="max-w-[200px]" ><img className=" object-cover w-full h-full " src="/images/home/title.webp" alt="pc-kala-shop" /></Link>

                    <div className="flex-center text-white gap-2 ch:ml-auto bg-primary-black p-2 rounded-md  w-2/5 ">
                        <IoSearch />
                        <input className=" bg-transparent w-full text-sm " type="text" placeholder="محصول خود را بیابید..." />
                    </div>

                    <div className="flex-center gap-12 text-description-text ">
                        <div className="lg:flex items-center justify-center gap-1 hidden">
                            <div className="text-left" >
                                <div>۰۲۱۹۸۷۶۵</div>
                                <div className="text-blue-dark" >۰۳۱۴۴۵۵۶۶۷۷</div>
                            </div>
                            <MdPhoneInTalk className="size-7 text-blue-dark" />
                        </div>

                        <div className="flex-center gap-2 ch:ch:rounded-md ch:ch:bg-[#393A3D] ch:ch:size-9 ch:ch:p-2">
                            <Link to="/account"><FaRegUser /></Link>
                            <Link to="/basket">
                                <div className="flex-center relative">
                                    <span className="absolute -top-[10px] -left-[10px] p-1 rounded-full size-6 flex-center text-[11px] bg-primary-black">12</span>
                                    <CiShoppingBasket className="size-[35px] text-white" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="container text-white">
                    <ul className="flex items-center lg:gap-[60px] gap-12 mt-5 text-[14px] ">
                        <Category screen="large" />
                        <Category screen="large" />
                        <Category screen="large" />
                        <Category screen="large" />
                        <Category screen="large" />
                    </ul>
                </div>
            </div>

            {/* for smaller screens */}
            <div className="md:hidden block bg-secondary-black sticky top-0 py-4">

                <div className="container flex items-center justify-between w-full" >

                    <SideMenu />

                    <Link to="/" className="max-w-[200px]" ><img className=" object-cover w-full h-full " src="/images/home/title.webp" alt="pc-kala-shop" /></Link>

                    <div className="flex-center gap-12 text-description-text ">

                        <div className="flex-center gap-2 ch:ch:rounded-md ch:ch:bg-[#393A3D] ch:ch:size-9 ch:ch:p-2">
                            <Link to="/account"><FaRegUser /></Link>
                            <Link to="/basket">
                                <div className="flex-center relative">
                                    <span className="absolute -top-[10px] -left-[10px] p-1 rounded-full size-6 flex-center text-[11px] bg-primary-black">12</span>
                                    <CiShoppingBasket className="size-[35px] text-white" />
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>

        </section>
    )
}
