import Header from "@/components/Header";
import BlockTitle from "@/components/BlockTitle";
import Footer from "@/components/Footer";
import { GrFormSearch } from "react-icons/gr";
import Product from "@/components/Product";
import Button from "@/components/Button";
import BreadCrumb from "@/components/BreadCrumb";
import { useRouter } from "next/router";
import { GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";

const Search = ({ products }) => {

    const navigate = useRouter()
    const params = navigate.query

    console.log(products)

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
                    products.length ?
                        <div className={"grid grid-cols-4 gap-4 mt-6"}>

                            {
                                [...products].map(prd => <Product key={prd._id} {...prd} />)
                            }
                        </div>
                        :
                        <div
                            className={"flex items-center justify-between p-3 bg-secondary-black text-center rounded-md mt-6 text-[16px] text-white-red"}>
                            <div
                            >نتیجه
                                ای برای {`" ${params.text} "`} یافت نشد
                            </div>
                            <Button text={"بازگشت"} fn={() => navigate.replace("/")} />
                        </div>
                }

                <div className={"h-60"}></div>
            </div>

            <Footer />
        </section>
    );
};

export default Search;

export async function getStaticProps(context: GetStaticPropsContext) {

    try {

        const { text }: any = context.params

        console.log(text)

        const response = await fetch(`http://localhost:3000/api/products/globalSearch/${text}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });

        if (!response.ok) throw new Error('Failed to fetch product')

        const products = await response.json();

        return { props: { products } };

    } catch (error) {
        console.error('Error fetching product:', error);
        return { notFound: true }
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking',
    };
}