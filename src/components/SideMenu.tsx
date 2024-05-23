import { useEffect, useMemo, useRef, useState } from 'react'
import { IoClose, IoReorderThree, IoSearch } from 'react-icons/io5'
import Category from './Category'
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlinePhoneAndroid } from 'react-icons/md'
import Button from './Button';
import Link from 'next/link';
import { FaComputer } from 'react-icons/fa6';
import { IoIosLaptop } from 'react-icons/io';
import { HiOutlineCpuChip } from 'react-icons/hi2';
import { PiHeadphones } from 'react-icons/pi';
import { GiConsoleController } from 'react-icons/gi';
import { useAppDispatch, useAppSelector } from '@/Hooks/useRedux';
import { BiBasket } from 'react-icons/bi';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { removeProductFromBasket, showToast } from '@/utils';
import { changeCanScroll, userUpdater } from '@/Redux/Features/globalVarsSlice';

const SideMenu = ({ dataToShow, changeTypeFn }: { dataToShow: ("basket" | "sideMenu"), changeTypeFn: () => true }) => {

    const [isMenuShown, setIsMenuShown] = useState<boolean>(false)
    const ref = useRef<HTMLDivElement>(null)
    const navigate = useRouter()
    const dispatch = useAppDispatch()

    const { relatedData, data, isLogin } = useAppSelector(state => state.userSlice) || []

    const sumOfProductsPrice = useMemo(() => {
        let sum = 0
        relatedData.BasketItem?.map(data => { sum += (data.productID.price * data.count) })
        return sum
    }, [relatedData.BasketItem])

    const deleteProductFromBasket = (productID: string) => {
        if (!isLogin) { showToast(false, 'ابتدا وارد حساب خود شوید'); return }
        removeProductFromBasket(productID, data._id).then(() => dispatch(userUpdater()))
    }

    useEffect(() => { dataToShow == "basket" && ref.current?.click() }, [dataToShow])

    const menuCloseHandler = () => { setIsMenuShown(false), changeTypeFn() }

    useEffect(() => { dispatch(changeCanScroll(!isMenuShown)) }, [isMenuShown])

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
                                    <div className='flex-[7] justify-end pt-2'><div>سبد خرید <span className='px-2 bg-black rounded-md'>{relatedData.BasketItem?.length}</span></div></div>
                                    <IoClose onClick={menuCloseHandler} className='cursor-pointer p-[3px] text-dark-red h-full bg-secondary-black rounded-full flex-1' />
                                </div>

                                <div className='space-y-1 flex flex-col gap-3 h-[600px] overflow-auto'>

                                    {
                                        relatedData.BasketItem?.length
                                            ?
                                            [...relatedData.BasketItem].map(itemData => (
                                                <div data-aos-duration="550" data-aos="fade-right" key={itemData.productID._id} className='flex gap-2 items-center relative text-[12px] border-b border-dark-gold pb-2 last:border-none'>

                                                    <span onClick={() => deleteProductFromBasket(itemData.productID._id)} className='absolute right-2 top-0 size-5 border border-dark-gold flex-center rounded-sm ch:size-4 cursor-pointer text-white-red'><IoCloseOutline /></span>
                                                    <div className='flex-1'><Image alt={itemData.productID.name} width={400} height={400} className='object-cover size-full' src="/images/laptop-default.webp" /></div>

                                                    <div className='flex-[2]'>
                                                        <Link href={`/products/search/${itemData.productID._id}`} className='line-clamp-3 transition-all duration-300 hover:text-white-red'>{itemData.productID.name}</Link>
                                                        <p className='text-[15px] p-1 text-title-text'>{itemData.count} × <span className='text-white-red'>{itemData.productID.price.toLocaleString('fa-Ir')}</span> تومان</p>
                                                    </div>

                                                </div>
                                            ))
                                            :
                                            <div className='flex flex-col justify-center text-[13px] bg-secondary-black rounded-md text-title-text p-3 my-4 items-center gap-3'>
                                                <BiBasket className='size-8 text-description-text' />
                                                <p>هیچ محصولی در سبد خرید نیست</p>
                                            </div>
                                    }
                                </div>

                                <div className='h-full flex flex-col my-8 gap-3'>
                                    <div className='flex items-center justify-between border-y border-dark-gold py-3'>
                                        <p>جمع جزء:</p>
                                        <p><span className='text-white-red text-[16px] font-bold'>{sumOfProductsPrice.toLocaleString('fa-Ir')}</span> تومان</p>
                                    </div>
                                    <div className='flex items-center justify-between ch:grow gap-2'>
                                        <Button fn={() => navigate.push('/checkout')} filled text='تسویه حساب' />
                                        <Button fn={() => navigate.push('/cart')} filled text='مشاهده سبد خرید' />
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
                                    <Category
                                        key={'کامپیوتر'}
                                        title="کامپیوتر" screen="small"
                                        Icon={<FaComputer className="size-5" />}
                                        submenus={[
                                            { title: 'کامپیوتر گیمینگ', path: '/products/pc/gaming' },
                                            { title: 'کامپیوتر اقتصادی', path: '/products/pc/affordable' },
                                            { title: 'کامپیوتر دانشجویی', path: '/products/pc/student' },
                                            { title: 'کامپیوتر رندرینک', path: '/products/pc/rendering' },
                                            { title: 'سیستم اداری', path: '/products/pc/office' },
                                        ]}
                                    />
                                    <Category
                                        key={'لپتاپ'}
                                        title="لپتاپ" screen="small"
                                        Icon={<IoIosLaptop className="size-6" />}
                                        submenus={[
                                            { title: 'لپتاپ Lonovo ', path: '/products/laptop/lenovo' },
                                            { title: 'لپتاپ Asus ', path: '/products/laptop/asus' },
                                            { title: 'لپتاپ Msi ', path: '/products/laptop/msi' },
                                            { title: 'لپتاپ Hp ', path: '/products/laptop/hp' },
                                            { title: 'لپتاپ Acer ', path: '/products/laptop/acer' },
                                        ]}
                                    />
                                    <Category
                                        key={'قطعات'}
                                        title="قطعات کامپیوتر" screen="small"
                                        Icon={<HiOutlineCpuChip className="size-6" />}
                                        submenus={[
                                            { title: 'مادربرد', path: '/products/parts/motherboard' },
                                            { title: 'سیپیو', path: '/products/parts/cpu' },
                                            { title: 'کارت گرافیک', path: '/products/parts/gpu' },
                                            { title: 'رم', path: '/products/parts/ram' },
                                            { title: 'هارد', path: '/products/parts/hard' },
                                            { title: 'خنک کننده', path: '/products/parts/cooler' },
                                            { title: 'حافظه SSD', path: '/products/parts/ssd' },
                                            { title: 'مانیتور', path: '/products/parts/monitor' },
                                            { title: 'کیس', path: '/products/parts/case' },
                                        ]}
                                    />
                                    <Category
                                        key={'لوازم'}
                                        title="لوازم جانبی" screen="small"
                                        Icon={<PiHeadphones className="size-6" />}
                                        submenus={[
                                            { title: 'موس', path: '/products/aditional/mouse' },
                                            { title: 'کیبرد', path: '/products/aditional/keyboard' },
                                            { title: 'اسپیکر', path: '/products/aditional/speaker' },
                                            { title: 'وبکم', path: '/products/aditional/webcam' },
                                        ]}
                                    />
                                    <Category
                                        key={'کنسول'}
                                        title="کنسول بازی" screen="small"
                                        Icon={<GiConsoleController className="size-6" />}
                                        submenus={[
                                            { title: 'کنسول ps5', path: '/products/console/ps5' },
                                            { title: 'کنسول xbox', path: '/products/console/xbox' },
                                        ]}
                                    />
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