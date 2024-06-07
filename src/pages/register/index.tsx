import { useAppDispatch } from "@/Hooks/useRedux"
import { userUpdater } from "@/Redux/Features/globalVarsSlice"
import FormInput from "@/components/FormInput"
import Loader from "@/components/Loader"
import { unknownObjProps } from "@/global.t"
import { isEmptyInput, showToast } from "@/utils"
import Link from "next/link"
import { useRouter } from "next/router"
import { FormEvent, useState } from "react"


const Register = () => {

    const [registerFrom, setRegisterFrom] = useState<unknownObjProps<string>>({})
    const [inputValidationErrors, setInputValidationErrors] = useState<{ message: string }[]>([])

    const [loading, setLoading] = useState(false)
    const navigate = useRouter()
    const dispatch = useAppDispatch()

    const formSubmit = async (e: FormEvent) => {

        e.preventDefault();

        if (isEmptyInput(registerFrom, ['username', 'password', 'confirmPassword', 'email'])) return showToast(false, 'لطفا تمام فیلد هارا پر کنید')
        if (registerFrom.password !== registerFrom.confirmPassword) return
        if (inputValidationErrors.length) return showToast(false, inputValidationErrors[0].message)

        setLoading(true)

        try {

            const res = await fetch('/api/auth/register', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registerFrom)
            })

            const data = await res.json()

            if (!res.ok) return showToast(false, data.message, 3200)

            showToast(true, 'ثبت نام با موفقیت انجام شد :))')
            setRegisterFrom({})

            setTimeout(() => { navigate.replace('/'), dispatch(userUpdater()) }, 1700);
        }
        catch (error) { showToast(false, String(error)) }
        finally { setLoading(false) }
    }

    const updateErrorArray = (data: { isShown: boolean, message: string }) => {

        const previousErrors = [...inputValidationErrors]

        const doesErrorExist = previousErrors.some((error: { message: string, isShown?: boolean }) => { // check if the existed error solved, so remove the error by make its isShown prop to false
            if (error.message == data.message) {
                error.isShown = data.isShown
                return true
            }
        })

        const updatedErrors = doesErrorExist ? previousErrors : [...previousErrors, data] // if error already exist, just use the updated error, else add the error

        setInputValidationErrors(updatedErrors.filter((error: unknownObjProps<unknown>) => error.isShown))
    }

    const formUpdater = (prop: string, value: string) => setRegisterFrom({ ...registerFrom, [prop]: value })

    return (
        <section className="flex-center h-screen px-5 bg-title-text">

            <Link className="py-3 px-5 font-peyda absolute top-8 bg-black text-white rounded-md left-8" href="/">بازگشت</Link>

            <div className="max-w-[400px] m-auto shadow-regular w-full overflow-hidden rounded-[47px] p-2">

                <div className="h-[200px] bg-black rounded-t-[40px] text-center flex-center"><div className="text-[30px] pb-16 text-white font-peyda">ثبت نام</div></div>

                <form className="bg-title-text relative pt-12 rounded-tl-[40px] px-2 bottom-12">

                    <FormInput id="username" label="نام کاربری" placeHolder="نام کاربری را وارد کنید" updater={formUpdater} key='username' errorUpdater={updateErrorArray} />
                    <FormInput id="email" label="ایمیل" placeHolder="ایمیل را وارد کنید" updater={formUpdater} key='email' errorUpdater={updateErrorArray} />
                    <FormInput id="password" label="رمز عبور" placeHolder="رمز عبور را وارد کنید" updater={formUpdater} key='password' errorUpdater={updateErrorArray} />
                    <FormInput
                        id="confirmPassword"
                        label="تایید رمز عبور"
                        placeHolder="رمز انتخاب شده را مجدد وارد کنید"
                        updater={formUpdater}
                        key='confirmPassword'
                        confirmPassword={registerFrom?.password}
                        errorUpdater={updateErrorArray}
                    />

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

export default Register;