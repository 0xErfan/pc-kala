import Discount from '@/components/p-admin/Discount';
import Layout from '@/components/p-admin/Layout'
import Pagination from '@/components/p-admin/Pagination';
import { DiscountDataTypes } from '@/global.t';
import React, { useLayoutEffect, useState } from 'react'


const discountCodes = () => {

    const [showAddNewProduct, setShowAddNewProduct] = useState(false)
    const [discounts, setDiscounts] = useState<DiscountDataTypes[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [allPages, setAllPages] = useState(0)
    const [updater, setUpdater] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)

    useLayoutEffect(() => {

        (async () => {

            if (isLoading) return

            try {
                setIsLoading(true)

                const res = await fetch('/api/discount/getAll', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ currentPage })
                })

                const { newDiscounts, availablePages } = await res.json()

                if (!newDiscounts?.length) return setIsEmpty(true)

                setAllPages(availablePages)
                setDiscounts([...newDiscounts])

            } catch (error) { console.log(error) }
            finally { setIsLoading(false) }
        })()

    }, [currentPage, updater])

    return (

        <Layout>
            <>
                <div className="flex items-center justify-between">
                    <h3 className='text-[26px] font-peyda font-bold text-panel-darkBlue'>مدریت کد های تخفیف</h3>
                    <button onClick={() => setShowAddNewProduct(prev => !prev)} className={`p-3 ${showAddNewProduct ? 'bg-panel-darkRed' : 'bg-panel-darkGreen'} text-center w-44 whitespace-nowrap font-peyda text-[18px] px-5 flex-center text-white bg-panel-darkGreen rounded-md`}>{showAddNewProduct ? 'لغو' : 'ایجاد کد تخفیف جدید'}</button>
                </div>

                {
                    showAddNewProduct
                        ?
                        <div data-aos="zoom-in" className="mt-12 mb-20">
                            <div className='grid sm:grid-cols-3 grid-cols-1 sm:gap-3 gap-7 font-peyda pt-0'>

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

                            <span className='w-4/6 h-px rounded-full border border-[#D0D6DE] rotate-180 m-auto my-20 block'></span>
                        </div>
                        : null
                }

                <div className={` ${!showAddNewProduct ? 'block' : 'hidden'} py-6 `}></div>

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
                            {
                                discounts?.length
                                    ?
                                    discounts.map((discountData, index) => <Discount
                                        discountsUpdater={() => setUpdater(prev => !prev)}
                                        rowNumber={index + ((currentPage - 1) * 12)}
                                        key={discountData.createdAt}
                                        {...discountData}
                                    />)
                                    : null
                            }
                        </tbody>
                    </table>

                    {
                        discounts?.length
                            ?
                            <Pagination
                                currentPage={currentPage}
                                latestPage={allPages}
                                currentPageUpdater={page => setCurrentPage(page)}
                            />
                            : null
                    }

                    { isEmpty ? <div className='w-full flex-center text-[22px] text-panel-darkRed py-2 border border-white font-peyda font-bold text-center'>کد تخفیفی  وجود ندارد</div> : null }

                </div>

            </>
        </Layout>
    )
}

export default discountCodes