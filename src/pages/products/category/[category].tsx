import BlockTitle from "@/components/BlockTitle";
import BreadCrumb from "@/components/BreadCrumb";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { engCategoryToPersian } from "@/utils";
import { GetStaticPropsContext } from "next";
import { BsSortDown } from "react-icons/bs";
import { HiOutlineClipboardList } from "react-icons/hi";
import { productSortOptions } from "@/data";
import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";


const Category = ({ product }: any) => {

    const [sortBy, setSortBy] = useState('')

    const breadCrumbData = [
        { text: "دسته بندی ها", link: `/category` },
        { text: `${engCategoryToPersian(product[0].category)}` }
    ]

    const sortOptions = [...productSortOptions].map(opt => (
        <li
            className={`cursor-pointer transition-all ${sortBy === opt.sort && "text-white-red"}`}
            key={opt.sort}
            onClick={() => { opt.sort == sortBy ? setSortBy('') : setSortBy(opt.sort) }}
        >
            {opt.text}
        </li>
    ))

    useEffect(() => { setSortBy('') }, [product]) // reset the sorts after navigating between categories

    return (

        <section className={"bg-primary primary-bg"}>

            <Header />

            <div className={"space-y-6 container"}>

                <BreadCrumb path={breadCrumbData} />

                <BlockTitle title={`قیمت لپ تاپ`} Icon={<HiOutlineClipboardList className="p-[6px]" />} />

                <div className="flex flex-col">

                    <div className="text-[11px] flex justify-between overflow-auto gap-6 items-center rounded-md p-3 bg-secondary-black">

                        <div className="flex items-center gap-5">

                            <div className="flex items-center flex-nowrap gap-2 text-white">
                                <BsSortDown className="size-6" />
                                <p>مرتب سازی : </p>
                            </div>

                            <ul className="flex items-center text-description-text gap-6 select-none">{sortOptions}</ul>

                        </div>

                        <div className="text-white hidden sm:block text-[13px]">{product.length} کالا</div>

                    </div>

                    <Pagination sortType={sortBy} itemsArray={product} />

                </div>


            </div>

            <div className="h-12"></div>

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