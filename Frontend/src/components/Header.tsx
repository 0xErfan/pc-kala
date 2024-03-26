import { IoSearch } from "react-icons/io5";
import { SlBasketLoaded } from "react-icons/sl";
import { FaRegUser } from "react-icons/fa";
import { MdPhoneInTalk } from "react-icons/md";
import Category from "./Category";



export default function Header() {
    return (
        <section className="bg-secondary-black sticky top-0 py-4">
            <div className="container flex items-center m-auto justify-between w-full" >
                <div className="max-w-[200px]" ><img className=" object-cover w-full h-full " src="/images/home/title.webp" alt="pc-kala-shop" /></div>

                <div className="flex-center text-white gap-2 ch:ml-auto bg-primary-black p-2 rounded-md  w-2/5 ">
                    <IoSearch />
                    <input className=" bg-transparent w-full text-sm " type="text" placeholder="محصول خود را بیابید..." />
                </div>

                <div className="flex-center gap-12 text-description-text ">
                    <div className="flex-center gap-1 " >
                        <div className="text-left" >
                            <div>۰۲۱۹۸۷۶۵</div>
                            <div className="text-blue-dark" >۰۳۱۴۴۵۵۶۶۷۷</div>
                        </div>
                        <MdPhoneInTalk className="size-7 text-blue-dark" />
                    </div>

                    <div className="flex-center gap-2 ch:rounded-md ch:bg-primary-black ch:size-9 ch:p-2">
                        <FaRegUser />
                        <div className="flex-center">
                            {/* <span className="user-basket absolute ">12</span> */}
                            <SlBasketLoaded />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container text-white ">
                <ul className="flex items-center gap-20 mt-5 text-[14px] ">
                    <Category />
                    <Category />
                    <Category />
                    <Category />
                    <Category />
                </ul>
            </div>

        </section>
    )
}
