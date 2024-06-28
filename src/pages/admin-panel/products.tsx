import Layout from "@/components/p-admin/Layout";
import { FiPlus } from "react-icons/fi";
import React from "react";
import Image from "next/image";

const Products = () => {
    return <Layout>

        <h3 className='text-[26px] font-peyda font-bold text-panel-darkBlue'>ایجاد محصول جدید</h3>

        <div className='flex items-center gap-4 my-4'>

            <div className={'flex-[2.4] h-full mb-auto rounded-xl p-4 bg-white shadow-sm'}>
                <div className="flex items-center flex-col ch:w-full ch:flex-1 gap-8">

                    <div className="flex flex-col gap-2 shadow-sm text-panel-darkTitle font-peyda text-[20px]">
                        <p>نام محصول</p>
                        <input className="bg-panel-white rounded-xl p-3" placeholder="Laptop Acer..." type="text" />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-2 shadow-sm text-panel-darkTitle font-peyda text-[20px]">
                            <p>قیمت محصول(تومان)</p>
                            <input className="bg-panel-white rounded-xl p-3" placeholder="1,000,000" type="text" />
                        </div>
                        <div className="flex flex-col gap-2 shadow-sm text-panel-darkTitle font-peyda text-[20px]">
                            <p>تخفیف محصول(درصد)</p>
                            <input className="bg-panel-white rounded-xl p-3" placeholder="0" type="text" />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 ch:w-full w-full ch:flex-1 rounded-xl bg-white">

                        <div className={'text-panel-darkTitle py-2 font-peyda'}>
                            <p className={'text-[20px] mb-2'}>دسته بندی اصلی</p>
                            <div className={'w-full ch:w-full'}>
                                <select className={'bg-panel-white p-4 rounded-xl'}>
                                    <option value="a">لپتاپ</option>
                                    <option value="a">کامپیوتر</option>
                                    <option value="a">قطعات کامپیوتر</option>
                                    <option value="a">لوازم جانبی</option>
                                    <option value="a">کنسول بازی</option>
                                </select>
                            </div>
                        </div>

                        <div className={'text-panel-darkTitle py-2 font-peyda'}>
                            <p className={'text-[20px] mb-2'}>زیرمجموعه</p>
                            <div className={'w-full ch:w-full'}>
                                <select className={'bg-panel-white p-4 rounded-xl'}>
                                    <option value="a">بزودی سید</option>
                                </select>
                            </div>
                        </div>

                    </div>

                    <div className="flex flex-col gap-2 text-panel-darkTitle font-peyda text-[20px]">
                        
                        <p>مشخصات محصول</p>
                        <div className="flex ch:bg-panel-white items-center justify-center gap-2 rounded-xl">
                            <input className="bg-panel-white flex-[5] rounded-xl p-2" placeholder="صفحه نمایش" type="text" />
                            <div className="flex-1 bg-panel-white text-center text-xl rounded-xl p-2"> = </div>
                            <input className="bg-panel-white flex-[5] rounded-xl p-2" placeholder="12 اینچ 1440p" type="text" />
                        </div>

                        <div className="flex items-center cursor-pointer whitespace-nowrap text-[15px] ml-auto w-min gap-1 rounded-md text-panel-darkGreen bg-panel-lightGreen p-1">
                            <p className="text-md">افزودن بیشتر</p>
                            <FiPlus className="size-6" />
                        </div>
                    </div>

                    <button className='p-3 text-center font-peyda text-[18px] px-5 flex-center text-white bg-panel-darkGreen rounded-xl'>ایجاد محصول جدید</button>

                </div>
            </div>

            <div className={'flex-1 rounded-xl p-4 h-full mb-auto bg-white shadow-sm'}>
                <div className={'font-peyda text-[25px] pb-3'}>اپلود عکس</div>
                <div className={'flex flex-col gap-3'}>
                    <div className={' aspect-square h-[370px] bg-panel-white rounded-xl size-full'}><Image className={'object-cover size-full'} width={300} height={300} src="/images/imageNotFound.webp" alt="idk" /></div>
                    <div className={'grid grid-cols-4 gap-3'}>
                        <div className={' border-dotted border-[3px] cursor-pointer flex-center rounded-xl'}><FiPlus className={'size-7 text-panel-darkGreen bg-panel-lightGreen p-1 rounded-full'} /></div>
                        <div className={' aspect-square bg-panel-white rounded-xl'}><Image className={'object-cover size-full'} width={300} height={300} src="/images/imageNotFound.webp" alt="idk" /></div>
                        <div className={' aspect-square bg-panel-white rounded-xl'}><Image className={'object-cover size-full'} width={300} height={300} src="/images/imageNotFound.webp" alt="idk" /></div>
                        <div className={' aspect-square bg-panel-white rounded-xl'}><Image className={'object-cover size-full'} width={300} height={300} src="/images/imageNotFound.webp" alt="idk" /></div>
                    </div>
                </div>
            </div>

        </div>

    </Layout>
}

export default Products;