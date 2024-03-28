
import Header from "../components/Header";
import Button from "../components/Button";
import BlockTitle from "../components/BlockTitle";
import Product from "../components/Product";
import { FaComputer } from "react-icons/fa6";
import { BsLaptop } from 'react-icons/bs'
import { CiDiscount1 } from "react-icons/ci";
import { AiOutlinePartition } from "react-icons/ai";
import { BsCpu } from "react-icons/bs";
import "../styles/output.css"
import { SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Slider from "../components/Slider";
import Footer from "../components/Footer";


export default function Home() {

    return (
        <section className="primary-bg" >
            <div className="overlay"></div>
            <Header />

            <div className="container flex ch:flex-1 gap-8 my-12">
                <div className="">
                    <h3 className="thin-title mt-4" >بهترین قیمت</h3>
                    <h5 className="bold-title text-[52px]">خرید انواع لپ تاپ</h5>
                    <p className="thin-title">خرید انواع برندهای لپ تاپ با بهترین قیمت روز بازار ایران در سایت پی سی کالا، تنوع بی نظیر در انواع مدلها و سری های بازار با انواع کانفیگ های مورد نیاز کاربران که در هیچ وب سایت دیگری یافت نخواهید کرد. هر نوع کانفیگ از حافظه رم متنوع تا حافظه ذخیره سازی، گرافیک و صفحه نمایش برای تمام سری های محبوب لپ تاپ های روز دنیای در سایت پی سی کالا موجود می باشد. هر نیازی که در خصوص خرید لپ تاپ دارید بی تردید در سایت ما با بهترین قیمت به دست خواهید آورد.</p>
                    <div className="flex items-center justify-end mt-3"><Button Icon={<BsLaptop />} filled={true} fn={() => alert("hi")} text="خرید قسطی لپ تاپ و کامپیوتر" /></div>
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

            <div className="container flex ch:flex-1 gap-8 mt-36 mb-24">
                <div><img className="max-h-[480px] m-auto h-full  w-[200px] " src="/images/home/case.webp" alt="pc-kala" /></div>
                <div>
                    <h3 className="thin-title mt-4" >تنوع فوق العاده</h3>
                    <h5 className="bold-title text-[60px]">خرید کامپیوتـر</h5>
                    <p className="thin-title">اگر به دنبال خرید پی سی یا کامپیوتر با کانفیگ مورد نظر خودت هستی و یا اینکه انتخاب قطعات در کنار هم برایت دشوار است، کافیست به فروشگاه بی نظیر کامپیوتر های اسمبل شده پی سی کالا سر بزنی. تنوع فوق العاده در انتخاب براساس نوع کاربری. از کامپیوتر های گیمینگ مخصوص گیمرهای دوست داشتنی گرفته تا کامپیوتر های مخصوص فعالیت های خانگی و دانش آموزی. قدرت ما در انتخاب مناسب ترین قطعات به همراه ضمانت و قیمت فوق العاده می باشد. کافیه به فروشگاه کامپیوتر ما یه سری بزنی!</p>
                    <div className="mt-3"><Button filled={true} Icon={<FaComputer />} fn={() => alert("hi")} text="قیمت و خرید کامپیوتر" /></div>
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

            <div className="container flex ch:flex-1 gap-8 mt-36 mb-24">
                <div className="px-[29px]">
                    <h3 className="thin-title mt-4" >انتخاب هوشمندانه</h3>
                    <h5 className="bold-title text-[42px]">خرید اقساطی کامپیوتر و لپ تاپ</h5>
                    <p className="thin-title">قطعاً در شرایط اقتصاد کنونی خرید لپ تاپ و یا کامپیوتر به صورت نقد کاری دشوار می باشد. البته شرکت ها و رابط های بسیاری این چندسال رشد کرده اند که به صورت اقساطی محصولات را به فروش می رسانند. بخش فروش اقساطی پی سی کالا کاملاً حقیقی و برای خرید صد در صد بدون هرگونه مشکلی ایجاد شده است. شما عزیزان کافیست برای خرید قسطی لپ تاپ و یا کامپیوتر درخواست خود را ارسال نمایید. تیم حرفه ای پی سی کالا تمام مراحل را با شما هماهنگ کرده و تمام تلاش خود را می کند تا بتوانید محصول مورد نیاز را در کمترین زمان خریداری کنید.</p>
                    <div className="flex items-center justify-end mt-3"><Button Icon={<CiDiscount1 />} filled={true} fn={() => alert("hi")} text="خرید قسطی لپ تاپ و کامپیوتر" /></div>
                </div>
                <div className=" ch:mr-auto h-[481px]"><img className="max-w-[500px] object-cover" src="/images/home/ghesti.webp" alt="pc-kala" /></div>
            </div>

            <div className="container flex ch:flex-1 gap-8 mt-36 mb-24">
                <div><img className="m-auto h-[600px] w-[500px]" src="/images/home/parts.webp" alt="pc-kala" /></div>
                <div className="flex flex-col justify-center">
                    <h3 className="thin-title mt-4" >قدرت در دستان توست!</h3>
                    <h5 className="bold-title text-[39px]">خرید انواع قطعات و لوازم جانبی</h5>
                    <p className="thin-title">خرید انواع قطعات کامپیوتر و لوازم جانبی آن مانند کارت گرافیک، پردازنده مرکزی، حافظه رم، خافظه ذخیره سازی، منبع تغذیه، کیس و … . تمامی قطعات ارائه شده در سایت پی سی کالا دارای گارانتی معتبر می باشد. از مهمترین ویژگی های محصولات ما قیمت فوق العاده به نسبت بازار ایران است. بنابراین با خیال راحت می توانید هر قطعه ای را که نیاز داشتید در بین تنوع بسیار بالای فروشگاه قطعات ما بیابید و خریداری کنید.</p>
                    <div className="flex items-center justify-end mt-3"><Button filled={true} Icon={<AiOutlinePartition />} fn={() => alert("hi")} text="فروشگاه قطعات و لوازم جانبی" /></div>
                </div>
            </div>

            <div className="my-12">
                <BlockTitle Icon={<BsCpu className="p-1" />} title="پرفروش ترین ها" url="/" />
                <Slider>
                    {
                        [1, 3, 4, 54, 6].map(prd => <SwiperSlide key={prd}><Product /></SwiperSlide>)
                    }
                </Slider>
            </div>

            <section>
                <img className="m-auto pt-[130px]" src="/images/home/pckala.webp" alt="pc-kala-logo" />
                <div className="flex items-center justify-center gap-24 mt-8">
                    <img src="/images/home/cup-1.webp" />
                    <img src="/images/home/cup-2.webp" />
                    <img src="/images/home/cup-3.webp" />
                    <img src="/images/home/cup-4.webp" />
                    <img src="/images/home/cup-5.webp" />
                </div>
            </section>

            <section className=" mt-24 container relative h-[700px]">
                <h3 className="bold-title text-[40px] text-center">برترین متخصصین کشور</h3>
                <img src="/images/home/wave-red.webp" className=" absolute left-60 top-44 w-[400px] h-[450px]"></img>
                <div className="px-60">
                    <p className="text-description-text py-1 text-center text-sm leading-[31px]">برترین متخصصین را گرد هم اورده ایم تا بهترین را برای شما به ارمغان آوریم. وب سایت پیسی کالا که یکی از زیرحجموعه های گروه مهندسی لعل فام میباشد. متشکل از برترین کارشناسان جوزه تکنولوژی و فروش از بین جوانان میهنمان می باشد. هدف ما در این رقابت قدرت کسب رضایت حداکثری شما مشتریان گرامی است. هر روز و هر لحظه به دنبال خلق ایده های نو و ارايه خدمات با بهترین کیفیت به شما هستیم.</p>
                    <p className="text-white text-3xl font-bold text-start mt-12">تماس با ما</p>
                    <p className="bold-title text-[40px]">سریع ترین راه ارتباطی</p>
                    <p className="text-[90px] text-white">۰۲۱-۱۲۳۴۵۶۷۸۹</p>
                    <p className="bold-title text-[40px]">۰۳۱-۹۸۷۶۵۴۳۲۱</p>
                </div>
            </section>

            <Footer />
        </section>
    )
}