import Layout from '@/components/p-admin/Layout'
import React from 'react'
import { IoBan } from "react-icons/io5";
import { MdDeleteOutline } from 'react-icons/md'

const index = () => {
    return (
        <Layout>
            <div>

                <h3 className='text-[26px] font-peyda font-bold text-panel-darkBlue'>مدریت کاربران</h3>

                <div className='grid grid-cols-1 pt-4'>

                    <table className='w-full text-center overflow-x-auto rounded-md'>

                        <thead>
                            <tr className='font-peyda md:text-[18px] sm:text-[16px] text-[14px] text-center w-full ch:bg-white ch:py-2 ch:text-panel-darkTitle'>
                                <td>شناسه</td>
                                <td>نام</td>
                                <td>ایمیل</td>
                                <td>نقش</td>
                                <td>بن</td>
                                <td>حذف</td>
                            </tr>
                        </thead>

                        <tbody className='overflow-auto border border-white'>

                            <tr className='ch:border-2 ch:border-white ch:ch:text-[11px] ch:md:text-[15px] ch:py-2'>
                                <td>1</td>
                                <td>عرفان افتخاری</td>
                                <td>eftekharierfan@gmail.com</td>
                                <td className='w-[120px] m-auto'>
                                    <div className="grid grid-cols-1 pl-4">
                                        <select className='w-full h-full ch:p-2 text-center font-peyda text-[18px] bg-panel-white'>
                                            <option value='USER' selected>کاربر</option>
                                            <option value="ADMIN">ادمین</option>
                                        </select>
                                    </div>
                                </td>
                                <td className='bg-panel-lightRed cursor-pointer'><div className='flex-center border-none md:border text-panel-darkRed cursor-pointer ch:size-5 md:ch:size-6'><IoBan /></div></td>
                                <td className='bg-panel-lightRed cursor-pointer'><div className='flex-center border-none md:border text-panel-darkRed cursor-pointer ch:size-5 md:ch:size-6'><MdDeleteOutline /></div></td>
                            </tr>
                            <tr className='ch:border-2 ch:border-white ch:ch:text-[11px] ch:md:text-[15px] ch:py-2'>
                                <td>1</td>
                                <td>عرفان افتخاری</td>
                                <td>eftekharierfan@gmail.com</td>
                                <td className='w-[120px] m-auto'>
                                    <div className="grid grid-cols-1 pl-4">
                                        <select className='w-full h-full ch:p-2 text-center font-peyda text-[18px] bg-panel-white'>
                                            <option value='USER' selected>کاربر</option>
                                            <option value="ADMIN">ادمین</option>
                                        </select>
                                    </div>
                                </td>
                                <td className='bg-panel-lightRed cursor-pointer'><div className='flex-center border-none md:border text-panel-darkRed cursor-pointer ch:size-5 md:ch:size-6'><IoBan /></div></td>
                                <td className='bg-panel-lightRed cursor-pointer'><div className='flex-center border-none md:border text-panel-darkRed cursor-pointer ch:size-5 md:ch:size-6'><MdDeleteOutline /></div></td>
                            </tr>
                            <tr className='ch:border-2 ch:border-white ch:ch:text-[11px] ch:md:text-[15px] ch:py-2'>
                                <td>1</td>
                                <td>عرفان افتخاری</td>
                                <td>eftekharierfan@gmail.com</td>
                                <td className='w-[120px] m-auto'>
                                    <div className="grid grid-cols-1 pl-4">
                                        <select className='w-full h-full ch:p-2 text-center font-peyda text-[18px] bg-panel-white'>
                                            <option value='USER' selected>کاربر</option>
                                            <option value="ADMIN">ادمین</option>
                                        </select>
                                    </div>
                                </td>
                                <td className='bg-panel-lightRed cursor-pointer'><div className='flex-center border-none md:border text-panel-darkRed cursor-pointer ch:size-5 md:ch:size-6'><IoBan /></div></td>
                                <td className='bg-panel-lightRed cursor-pointer'><div className='flex-center border-none md:border text-panel-darkRed cursor-pointer ch:size-5 md:ch:size-6'><MdDeleteOutline /></div></td>
                            </tr>

                        </tbody>
                    </table>
                </div>


            </div>
        </Layout>
    )
}

export default index