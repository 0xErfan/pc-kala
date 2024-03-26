import Header from "../components/Header";

export default function Home() {

    return (
        <section className="primary-bg" >
            <Header />
            <div className="container flex ch:flex-1 gap-4 mt-12">
                <div className="">
                    <h3 className="thin-title mt-4" >بهترین قیمت</h3>
                    <h5 className="bold-title">خرید انواع لپ تاپ</h5>
                    <p className="thin-title">خرید انواع برندهای لپ تاپ با بهترین قیمت روز بازار ایران در سایت پی سی کالا، تنوع بی نظیر در انواع مدلها و سری های بازار با انواع کانفیگ های مورد نیاز کاربران که در هیچ وب سایت دیگری یافت نخواهید کرد. هر نوع کانفیگ از حافظه رم متنوع تا حافظه ذخیره سازی، گرافیک و صفحه نمایش برای تمام سری های محبوب لپ تاپ های روز دنیای در سایت پی سی کالا موجود می باشد. هر نیازی که در خصوص خرید لپ تاپ دارید بی تردید در سایت ما با بهترین قیمت به دست خواهید آورد.</p>
                </div>
                <div className=""><img className="w-full h-full object-cover " src="/images/home/laptop.webp" alt="pc-kala" /></div>
            </div>
        </section>
    )
}