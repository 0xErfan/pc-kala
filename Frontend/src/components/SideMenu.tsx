import { useState } from 'react'
import { IoClose, IoReorderThree, IoSearch } from 'react-icons/io5'
import Category from './Category'
import { MdOutlinePhoneAndroid } from 'react-icons/md'

const SideMenu = () => {

    const [isMenuShown, setIsMenuShown] = useState<boolean>(false)

    return (
        <>
            <IoReorderThree onClick={() => setIsMenuShown(true)} className="size-12 p-[6px] bg-primary-black rounded-full text-title-text" />

            <div className={`fixed h-screen bg-primary-black max-h-screen overflow-y-auto top-0 bottom-0 duration-300 ${isMenuShown ? "right-0" : "-right-[280px]"} z-40`}>
                <div className='py-2'>

                    <div className='flex items-center justify-between text-2xl px-4 mt-4 mb-6 gap-3 w-[280px]'>
                        <div className='flex-[6] pt-2'><img className='object-cover px-1' src="images/home/title.webp" /></div>
                        <IoClose onClick={() => setIsMenuShown(false)} className='cursor-pointer p-[2px] text-dark-red h-full bg-secondary-black rounded-full flex-1' />
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
            </div>

            {/* backdrop overlay */}
            {isMenuShown && <div onClick={() => setIsMenuShown(false)} className={` fixed delay-75 inset-0 w-full h-full bg-transparent backdrop-blur-sm z-[39] transition-all`}></div>}
        </>
    )
}

export default SideMenu