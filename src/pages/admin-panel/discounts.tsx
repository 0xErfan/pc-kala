import Layout from '@/components/p-admin/Layout'
import React from 'react'
import { MdDeleteOutline } from "react-icons/md";

const discountCodes = () => {
    return (
        <Layout>
            <div>

                <h3 className='text-[26px] font-peyda font-bold text-panel-darkTitle'>مدریت کد های تخفیف</h3>

                <div className='grid sm:grid-cols-3 grid-cols-1 sm:gap-3 gap-7 font-peyda pt-12'>

                    <div className='flex gap-2 flex-col text-panel-darkTitle'>
                        <p>شناسه تخفیف</p>
                        <input placeholder='1M-SummerOff' className=' rounded-md p-1 px-2 text-[25px] border-2 pt-2 border-panel-darkTitle placeholder:text-xl' type="text" />
                    </div>

                    <div className='flex gap-2 flex-col text-panel-darkTitle'>
                        <p>مقدار تخفیف(تومان)</p>
                        <input placeholder='1000000T' className=' rounded-md p-1 px-2 text-[25px] border-2 pt-2 border-panel-darkTitle placeholder:text-xl' type="text" />
                    </div>

                    <div className='flex gap-2 flex-col text-panel-darkTitle'>
                        <p>حداکثر استفاده</p>
                        <input placeholder='12' className=' rounded-md p-1 px-2 text-[25px] border-2 pt-2 border-panel-darkTitle placeholder:text-xl' type="text" />
                    </div>

                    <button className='p-3 flex-center text-center border-2 border-panel-darkBlue bg-panel-lightBlue rounded-md'>افزودن کد تخفیف</button>
                    <span></span>
                    <span></span>
                </div>

                <span className='w-4/6 h-px rounded-full border border-[#D0D6DE] rotate-180 m-auto my-12 block'></span>

                <div className='grid grid-cols-1'>

                    <table className='w-full text-center overflow-x-auto rounded-md'>
                        
                        <thead>
                            <tr className='font-peyda md:text-[18px] sm:text-[16px] text-[14px] text-center w-full ch:bg-white ch:py-2 ch:text-panel-darkTitle'>
                                <td>شماره</td>
                                <td>شناسه</td>
                                <td>ارزش(تومان)</td>
                                <td>حداکثر استفاده</td>
                                <td>دفعات استفاده شده</td>
                                <td>حذف</td>
                            </tr>
                        </thead>

                        <tbody className='overflow-auto border border-white'>

                            <tr className='ch:border-2 even:bg-panel-lightRed ch:border-white ch:ch:text-[11px] ch:md:text-[15px] ch:py-2'>
                                <td>1</td>
                                <td>oneMilOffForSummer</td>
                                <td>12000000</td>
                                <td>2000</td>
                                <td>651</td>
                                <td className='flex-center border-none md:border text-panel-darkRed cursor-pointer ch:size-5 md:ch:size-6'><MdDeleteOutline /></td>
                            </tr>
                            <tr className='ch:border-2 even:bg-panel-lightRed ch:border-white ch:ch:text-[11px] ch:md:text-[15px] ch:py-2'>
                                <td>1</td>
                                <td>oneMilOffForSummer</td>
                                <td>12000000</td>
                                <td>2000</td>
                                <td>651</td>
                                <td className='flex-center border-none md:border text-panel-darkRed cursor-pointer ch:size-5 md:ch:size-6'><MdDeleteOutline /></td>
                            </tr>
                            <tr className='ch:border-2 even:bg-panel-lightRed ch:border-white ch:ch:text-[11px] ch:md:text-[15px] ch:py-2'>
                                <td>1</td>
                                <td>oneMilOffForSummer</td>
                                <td>12000000</td>
                                <td>2000</td>
                                <td>651</td>
                                <td className='flex-center border-none md:border text-panel-darkRed cursor-pointer ch:size-5 md:ch:size-6'><MdDeleteOutline /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>


            </div>
        </Layout>
    )
}

export default discountCodes