import Link from "next/link"

const Register = () => {

    

    return (
        <section className="flex-center h-screen px-5 bg-title-text">

            <Link className="py-3 px-5 font-peyda absolute top-8 bg-black text-white rounded-md left-8" href="/">بازگشت</Link>

            <div className="max-w-[400px] m-auto shadow-regular w-full overflow-hidden rounded-[47px] p-2">

                <div className="h-[200px] bg-black rounded-t-[40px] text-center flex-center"><div className="text-[30px] pb-16 text-white font-peyda">ثبت نام</div></div>

                <form className="bg-title-text relative pt-12 rounded-tl-[40px] px-2 bottom-12">

                    <div className="flex flex-col p-2 text-[13px] gap-2">
                        <label className="text-black mr-6 font-bold" htmlFor="name">نام کاربری</label>
                        <input className="p-3 input-shadow rounded-lg placeholder:text-[12px] text-[15px] text-gray-500 outline-none" type="text" placeholder="نام کاربری خود را وارد کنید" />
                    </div>
                    <div className="flex flex-col p-2 text-[13px] gap-2">
                        <label className="text-black mr-6 font-bold" htmlFor="name">ایمیل</label>
                        <input className="p-3 input-shadow rounded-lg placeholder:text-[12px] text-[15px] text-gray-500 outline-none" type="email" placeholder="ایمیل خود را وارد کنید" />
                    </div>
                    <div className="flex flex-col p-2 text-[13px] gap-2">
                        <label className="text-black mr-6 font-bold" htmlFor="name">رمز عبور</label>
                        <input className="p-3 input-shadow rounded-lg placeholder:text-[12px] text-[15px] text-gray-500 outline-none" type="text" placeholder="رمز خود را وارد کنید" />
                    </div>
                    <div className="flex flex-col p-2 text-[13px] gap-2">
                        <label className="text-black mr-6 font-bold" htmlFor="name">تایید رمز عبور</label>
                        <input className="p-3 input-shadow rounded-lg placeholder:text-[12px] text-[15px] text-gray-500 outline-none" type="text" placeholder="رمز عبور خود را تایید کنید" />
                    </div>

                    <div className="px-2"><input className="text-white bg-black rounded-xl text-center text-xl font-peyda p-3 w-full cursor-pointer mt-12" type="submit" value="ثبت نام" /></div>
                </form>

                <div className="text-[13px] m-auto pb-2 text-gray-600 text-center">حساب کاربری دارید؟ <Link className="text-black underline font-bold" href="/login">وارد شوید</Link></div>
            </div>

        </section>
    )
}

export default Register