import { useEffect, useRef, useState } from 'react'
import { IoClose, IoReorderThree, IoSearch } from 'react-icons/io5'
import Category from './Category'
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlinePhoneAndroid } from 'react-icons/md'
import { Link } from 'react-router-dom';
import Button from './Button';

const SideMenu = ({ dataToShow, changeTypeFn }: { dataToShow: ("basket" | "sideMenu"), changeTypeFn: () => true }) => {

    const [isMenuShown, setIsMenuShown] = useState<boolean>(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => { dataToShow == "basket" && ref.current?.click() }, [dataToShow])

    const menuCloseHandler = () => { setIsMenuShown(false), changeTypeFn() }

    return (
        <>
            <div className=' md:hidden block' ref={ref} onClick={() => setIsMenuShown(true)}><IoReorderThree className="size-10 sm:size-[46px] p-[6px] bg-primary-black rounded-full text-title-text" /></div>

            <div className={`fixed h-screen bg-primary-black overflow-y-auto top-0 bottom-0 transition-all duration-300 ${isMenuShown ? ` shadow-regular ${dataToShow == "sideMenu" ? "right-0" : "left-0"}` : ` ${dataToShow == "sideMenu" ? "-right-[280px]" : "-left-[280px]"}`} z-40`}>
                {
                    dataToShow !== "sideMenu"
                        ?
                        <div className='px-2 text-[13px]'>
                            <div className='text-description-text w-[265px]'>

                                <div className='flex items-center justify-between text-2xl border-b border-secondary-black text-[14px] pb-4 px-4 mt-4 mb-6 gap-3'>
                                    <div className='flex-[7] justify-end pt-2'><div>سبد خرید <span className='px-2 bg-black rounded-md'>۱۲</span></div></div>
                                    <IoClose onClick={menuCloseHandler} className='cursor-pointer p-[3px] text-dark-red h-full bg-secondary-black rounded-full flex-1' />
                                </div>

                                {/* <div className='flex flex-col justify-center text-[13px] bg-secondary-black rounded-md text-title-text p-3 my-4 items-center gap-3'>
                                    <BiBasket className='size-8 text-description-text' />
                                    <p>هیچ محصولی در سبد خرید نیست</p>
                                </div> */}

                                <div className='space-y-1 flex flex-col gap-3 max-h-[600px] h-full overflow-auto'>

                                    {

                                        [12, 32, 43, 34, 2, 1].map(prd => (
                                            <div key={prd} className='flex gap-2 items-center relative text-[12px] border-b border-dark-gold pb-2 last:border-none'>
                                                <span className=' absolute right-2 top-0 size-5 border border-dark-gold flex-center rounded-sm ch:size-4 cursor-pointer text-white-red'><IoCloseOutline /></span>
                                                <div className='flex-1'><img className='object-cover size-full' src="/images/victus-15.webp" /></div>

                                                <div className='flex-[2]'>
                                                    <Link to="/" className='line-clamp-3 transition-all duration-300 hover:text-white-red'>AN515-46-1 لپ تاپ ایسر ACER Nitro 5 AN515-46 R7-6800H/16G/1TB SSD/3070Ti-8G</Link>
                                                    <p className='text-[15px] p-1 text-title-text'>{1} × <span className='text-white-red'>{71_580_634}</span> تومان</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>

                                <div className='h-full flex flex-col my-8 gap-3'>
                                    <div className='flex items-center justify-between border-y border-dark-gold py-3'>
                                        <p>جمع جزء:</p>
                                        <p><span className='text-white-red text-[16px] font-bold'>{1231234}</span> تومان</p>
                                    </div>
                                    <div className='flex items-center justify-between ch:grow gap-2'>
                                        <Button fn={() => {}} filled text='تسویه حساب'/>
                                        <Button fn={() => {}} filled text='مشاهده سبد خرید'/>
                                    </div>
                                </div>
                            </div>

                        </div>
                        :
                        <div className='py-2'>

                            <div className='flex items-center justify-between text-2xl px-4 mt-4 mb-6 gap-3 w-[265px]'>
                                <div className='flex-[7] pt-2'><img className='object-cover px-1' src="/images/home/title.webp" /></div>
                                <IoClose onClick={menuCloseHandler} className='cursor-pointer p-[2px] text-dark-red h-full bg-secondary-black rounded-full flex-1' />
                            </div>

                            <div className="flex items-center bg-secondary-black text-white gap-2 ch:ml-auto pt-2 mx-3 p-2 border-b border-red-800 overflow-hidden rounded-md">
                                <input className=" bg-transparent w-full text-sm " type="text" placeholder="محصول خود را بیابید..." />
                                <IoSearch className='size-7' />
                            </div>

                            <span className='border-b-2 rotate-180 mt-8 border-secondary-black block pt-4 opacity-[20] rounded-full m-auto w-3/4'></span>

                            <div className="text-white">
                                <ul className="flex items-start px-5 flex-col gap-4 mt-5 text-[14px]">
                                    <Category />
                                    <Category />
                                    <Category />
                                    <Category />
                                    <Category />
                                </ul>
                            </div>

                            <span className='border-b-2 border-secondary-black block py-3 opacity-[20] rounded-full m-auto w-3/4'></span>

                            <div className="flex items-center px-5 mt-6 gap-1">
                                <MdOutlinePhoneAndroid className="size-7 text-blue-dark" />
                                <div className='text-sm text-white flex items-center gap-4'>
                                    تماس با ما :
                                    <div className="text-left" >
                                        <div>۰۲۱۹۸۷۶۵</div>
                                        <div className="text-blue-dark" >۰۳۱۴۴۵۵۶۶۷۷</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                }
            </div>

            {/* backdrop overlay */}
            {isMenuShown && <div onClick={menuCloseHandler} className={` fixed delay-75 inset-0 w-full h-full bg-transparent backdrop-blur-sm z-[39] transition-all`}></div >}
        </>
    )
}

export default SideMenu;