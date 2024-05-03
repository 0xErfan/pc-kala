import { useAppDispatch } from "@/Hooks/useRedux"
import { getMe } from "@/Redux/Features/userSlice"
import Loader from "@/components/Loader"
import { isEmptyInput, showToast } from "@/utils"
import Link from "next/link"
import { useRouter } from "next/router"
import { FormEvent, useState } from "react"

const Register = () => {

    const [registerFrom, setRegisterFrom] = useState<{ [key: string]: string }>({})
    const [loading, setLoading] = useState(false)
    const navigate = useRouter()
    const dispatch = useAppDispatch()

    const formUpdater = (prop: string, value: string) => setRegisterFrom({ ...registerFrom, [prop]: value })

    const formSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (isEmptyInput(registerFrom, ['username', 'password', 'confirmPassword', 'email'])) { showToast(false, 'لطفا تمام فیلد هارا پر کنید'); return }

        setLoading(true)

        try {

            const res = await fetch('/api/auth/register', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registerFrom)
            })

            const data = await res.json()

            if (!res.ok) { showToast(false, data.message, 3200); return }

            showToast(true, 'ثبت نام با موفقیت انجام شد :))')
            setRegisterFrom({})

            setTimeout(() => {
                dispatch(getMe())
                navigate.replace('/')
            }, 1700);

        }
        catch (error) { showToast(false, String(error)) }
        finally { setLoading(false) }
    }

    return (
        <section className="flex-center h-screen px-5 bg-title-text">

            <Link className="py-3 px-5 font-peyda absolute top-8 bg-black text-white rounded-md left-8" href="/">بازگشت</Link>

            <div className="max-w-[400px] m-auto shadow-regular w-full overflow-hidden rounded-[47px] p-2">

                <div className="h-[200px] bg-black rounded-t-[40px] text-center flex-center"><div className="text-[30px] pb-16 text-white font-peyda">ثبت نام</div></div>

                <form className="bg-title-text relative pt-12 rounded-tl-[40px] px-2 bottom-12">

                    <div className="flex flex-col p-2 text-[13px] gap-2">
                        <label className="text-black mr-6 font-bold" htmlFor="name">نام کاربری</label>
                        <input
                            value={registerFrom?.username ?? ''}
                            onChange={e => formUpdater('username', e.target.value)}
                            className="p-3 input-shadow rounded-lg placeholder:text-[12px] invalid:border-white-red text-[15px] text-gray-500 outline-none" type="text" placeholder="نام کاربری خود را وارد کنید" />
                    </div>

                    <div className="flex flex-col p-2 text-[13px] gap-2">
                        <label className="text-black mr-6 font-bold" htmlFor="name">ایمیل</label>
                        <input
                            value={registerFrom?.email ?? ''}
                            onChange={e => formUpdater('email', e.target.value)}
                            className="p-3 input-shadow rounded-lg placeholder:text-[12px] invalid:border-white-red text-[15px] text-gray-500 outline-none" type="email" placeholder="ایمیل خود را وارد کنید" />
                    </div>

                    <div className="flex flex-col p-2 text-[13px] gap-2">
                        <label className="text-black mr-6 font-bold" htmlFor="name">رمز عبور</label>
                        <input
                            value={registerFrom?.password ?? ''}
                            onChange={e => formUpdater('password', e.target.value)}
                            className="p-3 input-shadow rounded-lg placeholder:text-[12px] text-[15px] text-gray-500 outline-none" type="text" placeholder="رمز خود را وارد کنید" />
                    </div>

                    <div className="flex flex-col p-2 text-[13px] gap-2">
                        <label className="text-black mr-6 font-bold" htmlFor="name">تایید رمز عبور</label>
                        <input
                            value={registerFrom?.confirmPassword ?? ''}
                            onChange={e => formUpdater('confirmPassword', e.target.value)}
                            className="p-3 input-shadow rounded-lg placeholder:text-[12px] text-[15px] text-gray-500 outline-none" type="text" placeholder="رمز عبور خود را تایید کنید" />
                    </div>

                    <button
                        disabled={loading}
                        onClick={formSubmit}
                        className="px-2 text-white bg-black rounded-xl mt-12 text-center text-xl font-peyda p-3 w-full">
                        {
                            !loading
                                ?
                                <div>ثبت نام</div>
                                :
                                <Loader />
                        }
                    </button>
                </form>

                <div className="text-[13px] m-auto pb-2 text-gray-600 text-center">حساب کاربری دارید؟ <Link className="text-black underline font-bold" href="/login">وارد شوید</Link></div>
            </div>

        </section>
    )
}

export default Register