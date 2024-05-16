import BlockTitle from "@/components/BlockTitle";
import BreadCrumb from "@/components/BreadCrumb";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { engCategoryToPersian } from "@/utils";
import { GetStaticPropsContext } from "next";
import { HiOutlineClipboardList } from "react-icons/hi";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const Category = ({ product }: any) => {

    const [products, setProducts] = useState([...product])

    const router = useRouter()

    const breadCrumbData = [
        { text: "دسته بندی ها", link: `/category` },
        { text: `${engCategoryToPersian(product[0].category)}` }
    ]

    useEffect(() => { setProducts(product) }, [product])

    const { filter, category } = router.query || {}

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
                default: { return item["sub-cat"]?.toLowerCase() == filter || item.name.toLowerCase().includes(filter) }
            }
        })

        if (!filteredItems.length) { location.href = pathnameWithoutFilter }

        setProducts(filteredItems)

    }, [filter, product])

    return (

        <section className={"bg-primary primary-bg"}>

            <Header />

            <div className={"space-y-6 container"}>

                <BreadCrumb path={breadCrumbData} />

                <BlockTitle title={`قیمت لپ تاپ`} Icon={<HiOutlineClipboardList className="p-[6px]" />} />

                <Pagination itemsArray={filter ? products as [] : product} />

            </div>

            <div className={`${products.length ? 'h-12' : 'h-48'}`}></div>

            <Footer />

        </section>
    );
}

export default Category;

export async function getStaticProps(context: GetStaticPropsContext) {

    const query = context.params

    try {

        const response = await fetch(`http://localhost:3000/api/products/category/${query?.category}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(query?.category)
        });

        if (!response.ok) throw new Error('Failed to fetch product')

        const product = await response.json();

        return { props: { product } };

    } catch (error) {
        console.error('Error fetching product:', error);
        return { notFound: true }
    }
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { category: 'laptop' } },
            { params: { category: 'parts' } },
            { params: { category: 'accessory' } },
            { params: { category: 'pc' } },
            { params: { category: 'console' } }
        ],
        fallback: false,
    };
}