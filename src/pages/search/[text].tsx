import Header from "@/components/Header";
import BlockTitle from "@/components/BlockTitle";
import Footer from "@/components/Footer";
import { GrFormSearch } from "react-icons/gr";
import Button from "@/components/Button";
import BreadCrumb from "@/components/BreadCrumb";
import { useRouter } from "next/router";
import { GetStaticPropsContext } from "next";
import Pagination from "@/components/Pagination";
import ProductModel from "@/models/Product";
import connectToDB from "@/config/db";
import { productDataTypes } from "@/global.t";

const Search = ({ products }: { products: [] }) => {

    const navigate = useRouter()
    const params = navigate.query

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
                        <Pagination itemsArray={products} />
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
                product.name?.toLowerCase().includes(text) ||
                product.category?.toLowerCase().includes(text)
            )
            .concat([...allProducts] // just search in the product spec values for filtering
                .map((product: productDataTypes) => Object.values(product.specs)
                    .some(spec => spec?.value.toString().toLowerCase().includes(text as string)) ? product : null)
                .filter(Boolean));

        const matchedProductsWithoutRepeatedProducts = [...new Set(matchedProducts)]

        return {
            props: {
                products: JSON.parse(JSON.stringify(matchedProductsWithoutRepeatedProducts))
            }
        }

    } catch (err) {
        console.log(err)
        return { props: { products: [] } }
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking',
    };
}