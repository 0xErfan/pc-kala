import Layout from "@/components/p-admin/Layout";
import { FiPlus } from "react-icons/fi";
import React, { useLayoutEffect, useState } from "react";
import Image from "next/image";
import Product from "@/components/p-admin/Product";
import { productDataTypes } from "@/global.t";
import Pagination from "@/components/p-admin/Pagination";
import ProductTemplate from "@/components/p-admin/ProductTemplate";

const Products = () => {

    const [showAddNewProduct, setShowAddNewProduct] = useState(true)
    const [products, updateProducts] = useState<productDataTypes[]>([])
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

                const res = await fetch('/api/products/getAll', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ currentPage })
                })

                const { products: newProducts, availablePages } = await res.json()
                if (!newProducts?.length) return setIsEmpty(true)

                setAllPages(availablePages)
                updateProducts([...newProducts])
                setIsEmpty(false)

            } catch (error) { console.log(error) }
            finally { setIsLoading(false) }
        })()

    }, [currentPage, updater])

    return <Layout>

        <div className="flex items-center justify-between">
            <h3 className='text-[26px] font-peyda font-bold text-panel-darkBlue'>مدیریت محصولات</h3>
            <button onClick={() => setShowAddNewProduct(prev => !prev)} className={`p-3 ${showAddNewProduct ? 'bg-panel-darkRed' : 'bg-panel-darkGreen'} text-center w-44 whitespace-nowrap font-peyda text-[18px] px-5 flex-center text-white bg-panel-darkGreen rounded-md`}>{showAddNewProduct ? 'لغو' : 'ایجاد محصول جدید'}</button>
        </div>

        {
            showAddNewProduct ? <ProductTemplate /> : null
        }

        <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 2xl:gap-10 mt-6 ch:w-full justify-between"}>
            {
                products?.length
                    ?
                    products.map(data => (
                        <Product
                            {...data}
                            productUpdater={() => setUpdater(prev => !prev)}
                            key={data._id}
                        />)
                    )
                    : null
            }
        </div >

        <div className="flex-center max-w-[300px] m-auto">
            {
                products?.length
                    ?
                    <Pagination
                        currentPage={currentPage}
                        latestPage={allPages}
                        currentPageUpdater={page => setCurrentPage(page)}
                    />
                    : null
            }

            {isEmpty ? <div data-aos='zoom-in' className='w-full flex-center text-[22px] text-panel-darkRed py-2 border border-white font-peyda font-bold text-center'>محصولی  وجود ندارد</div> : null}
        </div>


    </Layout>
}

export default Products;