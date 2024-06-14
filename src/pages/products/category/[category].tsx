import BlockTitle from "@/components/BlockTitle";
import BreadCrumb from "@/components/BreadCrumb";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { engCategoryToPersian } from "@/utils";
import { GetStaticPropsContext } from "next";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { categories, productDataTypes } from "@/global.t";
import { HiOutlineInformationCircle } from "react-icons/hi"
import { HiOutlineClipboardList } from "react-icons/hi";

const Category = ({ product }: { product: productDataTypes[] }) => {

    const [products, setProducts] = useState<productDataTypes[]>(product || [])

    const router = useRouter()

    const { filter, category } = router.query || {}

    const breadCrumbData = [
        { text: "دسته بندی ها", link: `/products/category/${category}` },
        { text: `${engCategoryToPersian(category as categories)}` }
    ]

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

        if (!filteredItems.length) { location.href = pathnameWithoutFilter }

        setProducts(filteredItems)

    }, [filter, product])

    return (

        <section className={"bg-primary primary-bg"}>

            <Header />

            {
                !product?.length && <div></div>
            }

            <div className={"space-y-6 container"}>

                <BreadCrumb path={breadCrumbData} />

                <BlockTitle title={`${products?.length} کالا`} Icon={<HiOutlineInformationCircle className="p-[6px]" />} />

                <Pagination itemsArray={filter ? products! : product || []} />

            </div>

            <div className={`${products?.length ? 'h-12' : 'h-48'}`}></div>

            <Footer />

        </section>
    );
}

export default Category;

export async function getStaticProps(context: GetStaticPropsContext) {

    const query = context.params

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/products/category`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: query?.category })
        })

        if (!response.ok) throw new Error('Failed to fetch product')

        const { product } = await response.json();

        return { props: { product: JSON.parse(JSON.stringify(product)) } };

    } catch (error) {
        console.error('Error fetching product:', error);
        return { notFound: true }
    }
}

export async function getStaticPaths() {
    return {
        paths: [
            // { params: { category: 'laptop' } },
            // { params: { category: 'parts' } },
            // { params: { category: 'accessory' } },
            // { params: { category: 'pc' } },
            // { params: { category: 'console' } }
        ],
        fallback: true,
    };
}