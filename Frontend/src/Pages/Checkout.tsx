import { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Input } from "../components/Input"

const Checkout = () => {

    const [formData, setFormData] = useState({});

    const inputUpdater = (name: string, value: unknown) => setFormData(prev => ({ ...prev, [name]: value }));

    console.log(formData);


    return (
        <>
            <section className="bg-primary-black">

                <Header />

                <span className='md:pt-[160px] pt-[130px] block'></span>

                <div className="container bg-secondary-black rounded-md p-4">

                    <h3 className="text-white py-8">جزعیات صورت حساب</h3>

                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <div className="grid grid-cols-2 gap-3 ch:mb-4">
                                <Input fn={inputUpdater} name="name" title="نام" />
                                <Input fn={inputUpdater} name="lName" title="نام خانوادگی" />
                                <Input fn={inputUpdater} name="ostan" title="استان">
                                    <option disabled value={0}>شهر مورد نظر را انتخاب کنید</option>
                                    <option value="tehe">تهران</option>
                                    <option value="kh">خراسان رضوی</option>
                                    <option value="esf">اصفهان</option>
                                    <option value="shrz">شیراز</option>
                                </Input>
                                <Input fn={inputUpdater} name="province" title="خیابان" />
                                <Input fn={inputUpdater} name="codePost" title="کد پستی (ده رقمی)" />
                                <Input fn={inputUpdater} name="phoneNum" title="شماره موبایل" type="number" placeHolder="09123456789" />
                                <Input fn={inputUpdater} name="email" title="پست الکترونیک (اختیاری)" required={false} type="email" placeHolder={"gmail.com@"} />
                            </div>
                            <div className="flex justify-center text-[13px] text-description-text mt-4 gap-4 flex-col">
                                <p>توضیحات سفارش (اختیاری)</p>
                                <textarea onChange={e => inputUpdater("orderDetails", e.target.value)} className="appearance w-full placeholder:text-[12px] h-[80px] max-h-[200px] bg-primary-black outline-none border rounded-md border-white/20 p-2" placeholder="یادداشت‌ها درباره سفارش شما، برای مثال نکات مهم درباره نحوه تحویل سفارش" cols={30} rows={10}></textarea>
                            </div>
                        </div>




                        <div className="flex-1"></div>
                    </div>
                </div>

                <div className="h-[400px]"></div>
            </section>

            <Footer />
        </>
    )
}

export default Checkout