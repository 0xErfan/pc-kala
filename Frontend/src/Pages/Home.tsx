
import Header from "../components/Header";
import Button from "../components/Button";
import BlockTitle from "../components/BlockTitle";
import Product from "../components/Product";
import { FaComputer } from "react-icons/fa6";
import { BsLaptop } from 'react-icons/bs'
import "../styles/output.css"
import { SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Slider from "../components/Slider";


export default function Home() {

    return (
        <section className="primary-bg" >
            <Header />

            <div className="container flex ch:flex-1 gap-8 my-12">
                <div className="">
                    <h3 className="thin-title mt-4" >بهترین قیمت</h3>
                    <h5 className="bold-title">خرید انواع لپ تاپ</h5>
                    <p className="thin-title">خرید انواع برندهای لپ تاپ با بهترین قیمت روز بازار ایران در سایت پی سی کالا، تنوع بی نظیر در انواع مدلها و سری های بازار با انواع کانفیگ های مورد نیاز کاربران که در هیچ وب سایت دیگری یافت نخواهید کرد. هر نوع کانفیگ از حافظه رم متنوع تا حافظه ذخیره سازی، گرافیک و صفحه نمایش برای تمام سری های محبوب لپ تاپ های روز دنیای در سایت پی سی کالا موجود می باشد. هر نیازی که در خصوص خرید لپ تاپ دارید بی تردید در سایت ما با بهترین قیمت به دست خواهید آورد.</p>
                    <div className="flex items-center justify-end mt-3"><Button filled={true} fn={() => alert("hi")} text="خرید قسطی لپ تاپ و کامپیوتر" /></div>
                </div>
                <div><img className="w-full h-full object-cover" src="/images/home/laptop.webp" alt="pc-kala" /></div>
            </div>

            <div className="my-12">
                <BlockTitle Icon={<BsLaptop />} title="پرفروش ترین ها" url="/" />
                <Slider>
                    {
                        [1, 3, 4, 54, 6].map(prd => <SwiperSlide key={prd}><Product /></SwiperSlide>)
                    }
                </Slider>
            </div>

            <div className="container flex ch:flex-1 gap-8 my-36">
                <div className="m-auto"><img className="max-h-[480px] m-auto h-full  w-[200px] " src="/images/home/case.webp" alt="pc-kala" /></div>
                <div>
                    <h3 className="thin-title mt-4" >تنوع فوق العاده</h3>
                    <h5 className="bold-title">خرید کامپیوتـر</h5>
                    <p className="thin-title">اگر به دنبال خرید پی سی یا کامپیوتر با کانفیگ مورد نظر خودت هستی و یا اینکه انتخاب قطعات در کنار هم برایت دشوار است، کافیست به فروشگاه بی نظیر کامپیوتر های اسمبل شده پی سی کالا سر بزنی. تنوع فوق العاده در انتخاب براساس نوع کاربری. از کامپیوتر های گیمینگ مخصوص گیمرهای دوست داشتنی گرفته تا کامپیوتر های مخصوص فعالیت های خانگی و دانش آموزی. قدرت ما در انتخاب مناسب ترین قطعات به همراه ضمانت و قیمت فوق العاده می باشد. کافیه به فروشگاه کامپیوتر ما یه سری بزنی!</p>
                    <div className="flex items-center gap-4 mt-8">
                        <Button filled={true} fn={() => alert("hi")} text="سیستم گیمینگ" />
                        <Button filled={false} fn={() => alert("hi")} text="سیستم رندرینگ" />
                        <Button filled={true} fn={() => alert("hi")} text="کامپیوتر دانشجویی" />
                    </div>
                </div>
            </div>

            <div className="my-12">
                <BlockTitle title="پرفروش ترین ها" url="/" Icon={<FaComputer />} />
                <Slider>
                    {
                        [1, 3, 4, 54, 6].map(prd => <SwiperSlide key={prd}><Product /></SwiperSlide>)
                    }
                </Slider>
            </div>

            <div className="h-[4000px]"></div>
        </section>
    )
}