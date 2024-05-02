import { fetchData } from "@/utils"
import Link from "next/link"
import { FormEvent, FormEventHandler, useState } from "react"

const Login = () => {

    const [loginForm, setLoginFrom] = useState<{ [key: string]: string }>({})

    const formUpdater = (prop: string, value: string) => setLoginFrom({ ...loginForm, [prop]: value })

    const formSubmit = async (e: FormEvent) => {
        e.preventDefault();

        console.log(loginForm)

        try {

            const res = await fetch('http://localhost:3000/api/auth/login', {
                headers: { 'Content-Type': 'application/json' },
                method: "POST",
                body: JSON.stringify(loginForm)
            })

            if (!res.ok) throw new Error(res.status)

            const data = await res.json()
            console.log(data)

        } catch (error) { console.log('Error acured during fetching data => ', error) }
    }

    return (

        <section className="flex-center h-screen px-5">

            <Link className="py-3 px-5 font-peyda absolute top-8 bg-black text-white rounded-md left-8" href="/">بازگشت</Link>

            <div className="max-w-[400px] m-auto shadow-regular w-full overflow-hidden rounded-[47px] p-2">

                <div className="h-[200px] bg-black rounded-t-[40px] text-center flex-center"><div className="text-[30px] pb-16 text-white font-peyda">ورود</div></div>

                <form onSubmit={formSubmit} className="bg-white relative pt-12 rounded-tl-[40px] px-2 bottom-12">

                    <div className="flex flex-col p-2 text-[13px] gap-2">
                        <label className="text-black mr-6 font-bold" htmlFor="name">نام کاربری</label>
                        <input
                            value={loginForm?.username}
                            onChange={e => formUpdater("username", e.target.value)}
                            className="p-3 input-shadow rounded-lg placeholder:text-[12px] text-[15px] text-gray-500 outline-none"
                            type="text"
                            placeholder="نام کاربری / ایمیل" />
                    </div>

                    <div className="flex flex-col p-2 text-[13px] gap-2">
                        <label className="text-black mr-6 font-bold" htmlFor="name">رمز عبور</label>
                        <input
                            value={loginForm?.password}
                            onChange={e => formUpdater("password", e.target.value)}
                            className="p-3 input-shadow rounded-lg placeholder:text-[12px] text-[15px] text-gray-500 outline-none"
                            type="text"
                            placeholder="رمز خود را وارد کنید" />
                    </div>

                    <div className="px-2"><input className="text-white bg-black rounded-xl text-center text-xl font-peyda p-3 w-full cursor-pointer mt-12" type="submit" value="ورود" /></div>
                </form>

                <div className="text-[13px] m-auto pb-2 text-gray-600 text-center">حساب کاربری ندارید؟ <Link className="text-black underline font-bold" href="/register">ثبت نام کنید</Link></div>
            </div>

        </section>
    )
}

export default Login