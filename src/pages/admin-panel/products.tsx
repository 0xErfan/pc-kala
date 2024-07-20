import Layout from "@/components/p-admin/Layout";
import React, { useEffect, useState } from "react";
import Product from "@/components/p-admin/Product";
import { productDataTypes } from "@/global.t";
import Pagination from "@/components/p-admin/Pagination";
import ProductTemplate from "@/components/p-admin/ProductTemplate";
import ProductDataEditor from "@/components/p-admin/ProductDataEditor";

const Products = () => {

    const [showAddNewProduct, setShowAddNewProduct] = useState(false)
    const [showProductDataEditor, setShowProductDataEditor] = useState(false)
    const [productDataToEdit, setProductDataToEdit] = useState<productDataTypes>()
    const [products, updateProducts] = useState<productDataTypes[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [allPages, setAllPages] = useState(0)
    const [updater, setUpdater] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)

    useEffect(() => {

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

    const productEditor = (data: productDataTypes) => {
        setShowProductDataEditor(true)
        setShowAddNewProduct(false)
        setProductDataToEdit(data)
    }

    useEffect(() => { showAddNewProduct && setShowProductDataEditor(false) }, [showAddNewProduct])

    return <Layout>

        <div className="flex items-center justify-between relative">
            <h3 className='text-[26px] font-peyda font-bold text-panel-darkBlue'>مدیریت محصولات</h3>
            <button onClick={() => setShowAddNewProduct(prev => !prev)} className={`p-3 ${showAddNewProduct ? 'bg-panel-darkRed' : 'bg-panel-darkGreen'} text-center w-44 whitespace-nowrap font-peyda text-[18px] px-5 flex-center text-white bg-panel-darkGreen rounded-md`}>{showAddNewProduct ? 'لغو' : 'ایجاد محصول جدید'}</button>
        </div>

        {
            showProductDataEditor
                ?
                <ProductDataEditor
                    {...productDataToEdit as productDataTypes}
                    closeUpdateForm={() => setShowProductDataEditor(false)}
                    productsUpdater={() => { setShowProductDataEditor(false), setUpdater(prev => !prev) }}
                />
                :
                null
        }

        {
            showAddNewProduct
                ?
                <ProductTemplate productsUpdater={() => { setShowAddNewProduct(false), setUpdater(prev => !prev) }} />
                :
                null
        }

        <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 2xl:gap-10 mt-6 ch:w-full justify-between"}>
            {
                products?.length
                    ?
                    products.map(data => (
                        <Product
                            data={{ ...data }}
                            productEditor={productEditor}
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