import {ReactNode, useState} from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import {Input} from "../components/Input"
import {Link} from "react-router-dom"
import {CgFileDocument} from "react-icons/cg"

interface TableDataProps {
    children: ReactNode,
    title: string
}

const Checkout = () => {

    const [formData, setFormData] = useState({});

    const inputUpdater = (name: string, value: unknown) => setFormData(prev => ({...prev, [name]: value}));

    console.log(formData);

    return (
        <>
            <section className="bg-primary-black">

                <Header/>

                <span className='md:pt-[160px] pt-[130px] block'></span>

                <div className="flex items-center justify-evenly ch:cursor-pointer gap-12 sm:gap-24 mb-12">

                    <Link to="/" className="flex items-center flex-col gap-2">
                        <CgFileDocument className="size-11 rounded-md text-dark-red/90 p-2 bg-secondary-black"/>
                        <p className="text-description-text transition-all hover:text-white">سبد خرید</p>
                    </Link>
                    <Link to="/" className="flex items-center flex-col gap-2">
                        <CgFileDocument className="size-11 rounded-md text-dark-red/90 p-2 bg-secondary-black"/>
                        <p className="text-description-text transition-all hover:text-white">جزئیات پرداخت</p>
                    </Link>
                    <Link to="/" className="flex items-center flex-col gap-2">
                        <CgFileDocument className="size-11 rounded-md text-dark-red/90 p-2 bg-secondary-black"/>
                        <p className="text-description-text transition-all hover:text-white">تکمیل سفارش</p>
                    </Link>

                </div>

                <div className="container bg-secondary-black rounded-md p-4">

                    <div className="flex items-center gap-4">

                        <div data-aos-duration="550" data-aos="fade-left" className="flex-1 mb-auto">
                            <h3 className="text-white py-8">جزئیات صورتحساب</h3>
                            <div className="grid grid-cols-2 gap-3 ch:mb-4">
                                <Input fn={inputUpdater} name="name" title="نام"/>
                                <Input fn={inputUpdater} name="lName" title="نام خانوادگی"/>
                                <Input fn={inputUpdater} name="ostan" title="استان">
                                    <option disabled value={0}>شهر مورد نظر را انتخاب کنید</option>
                                    <option value="tehe">تهران</option>
                                    <option value="kh">خراسان رضوی</option>
                                    <option value="esf">اصفهان</option>
                                    <option value="shrz">شیراز</option>
                                </Input>
                                <Input fn={inputUpdater} name="province" title="خیابان"/>
                                <Input fn={inputUpdater} name="codePost" title="کد پستی (ده رقمی)"/>
                                <Input fn={inputUpdater} name="phoneNum" title="شماره موبایل" type="number"
                                       placeHolder="09123456789"/>
                                <Input fn={inputUpdater} name="email" title="پست الکترونیک (اختیاری)" required={false}
                                       type="email" placeHolder={"gmail.com@"}/>
                            </div>
                            <div className="flex justify-center text-[13px] text-description-text mt-4 gap-4 flex-col">
                                <p>توضیحات سفارش (اختیاری)</p>
                                <textarea onChange={e => inputUpdater("orderDetails", e.target.value)}
                                          className="appearance w-full placeholder:text-[12px] h-[80px] max-h-[200px] bg-primary-black outline-none border rounded-md border-white/20 p-2"
                                          placeholder="یادداشت‌ها درباره سفارش شما، برای مثال نکات مهم درباره نحوه تحویل سفارش"
                                          cols={30} rows={10}></textarea>
                            </div>
                        </div>

                        <div data-aos-duration="550" data-aos="fade-right" className="flex-1 mb-auto space-y-4">
                            <h3 className="text-white py-4">سفارش شما</h3>

                            <div className="border border-gold/25 rounded-md">

                                <table className="w-full text-description-text">

                                    <thead className="bg-primary-black text-[12px]">
                                    <tr>
                                        <td className={`p-4`}>محصول</td>
                                        <td>جمع جزء</td>
                                    </tr>
                                    </thead>

                                    <tbody>

                                    {[2, 4, 43, 5].map(data => <tr key={data} className={"border border-gray-600"}>
                                        <td className={`p-4 text-[12px] text-[#8b8b8b]`}>لپ تاپ ایسوس ROG Flow
                                            X16-GV601VV-AE i9-13900H/64GB/2TB/RTX4070-8G - گارانتی 18 ماهه شرکتی × 1
                                        </td>
                                        <td className={"text-nowrap p-3 border-r-2 border-gray-600 text-[13px]"}><span
                                            className={"text-blue-white"}>162,283,869</span> تومان
                                        </td>
                                    </tr>)}

                                    <TableData
                                        children={<div><span className={"text-blue-white"}>2343425</span> تومان</div>}
                                        title={"جمع جزء"}/>
                                    <TableData
                                        children={<p className={"max-w-70 text-wrap"}>ارسال توسط تیپاکس، اتوبوس، باربری
                                            به تشخیص فروشگاه (پس کرایه)</p>} title={"حمل و نقل"}/>
                                    <TableData children={<p className={"max-w-70 text-wrap"}><span
                                        className={"text-blue-white"}>29,792,683</span> تومان</p>}
                                               title={"مجموع"}/>

                                    </tbody>

                                </table>
                            </div>

                            <p className="border leading-[32px] text-description-text rounded-md border-gold/25 p-3">مشتری
                                عزیز، محصولاتی که بالای 100 میلیون تومان هستند با درگاه پرداخت نمی توان آن ها را پرداخت
                                کرد، لطفا برای گرفتن شماره حساب و یا راهنمایی بیشتر با شماره های 90909090909 ،
                                0909090909 تماس بگیرید.</p>

                            <div className="text-description-text rounded-md p-3">
                                <div className="flex items-center gap-2">
                                    <input type="checkbox"/>
                                    <p className="text-gray-500 text-[12px]">من <Link to="/"
                                                                                      className="text-white hover:text-blue-dark transition-all">شرایط
                                        و مقررات</Link> سایت را خوانده ام و آن را می پذیرم. </p>
                                </div>
                            </div>
                            <button className=" w-full rounded-md p-3 text-center text-white bg-white-red">ثبت سفارش
                            </button>
                        </div>
                    </div>
                </div>

                <div className="h-12"></div>
            </section>

            <Footer/>
        </>
    )
}

const TableData = ({title, children}: TableDataProps) => {
    return (
        <tr className={"border border-gray-600 bg-primary-black"}>
            <td className={`p-4 text-[12px] text-white`}>{title}</td>
            <td className={"text-nowrap p-3 border-r-2 border-gray-600 text-[13px]"}>{children}</td>
        </tr>
    )
}

export default Checkout