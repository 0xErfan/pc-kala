import Footer from "../components/Footer"
import { IoSearch } from "react-icons/io5";
import { FaAngleLeft } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { FiMinus } from "react-icons/fi";
import { LuPlus } from "react-icons/lu";
import { GoCpu } from "react-icons/go";
import { MdAddShoppingCart } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { MdOutlineInsertComment } from "react-icons/md";
import { MdOutlinePhoneEnabled } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
import { GoCommentDiscussion } from "react-icons/go";
import { BsFilterLeft } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";
import Button from "../components/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import Comment from "../components/Comment";

const Product = () => {

    const [activeSection, setActiveSection] = useState<"details" | "comments">("details")

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

                        <div className="flex-[5] text-[13px] border relative border-dark-gold rounded-md text-description-text">
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
                    <div className="ch:rounded-sm space-y-1">
                        <h4 className="bg-[#343539] mb-2 py-1 px-2">مشخصات اصلی محصول</h4>
                        <h4 className="bg-primary-black flex items-center gap-2 py-1 px-2"> <GoCpu /> intel i9-13980HX</h4>
                        <h4 className="bg-primary-black flex items-center gap-2 py-1 px-2"> <GoCpu /> +18inch QHD</h4>
                        <h4 className="bg-primary-black flex items-center gap-2 py-1 px-2"> <GoCpu /> RTX4090-16G</h4>
                        <h4 className="bg-primary-black flex items-center gap-2 py-1 px-2"> <GoCpu /> 32GB DDR5</h4>
                        <h4 className="bg-primary-black flex items-center gap-2 py-1 px-2"> <GoCpu /> 2TB-SSD</h4>
                    </div>

                    <div className="mt-5">
                        <div className="p-3 text-center rounded-sm cursor-pointer bg-dark-red text-[13px]">نحوه خرید اقساطی</div>
                        <div className="flex items-center gap-2 mt-2 ch:rounded-sm ch:cursor-pointer">
                            <div className="flex items-center flex-1 flex-center font-bold gap-2 p-2 bg-secondary-black text-title-text border-dashed hover:bg-blue-dark transition-all border border-blue-dark"><MdOutlinePhoneEnabled className="size-5" />نیاز به مشاوره</div>
                            <div className="flex items-center flex-1 flex-center font-bold gap-2 p-2 text-secondary-black bg-title-text"><GrGroup className="size-5 text-tex" />امور مشتریان</div>
                        </div>
                    </div>

                </div>

            </div>

            <div className="flex items-center container ch:cursor-pointer h-[107px] text-description-text relative ch:transition-all bg-secondary-black text-[12px] mt-8 rounded-md p-4">

                <div onClick={() => setActiveSection("details")} className={`flex-1 relative`}>
                    <div className={`flex-center flex-col ${activeSection == "details" && "active-section"} gap-1`}>
                        <TbListDetails className="text-description-text size-6" />
                        <p>مشخصات فیزیکی</p>
                    </div>
                </div>

                <div onClick={() => setActiveSection("comments")} className={`flex-1 relative`}>
                    <div className={`flex-center flex-col ${activeSection == "comments" && "active-section"} gap-1`}>
                        <GoCommentDiscussion className="text-description-text size-6" />
                        <p>نظرات کاربران</p>
                    </div>
                </div>

            </div>

            <div className="container text-description-text bg-secondary-black text-[12px] mt-2 rounded-md mb-12 p-4">

                {
                    activeSection == "comments"
                        ?
                        <div>

                            <div className="flex items-center gap-5">
                                <div className={`flex-1 space-y-3`}>
                                    <div className="flex items-center gap-2">
                                        <MdOutlineInsertComment className="size-8" />
                                        <h3>نظرات کاربران</h3>
                                    </div>
                                    <div className="border text-description-text rounded-md border-dotted border-gold/30 p-4">
                                        <span className="text-white">                        لطفا پیش از ارسال نظر، خلاصه قوانین زیر را مطالعه کنید:</span>
                                        <br /><br />
                                        فارسی بنویسید و از کیبورد فارسی استفاده کنید. بهتر است از فضای خالی (Space) بیش‌از‌حدِ معمول، شکلک یا ایموجی استفاده نکنید و از کشیدن حروف یا کلمات با صفحه‌کلید بپرهیزید.
                                        <br /><br />
                                        نظرات خود را براساس تجربه و استفاده‌ی عملی و با دقت به نکات فنی ارسال کنید؛ بدون تعصب به محصول خاص، مزایا و معایب را بازگو کنید و بهتر است از ارسال نظرات چندکلمه‌‌ای خودداری کنید.
                                        <br /><br />
                                        بهتر است در نظرات خود از تمرکز روی عناصر متغیر مثل قیمت، پرهیز کنید.
                                        <br /><br />
                                        به کاربران و سایر اشخاص احترام بگذارید. پیام‌هایی که شامل محتوای توهین‌آمیز و کلمات نامناسب باشند، حذف می‌شوند.
                                    </div>
                                </div>

                                <div className={`flex-1 mb-auto`}>
                                    <p className="text-description-text pt-2">اولین کسی باشید که دیدگاهی می نویسد “لپ تاپ لنوو IdeaPad GAMING3 i7-11370H/32GB/1TB/GTX 1650-4G”</p>
                                    {
                                        "" ?
                                            <div className="text-center mt-12">برای ثبت نظر ابتدا <Link to="/login" className="text-blue-dark">وارد حساب </Link>خود شوید.</div>
                                            :
                                            <div className="mt-6">
                                                <label htmlFor="textArea">دیدگاه شما <span className="text-white-red">*</span></label>
                                                <textarea className="max-h-60 h-[167px] w-full p-2 rounded-md my-2 bg-primary-black border border-description-text/10" id="textArea" cols={30} rows={10}></textarea>
                                                <Button text="ثبت نظر" filled={true} fn={() => { }} />
                                            </div>
                                    }
                                </div>
                            </div>

                            <div className="mt-24">
                                <div className="flex items-center justify-between border-b border-title-text pb-2">
                                    <p className="font-peyda text-gold text-[15px]">نقد و بررسی ها</p>
                                    <div className="flex items-center text-[11px] gap-4 text-description-text">
                                        <BsFilterLeft className="size-5" />
                                        <p className="text-white-red">جدیدترین</p>
                                        <p>دیدکاه خریداران</p>
                                    </div>
                                </div>
                                {
                                    " "
                                        ?
                                        <div className="flex flex-col mt-3 gap-2">
                                            <Comment />
                                            <Comment />
                                            <Comment />
                                        </div>
                                        :
                                        <div className="w-full mt-3 bg-white-red p-3 rounded-md">نظری برای این محصول ثبت نشده !</div>
                                }
                            </div>
                        </div>
                        :
                        <div>
                            <div className="flex items-center text-md gap-2">
                                <BiMessageSquareDetail className="size-6" />
                                <p>مشخصات کلی</p>
                            </div>

                            <div className="space-y-1 mt-4 text-white text-[10px]">

                                <div className="flex items-center ch:pr-3 ch:h-8 gap-[3px] ch:w-full ch:bg-primary-black">
                                    <div className="rounded-br-3xl flex-1 flex items-center rounded-tr-sm">سازنده پردازنده</div>
                                    <div className="flex-[8] text-[13px] flex items-center">Intel</div>
                                </div>

                                <div className="flex items-center ch:pr-3 ch:h-8 gap-[3px] ch:w-full ch:bg-primary-black">
                                    <div className="rounded-br-3xl flex-1 flex items-center rounded-tr-sm">سازنده پردازنده</div>
                                    <div className="flex-[8] text-[13px] flex items-center">Intel</div>
                                </div>

                                <div className="flex items-center ch:pr-3 ch:h-8 gap-[3px] ch:w-full ch:bg-primary-black">
                                    <div className="rounded-br-3xl flex-1 flex items-center rounded-tr-sm">سازنده پردازنده</div>
                                    <div className="flex-[8] text-[13px] flex items-center">Intel</div>
                                </div>

                                <div className="flex items-center ch:pr-3 ch:h-8 gap-[3px] ch:w-full ch:bg-primary-black">
                                    <div className="rounded-br-3xl flex-1 flex items-center rounded-tr-sm">سازنده پردازنده</div>
                                    <div className="flex-[8] text-[13px] flex items-center">Intel</div>
                                </div>
                            </div>
                        </div>
                }

            </div>

            <Footer />
        </section>
    )
}

export default Product