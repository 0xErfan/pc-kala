import Footer from "../components/Footer"

const Login = () => {
    return (
        <section>
            <span className="pt-[300px] block"></span>

            <div className="max-w-[400px] m-auto shadow-regular overflow-hidden rounded-[40px]">

                <div className="">
                    <div className="h-[200px] bg-black rounded-t-[40px] text-center flex-center"><div className="text-[30px] pb-16 text-white font-peyda">ثبت نام</div></div>
                </div>

                <form className="bg-white h-[300px] relative rounded-tl-[40px] p-2 bottom-12">

                    <div className="flex flex-col p-2 text-[13px] gap-2">
                        <label className="text-black mr-6" htmlFor="name">نام کاربری</label>
                        <input className="p-3 rounded-lg text-[15px] text-description-text outline-none" type="text" placeholder="نام کاربری خود را وارد کنید" />
                    </div>

                    <div className="flex flex-col p-2 text-[13px] gap-2">
                        <label className="text-black mr-6" htmlFor="name">ایمیل</label>
                        <input className="p-3 rounded-lg text-[15px] text-description-text outline-none" type="text" placeholder="ایمیل خود را وارد کنید" />
                    </div>

                    <div className="flex flex-col p-2 text-[13px] gap-2">
                        <label className="text-black mr-6" htmlFor="name">رمز عبور</label>
                        <input className="p-3 rounded-lg text-[15px] text-description-text outline-none" type="password" placeholder="رمز عبور خود را وارد کنید" />
                    </div>

                    <div className="flex flex-col p-2 text-[13px] gap-2">
                        <label className="text-black mr-6" htmlFor="name">تایید رمز عبور</label>
                        <input className="p-3 rounded-lg text-[15px] text-description-text outline-none" type="password" placeholder="رمز عبور خود را وارد کنید" />
                    </div>

                </form>
            </div>

            <div className="h-[2000px]"></div>
            <Footer />
        </section>
    )
}

export default Login