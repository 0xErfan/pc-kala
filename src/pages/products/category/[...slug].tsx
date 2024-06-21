import BlockTitle from "@/components/BlockTitle";
import BreadCrumb from "@/components/BreadCrumb";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { engCategoryToPersian } from "@/utils";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState, memo } from "react";
import { categories, productDataTypes } from "@/global.t";
import { HiOutlineInformationCircle } from "react-icons/hi"
import connectToDB from "@/config/db";
import ProductModel from "@/models/Product";
import { useAppDispatch, useAppSelector } from "@/Hooks/useRedux";
import { loadMoreUpdater } from "@/Redux/Features/globalVarsSlice";
import InfiniteScroll from "@/components/InfiniteScroll";

interface Props {
    product: productDataTypes[]
    allProductsCount: number
}

const Category = ({ product, allProductsCount }: Props) => {

    const [products, setProducts] = useState<productDataTypes[]>(product || [])
    const shouldLoadMoreProduct = useAppSelector(state => state.globalVarsSlice.loadMore)
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1)
    const { filter, category } = router.query || {}
    const dispatch = useAppDispatch()

    const [allOfProductsLoaded, setAllOfProductsLoaded] = useState(false)

    const breadCrumbData = [
        { text: "دسته بندی ها", link: `/products/category/${category}` },
        { text: `${engCategoryToPersian((router.query?.slug?.length ? router.query?.slug[0] : 'accessory') as categories)}` }
    ]

    const loadMoreProduct = useCallback(async () => {

        if (product?.length && product.length <= 4) {
            setAllOfProductsLoaded(true)
            dispatch(loadMoreUpdater(false))
            return
        }

        if (allOfProductsLoaded || !product?.length) return

        const filterBy = router.query?.slug?.length && router.query.slug[1]

        const res = await fetch(`/api/products/${!!filterBy ? 'getByFilter' : 'get'}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                category: router.query?.slug?.length && router.query?.slug[0],
                filterBy,
                currentPage
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
            setProducts([...currentProducts])

            setCurrentPage(Math.ceil(currentProducts.length / 12))
        }

    }, [router.query?.slug, dispatch, products, allOfProductsLoaded])

    useEffect(() => { shouldLoadMoreProduct && loadMoreProduct() }, [shouldLoadMoreProduct, loadMoreProduct, router.query?.slug])

    useEffect(() => {
        if (product?.length) {
            setProducts(product)
            if (product.length <= 4) loadMoreProduct() // check if we can load more product or show the 'you see all the products' message
        }
        return () => { setAllOfProductsLoaded(false), setCurrentPage(1) }
    }, [product])

    useEffect(() => {

        if (!filter || !filter.toString().trim().length || shouldLoadMoreProduct) return

        const filteredItems = [...product].filter(item => {
            switch (filter) {
                case 'affordable': { return item.price < 15_000_000 }
                case 'gaming': { return item.price > 32_000_000 }
                case 'student': { return item.price > 25_000_000 }
                case 'rendering': { return item.price > 42_000_000 }
                case 'office': { return item.price > 15_000_000 }
                default: { return }
            }
        })

        if (!filteredItems.length) router.replace('/404')

        setProducts(filteredItems)

    }, [filter, product, router.asPath, shouldLoadMoreProduct])

    return (

        <section className={"bg-primary primary-bg"}>

            <Header />

            <div className={"space-y-6 container"}>

                <BreadCrumb path={breadCrumbData} />

                <BlockTitle title={`${allProductsCount || 0} کالا`} Icon={<HiOutlineInformationCircle className="p-[6px]" />} />

                <InfiniteScroll itemsArray={products} showLoader={allOfProductsLoaded} />

            </div>

            <div className={'h-44'}></div>

            <Footer />

        </section>
    );
}

export default memo(Category);

export async function getStaticProps(context: GetStaticPropsContext) {

    const query = context.params
    const category = query?.slug?.length ? query.slug[0] : ''
    const filterBySubCategory = query?.slug?.length ? query.slug[1] : ''

    try {

        const isCategoryValid = ['accessory', 'pc', 'parts', 'laptop', 'console'].find(cat => cat == category)
        if (!isCategoryValid?.length) return { notFound: true } // In case user manually change the route with wrong category name.

        await connectToDB()
        let allProductsCount: number
        let product: productDataTypes[] = []

        if (!!filterBySubCategory) {

            const filterProductsWithCategoryAndSubMenu = [...product, ...await ProductModel.find({ category, ['sub-cat']: filterBySubCategory }).skip(0).limit(12)]
            if (filterProductsWithCategoryAndSubMenu.length) {
                allProductsCount = await ProductModel.countDocuments({ category, ['sub-cat']: filterBySubCategory })
                product = filterProductsWithCategoryAndSubMenu
            } else {
                const regexPattern = new RegExp(`.*${filterBySubCategory}.*`, 'i');
                product = [...product, ...await ProductModel.find({ category, name: { $regex: regexPattern } }).skip(0).limit(12)]
                allProductsCount = await ProductModel.countDocuments({ category, name: { $regex: regexPattern } })
            }

        } else {
            allProductsCount = await ProductModel.countDocuments({ category })
            product = await ProductModel.find({ category }).limit(12)
        }

        return {
            props: {
                product: JSON.parse(JSON.stringify(product)),
                allProductsCount
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