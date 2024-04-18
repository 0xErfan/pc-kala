import Header from "../components/Header.tsx";
import BlockTitle from "../components/BlockTitle.tsx";
import Footer from "../components/Footer.tsx";
import { GrFormSearch } from "react-icons/gr";
import Product from "../components/Product.tsx";
import Button from "../components/Button.tsx";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb.tsx";

const Search = () => {

    const navigate = useNavigate()
    const params = useParams()

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
                    "" ?
                        <div className={"grid grid-cols-4 gap-4 mt-6"}>

                            {
                                [2, 23, 4, 3].map(prd => <Product key={prd} />)
                            }
                        </div>
                        :
                        <div
                            className={"flex items-center justify-between p-3 bg-secondary-black text-center rounded-md mt-6 text-[16px] text-white-red"}>
                            <div
                            >نتیجه
                                ای برای {`" ${params.text} "`} یافت نشد
                            </div>
                            <Button text={"بازگشت"} fn={() => navigate("/")} />
                        </div>
                }

                <div className={"h-60"}></div>
            </div>
            
            <Footer />
        </section>
    );
};

export default Search;