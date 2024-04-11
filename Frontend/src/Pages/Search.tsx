import Header from "../components/Header.tsx";
import {FaAngleLeft} from "react-icons/fa";
import BlockTitle from "../components/BlockTitle.tsx";
import Footer from "../components/Footer.tsx";
import {GrFormSearch} from "react-icons/gr";
import Product from "../components/Product.tsx";
import Button from "../components/Button.tsx";
import {useNavigate} from "react-router-dom";

const Search = () => {

    const navigate = useNavigate()

    return (

        <section className={"bg-primary primary-bg"}>

            <Header/>
            <span className='md:pt-[160px] pt-[130px] block'></span>

            <div className={"space-y-6 container"}>

                <div
                    className="bg-secondary-black text-nowrap rounded-md gap-2 overflow-auto container p-3 flex items-center mb-4 text-[12px] ch:ch:size-4 text-description-text">
                    <div className="flex items-center gap-2">خانه‌<FaAngleLeft/></div>
                    <div className="flex items-center gap-2">لپتاپ <FaAngleLeft/></div>
                    <div className="flex items-center gap-2">lenovo v15<FaAngleLeft/></div>
                    <div className="flex items-center gap-2"> لپ تاپ ایسوس ROG Strix SCAR G834JY-AC
                        i9-13980HX/32GB/2TB/RTX4090-16G
                    </div>
                </div>

                <BlockTitle title={`جستوجو برای ${"we"}`} Icon={<GrFormSearch/>}/>

                {
                    "" ?
                        <div className={"grid grid-cols-4 gap-4 mt-6"}>

                            {
                                [2, 23, 4, 3].map(prd => <Product key={prd}/>)
                            }
                        </div>
                        :
                        <div
                            className={"flex items-center justify-between p-3 bg-secondary-black text-center rounded-md mt-6 text-[16px] text-white-red"}>
                            <div
                            >نتیجه
                                ای برای {'" blabla "'} یافت نشد
                            </div>
                            <Button text={"بازگشت"} fn={() => navigate("/")}/>
                        </div>
                }

                <div className={"h-60"}></div>
                <Footer/>
            </div>
        </section>
    );
};

export default Search;