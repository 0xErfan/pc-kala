import Layout from '@/components/p-admin/Layout'
import React from 'react'
import { FaRegEye } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import Image from 'next/image';

const index = () => {
    return (
        <div>
            <Layout>
                <div>

                    <h3 className='text-[26px] font-peyda pt-4 font-bold text-panel-darkBlue'>مدریت کامنت ها</h3>

                    <div className='grid grid-cols-1 pt-4'>

                        <table className='w-full text-center overflow-x-auto rounded-md'>

                            <thead>
                                <tr className='font-peyda md:text-[18px] sm:text-[16px] text-[14px] text-center w-full ch:bg-white ch:py-2 ch:text-panel-darkTitle'>
                                    <td>شماره</td>
                                    <td>اسم</td>
                                    <td>ایمیل</td>
                                    <td>امتیاز</td>
                                    <td>محصول</td>
                                    <td>تاریخ ثبت</td>
                                    <td>مشاهده</td>
                                    <td>تایید</td>
                                </tr>
                            </thead>

                            <tbody className='overflow-auto border border-white'>

                                <tr className='ch:border-2 ch:border-white ch:ch:text-[11px] font-peyda ch:md:text-[15px] ch:py-2'>
                                    <td>1</td>
                                    <td>عرفان افتخاری</td>
                                    <td>eftekharierfan@gmail.com</td>
                                    <td>3</td>
                                    <td>...</td>
                                    <td className=''>03/02/3</td>
                                    <td className='bg-black/10 cursor-pointer'><div className='flex-center ch:size-5 md:ch:size-6'><FaRegEye /></div></td>
                                    <td className='bg-panel-lightGreen cursor-pointer' ><div className='flex-center text-panel-darkGreen ch:size-7'><TiTick /></div></td>
                                </tr>
                                <tr className='ch:border-2 ch:border-white ch:ch:text-[11px] font-peyda ch:md:text-[15px] ch:py-2'>
                                    <td>1</td>
                                    <td>عرفان افتخاری</td>
                                    <td>eftekharierfan@gmail.com</td>
                                    <td>3</td>
                                    <td>...</td>
                                    <td className=''>03/02/3</td>
                                    <td className='bg-black/10 cursor-pointer'><div className='flex-center ch:size-5 md:ch:size-6'><FaRegEye /></div></td>
                                    <td className='bg-panel-lightGreen cursor-pointer' ><div className='flex-center text-panel-darkGreen ch:size-7'><TiTick /></div></td>
                                </tr>
                                <tr className='ch:border-2 ch:border-white ch:ch:text-[11px] font-peyda ch:md:text-[15px] ch:py-2'>
                                    <td>1</td>
                                    <td>عرفان افتخاری</td>
                                    <td>eftekharierfan@gmail.com</td>
                                    <td>3</td>
                                    <td>...</td>
                                    <td className=''>03/02/3</td>
                                    <td className='bg-black/10 cursor-pointer'><div className='flex-center ch:size-5 md:ch:size-6'><FaRegEye /></div></td>
                                    <td className='bg-panel-lightGreen cursor-pointer' ><div className='flex-center text-panel-darkGreen ch:size-7'><TiTick /></div></td>
                                </tr>

                            </tbody>

                        </table>
                    </div>

                </div>
            </Layout>
        </div>
    )
}

export default index