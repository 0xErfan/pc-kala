import BlockTitle from "../components/BlockTitle";
import BreadCrumb from "../components/BreadCrumb";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { BsSortDown } from "react-icons/bs";
import { HiOutlineClipboardList } from "react-icons/hi";
import Product from "../components/Product";
import { useState } from "react";

const ProductCategory = () => {

    const [productSort, setProductSort] = useState("")

    const breadCrumbData = [
        { text: "دسته بندی ها", link: `/` },
        { text: `لبتاب`, link: `/search` }
    ]


    const productsToShow = [...productSortOptions].map(opt => (
        <li
            className={`cursor-pointer transition-all ${productSort === opt.sort && "text-white-red"}`}
            key={opt.sort}
            onClick={() => setProductSort(opt.sort)}
        >
            {opt.text}
        </li>
    ))

    return (

        <section className={"bg-primary primary-bg"}>

            <Header />

            <div className={"space-y-6 container"}>

                <BreadCrumb path={breadCrumbData} />

                <BlockTitle title={`قیمت لپ تاپ`} Icon={<HiOutlineClipboardList className="p-[6px]" />} />

                <div className="flex flex-col">
                    <div className="text-[11px] flex justify-between gap-6 items-center rounded-md p-3 bg-secondary-black">
                        <div className="flex items-center gap-5">
                            <div className="flex items-center gap-2 text-white">
                                <BsSortDown className="size-6"/>
                                <p>مرتب سازی : </p>
                            </div>
                            <ul className="flex items-center text-description-text gap-6 select-none">
                                {productsToShow}
                            </ul>
                        </div>
                        <div className="text-white text-[13px]">{23} کالا</div>
                    </div>
                    <div className={"grid grid-cols-4 gap-4 mt-6"}>{[2, 23, 41, 3, 34, 64, 14, 4, 5, 44, 1].map(prd => <Product key={prd} />)}</div>
                </div>

                <div className={"h-60"}></div>
            </div>

            <Footer />

        </section>
    );
}

const productSortOptions = [
    { text: "ارزان‌ترین", sort: "cheap" },
    { text: "گران‌ترین", sort: "exp" },
    { text: "پربازدیدترین", sort: "view" },
    { text: "پرفروش‌ترین‌", sort: "well-sell" },
]

export default ProductCategory