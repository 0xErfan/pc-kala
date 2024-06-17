import Header from "@/components/Header";
import BlockTitle from "@/components/BlockTitle";
import Footer from "@/components/Footer";
import { GrFormSearch } from "react-icons/gr";
import Button from "@/components/Button";
import BreadCrumb from "@/components/BreadCrumb";
import { useRouter } from "next/router";
import { GetStaticPropsContext } from "next";
import ProductModel from "@/models/Product";
import connectToDB from "@/config/db";
import { productDataTypes } from "@/global.t";
import InfiniteScroll from "@/components/InfiniteScroll";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Hooks/useRedux";
import { loadMoreUpdater } from "@/Redux/Features/globalVarsSlice";

const Search = ({ product }: { product: productDataTypes[] }) => {

    const [products, setProducts] = useState<productDataTypes[]>(product || [])
    const navigate = useRouter()
    const params = navigate.query
    const shouldLoadMoreProduct = useAppSelector(state => state.globalVarsSlice.loadMore)
    const [allOfProductsLoaded, setAllOfProductsLoaded] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const router = useRouter()
    const dispatch = useAppDispatch()

    const loadMoreProduct = useCallback(async () => {

        if (allOfProductsLoaded) return

        const res = await fetch('/api/products/globalSearch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: router.query?.text,
                currentPage: currentPage + 1
            })
        })

        console.log(`form page ${currentPage}, we update`)

        const { products: updatedProducts } = await res.json()

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

    }, [currentPage, allOfProductsLoaded, products, dispatch])

    useEffect(() => { shouldLoadMoreProduct && loadMoreProduct() }, [shouldLoadMoreProduct, loadMoreProduct, router.query?.text])

    useEffect(() => { setCurrentPage(1) }, [router.query?.text]) // reset currentPage and load state when text param changes

    useEffect(() => { product?.length && setProducts(product) }, [product])

    const breadCrumbData = [
        { text: "جستجو", link: `/search/${params?.text}` },
        { text: `${params.text}`, link: `/search/${params?.text}` }
    ]

    return (

        <section className={"bg-primary primary-bg"}>

            <Header />

            <div className={"space-y-6 container"}>

                <BreadCrumb path={breadCrumbData} />

                <BlockTitle title={`جستوجو برای ${params.text}`} Icon={<GrFormSearch />} />

                {
                    products?.length ?
                        <InfiniteScroll itemsArray={products} showLoader={allOfProductsLoaded} />
                        :
                        <div
                            className={"flex items-center justify-between p-3 bg-secondary-black text-center rounded-md mt-6 text-[16px] text-white-red"}>
                            <div>نتیجه ای برای  {`" ${params.text} "`} یافت نشد </div>
                            <Button text={"بازگشت"} fn={() => navigate.replace("/")} />
                        </div>
                }

                <div className={"h-44"}></div>
            </div>

            <Footer />
        </section>
    );
};

export default Search;

export async function getStaticProps(context: GetStaticPropsContext) {

    try {

        await connectToDB()

        const text = context.params?.text
        const allProducts = await ProductModel.find({})

        const matchedProducts = [...allProducts]
            .filter(product =>
                product.name?.toLowerCase().includes(text)
                ||
                product.category?.toLowerCase().includes(text)
            )
            .concat([...allProducts] // search in the product spec values for filtering
                .map((product: productDataTypes) => Object.values(product.specs)
                    .some(spec => spec?.value.toString().toLowerCase().includes(text as string)) ? product : null)
                .filter(Boolean));

        const matchedProductsWithoutRepeatedProducts = [...new Set(matchedProducts)].slice(0, 12)

        return {
            props: {
                product: JSON.parse(JSON.stringify(matchedProductsWithoutRepeatedProducts))
            }
        }

    } catch (err) {
        console.log('globalSearch page error -> ', err)
        return { notFound: true }
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking',
    };
}