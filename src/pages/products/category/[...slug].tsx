import BlockTitle from "@/components/BlockTitle";
import BreadCrumb from "@/components/BreadCrumb";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { engCategoryToPersian } from "@/utils";
import { GetStaticPropsContext } from "next";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { categories, productDataTypes } from "@/global.t";
import { HiOutlineInformationCircle } from "react-icons/hi"
import connectToDB from "@/config/db";
import ProductModel from "@/models/Product";
import { useAppDispatch, useAppSelector } from "@/Hooks/useRedux";
import { loadMoreUpdater } from "@/Redux/Features/globalVarsSlice";
import InfiniteScroll from "@/components/InfiniteScroll";

const Category = ({ product }: { product: productDataTypes[] }) => {

    const [products, setProducts] = useState<productDataTypes[]>(product || [])
    const shouldLoadMoreProduct = useAppSelector(state => state.globalVarsSlice.loadMore)
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1)
    const { filter, category } = router.query || {}
    const dispatch = useAppDispatch()

    const [allOfProductsLoaded, setAllOfProductsLoaded] = useState(false)

    const breadCrumbData = [
        { text: "دسته بندی ها", link: `/products/category/${category}` },
        { text: `${engCategoryToPersian(category as categories)}` }
    ]

    const loadMoreProduct = useCallback(async () => {

        if (allOfProductsLoaded) return

        const res = await fetch('/api/products/get', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                category: router.query?.slug?.length && router.query?.slug[0],
                currentPage: currentPage + 1
            })
        })

        const { product: updatedProducts } = await res.json()

        if (!updatedProducts?.length) { // no product length means user scrolled to end
            dispatch(loadMoreUpdater(false))
            setAllOfProductsLoaded(true)
            return
        }

        if (res.ok) {

            dispatch(loadMoreUpdater(false))

            const currentProducts = [...products, ...updatedProducts]
            setProducts([...new Set([...currentProducts])]) // be sure not to add duplicated products

            setCurrentPage(prev => prev + 1)
        }

    }, [currentPage, router.query, dispatch, products, allOfProductsLoaded])

    useEffect(() => { shouldLoadMoreProduct && loadMoreProduct() }, [shouldLoadMoreProduct, loadMoreProduct, router.query?.slug])

    useEffect(() => { setAllOfProductsLoaded(false), setCurrentPage(1) }, [router.query?.slug]) // reset currentPage and load state when category type changes

    useEffect(() => { product?.length && setProducts(product) }, [product])

    const pathnameWithoutFilter = router.pathname.split('/').filter(value => !value.startsWith('[')).join('/').concat('/' + category)

    useEffect(() => {

        if (!filter || !filter.toString().trim().length) return

        const filteredItems = [...product].filter(item => {
            switch (filter) {
                case 'affordable': { return item.price < 15_000_000 }
                case 'gaming': { return item.price > 32_000_000 }
                case 'student': { return item.price > 25_000_000 }
                case 'rendering': { return item.price > 42_000_000 }
                case 'office': { return item.price > 15_000_000 }
                default: { return item["sub-cat"]?.toLowerCase() == filter || item.name.toLowerCase().includes(filter as string) }
            }
        })

        // if (!filteredItems.length) { location.href = pathnameWithoutFilter }

        setProducts(filteredItems)

    }, [filter, product, router.query])

    return (

        <section className={"bg-primary primary-bg"}>

            <Header />

            {
                !product?.length && <div></div>
            }

            <div className={"space-y-6 container"}>

                <BreadCrumb path={breadCrumbData} />

                <BlockTitle title={`${products?.length} کالا`} Icon={<HiOutlineInformationCircle className="p-[6px]" />} />

                <InfiniteScroll itemsArray={products} showLoader={allOfProductsLoaded} />

            </div>

            <div className={`${products?.length ? 'h-12' : 'h-48'}`}></div>

            <Footer />

        </section>
    );
}

export default Category;

export async function getStaticProps(context: GetStaticPropsContext) {

    const query = context.params
    const category = query?.slug?.length ? query.slug[0] : ''
    const filterBySubCategory = query?.slug?.length ? query.slug[1] : ''

    try {

        const isCategoryValid = ['accessory', 'pc', 'parts', 'laptop', 'console'].find(cat => cat == category)
        if (!isCategoryValid?.length) return { notFound: true } // In case user manually change the route with wrong category name.

        await connectToDB()

        const product = await ProductModel.find({ category }).limit(12)

        return {
            props: {
                product: JSON.parse(JSON.stringify(product))
            }
        }

    } catch (err) {
        console.log('error from category page -> ', err)
        return { notFound: true }
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    };
}