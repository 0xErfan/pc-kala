import { ReactNode, useMemo, useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Input } from "@/components/Input"
import Link from "next/link"
import Progress from "@/components/Progress"
import { useAppDispatch, useAppSelector } from "@/Hooks/useRedux"
import { showToast, totalPriceCalculator } from "@/utils"
import { modalDataUpdater, userUpdater } from "@/Redux/Features/globalVarsSlice"
import { useRouter } from "next/router"
import Loader from "@/components/Loader"
import { unknownObjProps } from "@/global.t"
import { ModalProps } from "@/components/Modal"

interface TableDataProps {
    children: ReactNode,
    title: string
}

const TableData = ({ title, children }: TableDataProps) => {
    return (
        <tr className={"border border-gray-600 bg-primary-black"}>
            <td className={`p-3 text-[12px] text-white`}>{title}</td>
            <td className={"text-nowrap p-3 border-r-2 border-gray-600 text-[13px]"}>{children}</td>
        </tr>
    )
}

const Checkout = () => {

    const [formData, setFormData] = useState<unknownObjProps<string>>({});
    const [doesUserAccept, setDoesUserAccept] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const { relatedData, data } = useAppSelector(state => state.userSlice) || []
    const dispatch = useAppDispatch()
    const navigate = useRouter()

    const inputUpdater = (name: string, value: string) => setFormData(prev => ({ ...prev, [name]: value }));

    const sumOfProductsWithDiscount = useMemo(() => {

        if (!relatedData?.BasketItem) return 0;

        return relatedData.BasketItem
            .reduce((sum, { productID, count, services }) => sum + totalPriceCalculator(productID?.price, productID?.discount, count, services), 0);

    }, [relatedData?.BasketItem]);

    const removeDiscount = async () => {

        const productWithDiscount = relatedData?.BasketItem.find(item =>
            Object.keys(item.services).some(service => service.includes('کد تخفیف'))
        ); // we just find the product that have the discount object in its services

        const updatedProductServices = { ...productWithDiscount?.services }

        for (let key in updatedProductServices) {
            if (key.includes('کد تخفیف')) {
                delete updatedProductServices[key]
            }
        }

        const res = await fetch('/api/discount/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productID: productWithDiscount?.productID, services: updatedProductServices, userID: data._id })
        })

        const resData = await res.json()

        showToast(res.ok, resData.message)

        if (res.ok) { dispatch(userUpdater()) }
    }

    const submitOrder = async () => {

        if (isLoading) return

        const fieldsToCheck = Object.entries(formData).filter(data => data[0] !== 'email' && data[0] !== 'orderDetails')

        if (fieldsToCheck.some(data => !Boolean(!!data[1]) || !data[1].trim().length)) {
            return showToast(false, 'تمام اطلاعات خواسته شده صورتحساب را وارد کنید')
        } // here we just check all values to not be empty

        if (formData.name.trim().length > 20 || formData.name.trim().length < 3) { return showToast(false, 'نام باید بیشتر از 3 و کمتر از 20 کاراکتر باشد') }
        if (formData.lName.trim().length > 20 || formData.lName.trim().length < 3) { return showToast(false, 'نام خانوادگی باید بیشتر از 3 و کمتر از 20 کاراکتر باشد') }
        if (isNaN(+formData.codePost) || formData.codePost.trim().length != 10) { return showToast(false, 'کد پستی یک عدد ده رقمی است') }
        if (!/^09\d{9}$/.test(formData.phoneNum)) { return showToast(false, 'شماره موبایل معتبر نیست') }
        if (!doesUserAccept) { return showToast(false, 'موافقت با قوانین و مقررات الزامی است') }

        setIsLoading(true)

        try {

            const res = await fetch('/api/order/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userID: data._id, customerData: formData, totalPrice: sumOfProductsWithDiscount })
            })

            const resData = await res.json()

            dispatch(modalDataUpdater({
                isShown: true,
                message: resData.message,
                status: res.ok,
                title: res.ok ? 'خرید موفق' : 'کد تخفیف نامعتبر',
                cancelBtnText: res.ok ? false : 'لغو',
                okBtnText: res.ok ? 'باشه' : 'حذف کد تخفیف و تلاش مجدد',
                fn: async () => {
                    !res.ok && await removeDiscount().then(() => submitOrder()) // only run if response is not ok(invalid discount)
                },
            } as ModalProps))

            if (res.ok) {
                dispatch(userUpdater())
                setTimeout(() => {
                    setIsLoading(false)
                    navigate.replace(`/transactionDetails/${resData.transaction._id}`)
                }, 400); // a little time for redux updating
            }

            setIsLoading(false)

        } catch (err) {
            console.log(err)
            setIsLoading(false)
        }
    }

    return (
        <>
            <section className="bg-primary-black px-2 sm:px-6 overflow-x-hidden">

                <Header />

                <span className='md:pt-[160px] pt-[130px] block'></span>

                <Progress />

                <div className="container bg-secondary-black rounded-md p-3">
                    <div className="flex overflow-hidden flex-col lg:flex-row items-center gap-3">

                        <div data-aos-duration="550" data-aos="fade-left" className="flex-1 w-full mb-auto">
                            <h3 className="text-white py-8">جزئیات صورتحساب</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ch:mb-4">
                                <Input fn={inputUpdater} name="name" title="نام" />
                                <Input fn={inputUpdater} name="lName" title="نام خانوادگی" />
                                <Input fn={inputUpdater} name="ostan" title="استان">
                                    <option disabled value={0} selected>استان مورد نظر را انتخاب کنید</option>
                                    <option value="نهران">تهران</option>
                                    <option value="خراسان رضوی">خراسان رضوی</option>
                                    <option value="اصفهان">اصفهان</option>
                                    <option value="شیراز">شیراز</option>
                                </Input>
                                <Input fn={inputUpdater} name="province" title="خیابان" />
                                <Input fn={inputUpdater} name="codePost" title="کد پستی (ده رقمی)" />
                                <Input fn={inputUpdater} name="phoneNum" title="شماره موبایل" type="number" placeHolder="09123456789" />
                                <Input fn={inputUpdater} name="email" title="پست الکترونیک (اختیاری)" required={false} type="email" placeHolder={"gmail.com@"} />
                            </div>

                            <div className="flex justify-center text-[13px] text-description-text mt-4 gap-3 flex-col">

                                <p>توضیحات سفارش (اختیاری)</p>

                                <textarea onChange={e => inputUpdater("orderDetails", e.target.value)}
                                    className="appearance w-full placeholder:text-[12px] h-[80px] max-h-[200px] bg-primary-black outline-none border rounded-md border-white/20 p-2"
                                    placeholder="یادداشت‌ها درباره سفارش شما، برای مثال نکات مهم درباره نحوه تحویل سفارش"
                                    cols={30} rows={10}>
                                </textarea>

                            </div>
                        </div>

                        <div data-aos-duration="550" data-aos="fade-right" className="flex-1 mb-auto space-y-4">
                            <h3 className="text-white py-4">سفارش شما</h3>

                            <table className="w-full border border-gold/25 rounded-md text-description-text">

                                <thead className="bg-primary-black text-[12px]">
                                    <tr>
                                        <td className={`p-3`}>محصول</td>
                                        <td>قیمت</td>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        relatedData?.BasketItem?.map(({ _id, productID, count, services }) => (

                                            <tr key={_id} className={"border border-gray-600"}>

                                                <td className={`p-3 text-[12px] text-[#8b8b8b]`}>
                                                    <div className="text-description-text text-[13px]">{productID?.name}</div>
                                                    <span>{`(${services ? Object.keys(services).join(' - ') : ''})`}</span>
                                                    <span dir="ltr"> x </span>
                                                    <span className="text-white-red" >{count}</span>
                                                </td>

                                                <td className={"text-nowrap p-3 border-r-2 border-gray-600 text-[13px]"}>
                                                    <span className={"text-blue-white"}>{(totalPriceCalculator(productID?.price, productID?.discount, count, services)).toLocaleString('fa-IR')}</span> تومان
                                                </td>
                                            </tr>)
                                        )
                                    }

                                    <TableData title={"حمل و نقل"}><p className={"max-w-70 text-wrap"}>ارسال توسط تیپاکس، اتوبوس، باربری به تشخیص فروشگاه (پس کرایه)</p></TableData>
                                    <TableData title={"مجموع (قیمت نهایی)"}><p className={"max-w-70 text-wrap"}><span className={"text-blue-white"}>{sumOfProductsWithDiscount.toLocaleString('fa-IR')}</span> تومان</p></TableData>
                                </tbody>

                            </table>

                            <p className="border leading-[32px] text-description-text rounded-md border-gold/25 p-3">مشتری عزیز، محصولاتی که بالای 100 میلیون تومان هستند با درگاه پرداخت نمی توان آن ها را پرداخت کرد، لطفا برای گرفتن شماره حساب و یا راهنمایی بیشتر با شماره های 90909090909 ، 0909090909 تماس بگیرید.</p>

                            <div className="text-description-text rounded-md p-3">
                                <div className="flex items-center gap-2">
                                    <input onChange={e => setDoesUserAccept(e.target.checked)} type="checkbox" />
                                    <p className="text-gray-500 text-[12px]">من <Link href="/" className="text-white hover:text-blue-dark transition-all">شرایط و مقررات</Link> سایت را خوانده ام و آن را می پذیرم. </p>
                                </div>
                            </div>

                            <div onClick={submitOrder}>
                                <button className=" w-full rounded-md p-3 text-center text-white bg-white-red">
                                    {
                                        isLoading
                                            ?
                                            <Loader />
                                            :
                                            'ثبت سفارش'
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-12"></div>
            </section>

            <Footer />
        </>
    )
}

export default Checkout