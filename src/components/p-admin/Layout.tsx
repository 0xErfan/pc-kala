import '@/styles/noScroll.module.css'
import { ReactNode, useState } from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { RiFileList3Line } from "react-icons/ri";
import { LiaComment } from "react-icons/lia";
import PageLinks from '@/components/p-admin/PageLinks';
import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import Link from 'next/link';
import { useAppDispatch } from '@/Hooks/useRedux';
import { useRouter } from 'next/router';
import { modalDataUpdater } from '@/Redux/Features/globalVarsSlice';
import { showToast } from '@/utils';
import { userDataUpdater } from '@/Redux/Features/userSlice';
import Image from 'next/image';
import Button from '../Button';
import Notifications from './Notifications';

const Layout = ({ children }: { children: ReactNode }) => {


    const dispatch = useAppDispatch()
    const navigate = useRouter()

    const logout = async () => {

        dispatch(modalDataUpdater({
            isShown: true, title: 'خروج از حساب', message: 'آیا قصد خروج از حسابتان را دارید؟', okButtonText: 'بله', fn: async () => {

                const res = await fetch('/api/auth/logout')
                const resData = await res.json()

                showToast(res.ok, resData.message)

                if (res.ok) {
                    dispatch(userDataUpdater({ isLogin: false }))
                    navigate.push('/')
                }
            }
        }))
    }

    return (
        <div className='flex bg-panel-white min-h-screen'>

            <aside className='bg-white xl:w-full w-20 xl:flex-[1] z-40'>
                <div className='sticky top-0 xl:p-5 p-3'>

                    <div>
                        <Link href={'/admin-panel'} className='flex items-start justify-center gap-px flex-col'>
                            <div className='relative xl:block hidden'>
                                <h1 className='text-[#333333] font-extrabold text-[25px] font-peyda'>پیسی کالا</h1>
                                <span className='absolute size-2 rounded-full bg-panel-darkGreen bottom-2 -left-3'></span>
                            </div>
                            <div className='xl:hidden block'><Image width={100} height={100} quality={100} alt='pc-kala favicon' src='/images/fav-logo.png' /></div>
                        </Link>

                        <div className='flex justify-center ch:ch:shrink-0 flex-col mt-10'>

                            <PageLinks
                                Icon={<IoHomeOutline />}
                                title={'داشبرد'}
                                path='/admin-panel'
                                key={'dashboard'}
                            />

                            <PageLinks
                                Icon={<FiUsers />}
                                title={'کاربران'}
                                path='/admin-panel/users'
                                key={'users'}
                            />

                            <PageLinks
                                Icon={<RiFileList3Line />}
                                title={'تراکنش ها'}
                                path='/admin-panel/transactions'
                                key={'transactions'}
                            />

                            <PageLinks
                                Icon={<LiaComment />}
                                title={'کامنت ها'}
                                path='/admin-panel/comments'
                                key={'comments'}
                            />

                            <PageLinks
                                Icon={<IoSettingsOutline />}
                                title={'تنظیمات'}
                                path='/admin-panel/settings'
                                key={'settings'}
                            />

                            <span className='py-10 border-b mb-4 border-[#D0D6DE]'></span>

                            <button
                                className={`flex gap-2 items-center relative justify-center xl:justify-start p-3 text-red-500 bg-red-500/15 ch:transition-all duration-200 ease-in-out rounded-md ch:font-extrabold font-peyda`}
                                onClick={logout}
                            >
                                <RiLogoutBoxLine className='size-6' />
                                <span className='xl:block hidden'>خروج</span>
                                <span className='absolute -right-5 h-5/6 w-[6px] rounded-l-md bg-panel-darkRed'></span>
                            </button>

                        </div>
                    </div>


                    {/* <div className='font-peyda text-panel-darkTitle text-center'>

                        <p>ادمین پنل پیسی کالا</p>
                        <p>© 2020 All Rights Reserved</p>

                        <div dir='ltr'>
                            Made with ❤️ by
                            <Link
                                target='_blank'
                                href={'https://github.com/0xErfan'}
                                className='text-panel-darkBlue font-bold px-2'>0xErfan
                            </Link>
                        </div>
                    </div> */}

                </div>

            </aside>


            <section className='flex-[6] xl:p-10 p-5 relative'>

                <span className='right-0 left-0 fixed top-0 w-full xl:h-[120px] h-[110px] bg-panel-white z-30'></span>

                <div className='flex items-center ch:flex-1 xl:gap-0 gap-10 sticky top-10 z-40'>

                    <div className='flex items-center justify-between text-[#969BA0] bg-white rounded-md h-[56px] px-2 shadow-sm'>
                        <input className='bg-transparent px-4 h-full placeholder:font-peyda w-full' placeholder='جستجو کن' type="text" />
                        <CiSearch className='size-8 cursor-pointer' />
                    </div>

                    <div className='flex items-center justify-end'>

                        <Notifications/>

                        <div className='inline-block border h-px rotate-90 border-[#D0D6DE] px-6'></div>

                        <div className='flex items-center gap-4'>
                            <div className='text-[16px] xl:block font-peyda hidden text-panel-darkTitle'>خوش اومدی <span className='text-[15px] font-bold px-px'>{'Erfan'}</span></div>
                            <div className='size-[56px] border-panel-darkGreen rounded-full border-2 shadow-sm'><img className='size-full rounded-full object-cover' src="https://static.vecteezy.com/system/resources/previews/029/156/453/original/admin-business-icon-businessman-business-people-male-avatar-profile-pictures-man-in-suit-for-your-web-site-design-logo-app-ui-solid-style-illustration-design-on-white-background-eps-10-vector.jpg" alt="Admin profile" /></div>
                        </div>

                    </div>
                </div>

                <section className='pt-[35px]'>{children}</section>

            </section>
        </div>
    )
}

export default Layout;