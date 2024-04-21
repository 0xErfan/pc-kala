import 'swiper/css';
import 'swiper/css/pagination';
import 'izitoast/dist/css/iziToast.min.css'

import Button from "../components/Button";
import BlockTitle from "../components/BlockTitle";
import Product from "../components/Product";
import { FaComputer } from "react-icons/fa6";
import { BsLaptop } from 'react-icons/bs'
import { CiDiscount1 } from "react-icons/ci";
import { AiOutlinePartition } from "react-icons/ai";
import { BsCpu } from "react-icons/bs";
import { SwiperSlide } from 'swiper/react';
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchData, showToast } from '../utils';
import iziToast from 'izitoast';

export default function Home() {

    const navigate = useNavigate()

    // const products = useAppSelector(state => state.productsSlice.allProducts)

    useEffect(() => {

        (async () => {
            const posts = await fetchData('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST', body: {
                    title: 'foo',
                    body: 'bar',
                    userId: 1,
                }
            })
            console.log(posts)
            showToast(true, 'سلام ممو')
        })()

    }, [])


    return (

        <section className="primary-bg overflow-x-hidden font-sans">

            <Header />

            <span className='pt-[80px] block'></span>
            <div className="overlay"></div>

            <div className="container flex-col-reverse lg:flex-row flex ch:flex-1 gap-8 my-12">
                <div data-aos-duration="550" data-aos="zoom-in">

                    <h3 className="thin-title mt-4">بهترین قیمت</h3>
                    <h5 className="bold-title text-[40px] md:text-[52px]">خرید انواع لپ تاپ</h5>
                    <p className="thin-title">خرید انواع برندهای لپ تاپ با بهترین قیمت روز بازار ایران در سایت پی سی
                        کالا، تنوع بی نظیر در انواع مدلها و سری های بازار با انواع کانفیگ های مورد نیاز کاربران که در
                        هیچ وب سایت دیگری یافت نخواهید کرد. هر نوع کانفیگ از حافظه رم متنوع تا حافظه ذخیره سازی، گرافیک
                        و صفحه نمایش برای تمام سری های محبوب لپ تاپ های روز دنیای در سایت پی سی کالا موجود می باشد. هر
                        نیازی که در خصوص خرید لپ تاپ دارید بی تردید در سایت ما با بهترین قیمت به دست خواهید آورد.</p>
                    <div className="flex items-center justify-end mt-3"><Button Icon={<BsLaptop />} filled={true}
                        fn={() => navigate("/category/laptop")}
                        text="خرید قسطی لپ تاپ و کامپیوتر" />
                    </div>
                </div>
                <div data-aos-duration="550" data-aos="zoom-in"><img className="w-full h-full object-cover"
                    src="/images/home/laptop.webp" alt="pc-kala" />
                </div>
            </div>

            <div className="my-12">
                <BlockTitle Icon={<BsLaptop />} title="پرفروش ترین ها" url="/" />
                <Slider>
                    {
                        [1, 3, 4, 54, 6].map(prd => <SwiperSlide key={prd}><Product /></SwiperSlide>)
                    }
                </Slider>
            </div>

            <div className="container flex-col lg:flex-row flex ch:flex-1 gap-8 mt-36 mb-24">
                <div data-aos-duration="550" data-aos="zoom-in"><img className="max-h-[480px] m-auto h-full  w-[200px] "
                    src="/images/home/case.webp" alt="pc-kala" /></div>
                <div data-aos-duration="550" data-aos="zoom-in">
                    <h3 className="thin-title mt-4">تنوع فوق العاده</h3>
                    <h5 className="bold-title text-[45px] md:text-[60px]">خرید کامپیوتـر</h5>
                    <p className="thin-title">اگر به دنبال خرید پی سی یا کامپیوتر با کانفیگ مورد نظر خودت هستی و یا
                        اینکه انتخاب قطعات در کنار هم برایت دشوار است، کافیست به فروشگاه بی نظیر کامپیوتر های اسمبل شده
                        پی سی کالا سر بزنی. تنوع فوق العاده در انتخاب براساس نوع کاربری. از کامپیوتر های گیمینگ مخصوص
                        گیمرهای دوست داشتنی گرفته تا کامپیوتر های مخصوص فعالیت های خانگی و دانش آموزی. قدرت ما در انتخاب
                        مناسب ترین قطعات به همراه ضمانت و قیمت فوق العاده می باشد. کافیه به فروشگاه کامپیوتر ما یه سری
                        بزنی!</p>
                    <div className="mt-3"><Button filled={true} Icon={<FaComputer />} fn={() => alert("hi")}
                        text="قیمت و خرید کامپیوتر" /></div>
                    <div className="flex items-center gap-4 mt-8">
                        <Button filled={true} fn={() => navigate("/products/gaming")} text="سیستم گیمینگ" />
                        <Button filled={false} fn={() => navigate("/products/rendering")} text="سیستم رندرینگ" />
                        <Button filled={true} fn={() => navigate("/products/students")} text="کامپیوتر دانشجویی" />
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

            <div className="container flex-col-reverse lg:flex-row flex ch:flex-1 gap-8 lg:gap-3 mt-36 mb-24">
                <div data-aos-duration="550" data-aos="zoom-in" className="px-[29px]">
                    <h3 className="thin-title mt-4">انتخاب هوشمندانه</h3>
                    <h5 className="bold-title sm:text-[42px] text-[24px] lg:text-[32px]">خرید اقساطی کامپیوتر و لپ
                        تاپ</h5>
                    <p className="thin-title">قطعاً در شرایط اقتصاد کنونی خرید لپ تاپ و یا کامپیوتر به صورت نقد کاری
                        دشوار می باشد. البته شرکت ها و رابط های بسیاری این چندسال رشد کرده اند که به صورت اقساطی محصولات
                        را به فروش می رسانند. بخش فروش اقساطی پی سی کالا کاملاً حقیقی و برای خرید صد در صد بدون هرگونه
                        مشکلی ایجاد شده است. شما عزیزان کافیست برای خرید قسطی لپ تاپ و یا کامپیوتر درخواست خود را ارسال
                        نمایید. تیم حرفه ای پی سی کالا تمام مراحل را با شما هماهنگ کرده و تمام تلاش خود را می کند تا
                        بتوانید محصول مورد نیاز را در کمترین زمان خریداری کنید.</p>
                    <div className="flex items-center justify-end mt-3"><Button Icon={<CiDiscount1 />} filled={true}
                        fn={() => navigate("/products/computer")}
                        text="خرید قسطی لپ تاپ و کامپیوتر" />
                    </div>
                </div>
                <div data-aos-duration="550" data-aos="zoom-in" className=" ch:mr-auto h-[481px]"><img
                    className="sm:max-w-[450px] size-auto m-auto object-cover" src="/images/home/ghesti.webp"
                    alt="pc-kala" /></div>
            </div>

            <div className="container flex-col lg:flex-row flex ch:flex-1 gap-8 mt-36 mb-24">
                <div data-aos-duration="550" data-aos="zoom-in"><img className="m-auto lg:h-[600px] h-auto w-[500px]"
                    src="/images/home/parts.webp" alt="pc-kala" /></div>
                <div data-aos-duration="550" data-aos="zoom-in" className="flex flex-col justify-center">
                    <h3 className="thin-title mt-4">قدرت در دستان توست!</h3>
                    <h5 className="bold-title lg:text-[39px] text-[26px]">خرید انواع قطعات و لوازم جانبی</h5>
                    <p className="thin-title">خرید انواع قطعات کامپیوتر و لوازم جانبی آن مانند کارت گرافیک، پردازنده
                        مرکزی، حافظه رم، خافظه ذخیره سازی، منبع تغذیه، کیس و … . تمامی قطعات ارائه شده در سایت پی سی
                        کالا دارای گارانتی معتبر می باشد. از مهمترین ویژگی های محصولات ما قیمت فوق العاده به نسبت بازار
                        ایران است. بنابراین با خیال راحت می توانید هر قطعه ای را که نیاز داشتید در بین تنوع بسیار بالای
                        فروشگاه قطعات ما بیابید و خریداری کنید.</p>
                    <div className="flex items-center justify-end mt-3"><Button filled={true}
                        Icon={<AiOutlinePartition />}
                        fn={() => navigate("/products/parts")}
                        text="فروشگاه قطعات و لوازم جانبی" />
                    </div>
                </div>
            </div>

            <div className="my-6">
                <BlockTitle Icon={<BsCpu className="p-1" />} title="پرفروش ترین ها" url="/" />
                <Slider>
                    {
                        [1, 3, 4, 54, 6].map(prd => <SwiperSlide key={prd}><Product /></SwiperSlide>)
                    }
                </Slider>
            </div>

            <section>
                <div className="pt-[150px] size-60 lg:size-auto m-auto"><img className="m-auto "
                    src="/images/home/pckala.webp"
                    alt="pc-kala-logo" /></div>

                <div
                    className="flex items-center justify-center ch:shrink ch:size-auto gap-0 lg:gap-8 xl:gap-24 mt-20 lg:mt-10">
                    <img className="md:block hidden" src="/images/home/cup-1.webp" />
                    <img className="md:block hidden" src="/images/home/cup-2.webp" />
                    <img src="/images/home/cup-3.webp" />
                    <img src="/images/home/cup-4.webp" />
                    <img src="/images/home/cup-5.webp" />
                </div>

            </section>

            <section data-aos-duration="550" data-aos="zoom-in" className=" mt-24 container lg:text-start text-center relative h-[700px]">
                <h3 className="bold-title sm:text-[40px] text-[32px] text-center">برترین متخصصین کشور</h3>
                <img src="/images/home/wave-red.webp" className="sm:absolute md:flex hidden left-[19px] lg:left-60 top-48 w-[400px] h-[450px]"></img>
                <img src="/images/home/wave-red.webp" className="absolute inset-0 -z-[5] md:hidden block top-[50%] right-[50%] translate-x-[50%] size-2/3 brightness-[0.2] -translate-y-[50%]"></img>
                <div className="lg:px-[200px] px-4 sm:px-[100px]">
                    <p className="text-description-text py-1 text-center text-sm leading-[31px]">برترین متخصصین را گرد
                        هم اورده ایم تا بهترین را برای شما به ارمغان آوریم. وب سایت پیسی کالا که یکی از زیرحجموعه های
                        گروه مهندسی لعل فام میباشد. متشکل از برترین کارشناسان جوزه تکنولوژی و فروش از بین جوانان میهنمان
                        می باشد. هدف ما در این رقابت قدرت کسب رضایت حداکثری شما مشتریان گرامی است. هر روز و هر لحظه به
                        دنبال خلق ایده های نو و ارايه خدمات با بهترین کیفیت به شما هستیم.</p>
                    <p className="text-white text-3xl font-bold text-center mb-2 lg:text-start mt-12">تماس با ما</p>
                    <p className="bold-title text-[30px] sm:text-[40px]">سریع ترین راه ارتباطی</p>
                    <p className="sm:text-[60px] text-[40px] xl:text-[90px] text-white">۰۲۱-۱۲۳۴۵۶۷۸۹</p>
                    <p className="bold-title text-[30px] sm:text-[40px]">۰۳۱-۹۸۷۶۵۴۳۲۱</p>
                </div>
            </section>

            <Footer />

        </section>
    )
}