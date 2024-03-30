import Footer from "../components/Footer"
import { IoSearch } from "react-icons/io5";
import { FaAngleLeft } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { FiMinus } from "react-icons/fi";
import { LuPlus } from "react-icons/lu";
import { MdAddShoppingCart } from "react-icons/md";
import Button from "../components/Button";

const Product = () => {

    return (

        <section className="primary-bg">

            <div className="bg-secondary-black rounded-md gap-2 container p-3 flex items-center mb-4 mt-[150px] text-[12px] ch:ch:size-4 text-description-text">
                <div className="flex items-center gap-2">خانه‌<FaAngleLeft /></div>
                <div className="flex items-center gap-2">لپتاپ <FaAngleLeft /></div>
                <div className="flex items-center gap-2">lonovo v15<FaAngleLeft /></div>
                <div className="flex items-center gap-2"> لپ تاپ ایسوس ROG Strix SCAR G834JY-AC i9-13980HX/32GB/2TB/RTX4090-16G</div>
            </div>

            <div className=" flex items-center gap-4 bg-secondary-black container rounded-md p-4 text-white">
                <div className=" flex-1">

                    <div className="flex items-center justify-between text-[11px]">


                        <p className="text-sm"><span className="font-peyda text-gold text-[15px]">پیشنهاد ویژه</span><span className="block"></span><span className="text-[10px]">فرصت باقی مانده</span></p>

                        <div className="flex-center gap-2">

                            <div className="flex items-center flex-col justify-center gap-1">
                                <div className="flex-center p-[3px] bg-green text-sm white size-7 rounded-[4px] h-full">15</div>
                                <p className="text-[10px] text-description-text">ثانیه</p>
                            </div>
                            <div className="flex flex-col justify-center gap-1">
                                <div className="flex-center p-[3px] bg-white text-sm text-black/95 size-7 rounded-[4px] h-full">43</div>
                                <p className="text-[10px] text-description-text">دقیقه</p>
                            </div>
                            <div className="flex flex-col justify-center gap-1">
                                <div className="flex-center p-[3px] bg-white text-sm text-black/95 size-7 rounded-[4px] h-full">21</div>
                                <p className="text-[10px] text-description-text">ساعت</p>
                            </div>
                            <div className="flex flex-col justify-center gap-1">
                                <div className="flex-center p-[3px] bg-white text-sm text-black/95 size-7 rounded-[4px] h-full">01</div>
                                <p className="text-[10px] text-description-text mr-2">روز</p>
                            </div>

                        </div>

                    </div>

                    <div className="flex gap-3 items-center my-4">

                        <div className="flex-1">
                            <div className="flex items-center gap-2 flex-col ch:cursor-pointer">
                                <img className="flex-center object-cover p-1 rounded-md border border-dark-red" src="/images/victus-15.webp" />
                                <img className="flex-center object-cover p-1 rounded-md border border-dark-gold" src="/images/victus-15.webp" />
                                <img className="flex-center object-cover p-1 rounded-md border border-dark-gold" src="/images/victus-15.webp" />
                                <img className="flex-center object-cover p-1 rounded-md border border-dark-gold" src="/images/victus-15.webp" />
                                <img className="flex-center object-cover p-1 rounded-md border border-dark-gold" src="/images/victus-15.webp" />
                            </div>
                        </div>

                        <div className="flex-[5] border relative border-dark-gold rounded-md text-description-text">
                            <img className="flex-center w-full object-cover py-4" src="/images/victus-15.webp" />
                            <span className="absolute cursor-pointer flex-center size-10 border border-dark-gold left-3 bottom-3 ch:size-5 text-description-text rounded-sm"><IoSearch /></span>
                            <span className="absolute size-10 border border-dark-gold left-16 bottom-3 ch:size-5 cursor-pointer flex-center rounded-sm"><IoShareSocialOutline /></span>
                        </div>

                    </div>

                    <div className="bg-green rounded-md p-4 text-sm text-center">قدرت ما در بهترین قیمت بازار است بهترین عرضه کننده لپ تاپ در ایران</div>
                </div>

                <div className=" flex-[1.4] mb-auto">
                    <p>لپ تاپ ایسوس ROG Strix SCAR G834JY-AC i9-13980HX/32GB/2TB/RTX4090-16G</p>
                    <span className="bg-blue-dark inline-block text-[11px] p-1 rounded-sm my-3">شناسه محصول : 72478</span>
                    <div className="flex items-center gap-12 text-[12px]">
                        <p>گارانتی دستگاه</p>
                        <select defaultValue={0} className="bg-primary-black rounded-md p-2 border border-dark-gold">
                            <option disabled={true} value={0}>گارانتی دستگاه را انتخاب کنید</option>
                            <option value={1}>گارانتی 18 ماهه شرکتی</option>
                        </select>
                    </div>

                    <p className="text-dark-red mt-6 text-sm">خدمات ویژه پی سی کالا :</p>

                    <div className="text-[12px] ch:my-3 ch:text-description-text">

                        <div className="flex items-center gap-1">
                            <input name="inshurance" type="checkbox" />
                            <label htmlFor="inshurance">گارانتی طلایی پی سی کالا (پس انداز اندک برای حسرت های ناگهانی) <span className="text-blue-white mx-1">10,602,042 تومان</span></label>
                        </div>

                        <div className="flex items-center gap-1">
                            <input name="windows" type="checkbox" />
                            <label htmlFor="windows">نصب ویندوز حرفه ای کار هرکسی نیست ، تیکو بزن . <span className="text-blue-white mx-1">500,000 تومان</span> </label>
                        </div>

                        <div className="flex items-center gap-1">
                            <input name="windows-org" type="checkbox" />
                            <label htmlFor="windows-org">ویندوز اورجینال (لایسنس 1 ساله)<span className="text-blue-white mx-1">2,500,000 تومان</span> </label>
                        </div>

                        <div className="flex items-center gap-1">
                            <input name="anti-virus" type="checkbox" />
                            <label htmlFor="anti-virus"> نصب آنتی ویروس<span className="text-blue-white mx-1">150,000 تومان</span> </label>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-3 text-title-text text-2xl mt-10">
                            <div className="red-line-through text-white ">۲۳,۷۳۴,۱۷۴</div>
                            <div className="text-blue-white">۲۳,۱۴۵,۶۲۵ <span className="text-description-text text-xl">تومان</span></div>
                        </div>
                        <div className="flex items-center mt-3 gap-3">
                            <div className="flex h-[44px] items-center border border-dark-gold rounded-md">
                                <div className="w-10 flex-center border-l h-full border-dark-gold">1</div>
                                <div className="flex-center flex-col w-6 ch:cursor-pointer gap-1">
                                    <LuPlus />
                                    <FiMinus />
                                </div>
                            </div>
                            <Button filled={true} text="افزودن به سبد خرید" fn={() => console.log("hi2")} Icon={<MdAddShoppingCart />} />
                        </div>
                    </div>
                </div>

                <div className=" flex-1 text-[12px] text-white mb-auto">
                    <div>
                        <h4 className="bg-[#343539] py-1 px-2 rounded-sm">مشخصات اصلی محصول</h4>
                    </div>
                </div>
            </div>

            <div className="h-[500px]"></div>

            <Footer />
        </section>
    )
}

export default Product