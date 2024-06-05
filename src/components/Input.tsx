import React, { ReactNode, useEffect, useState } from "react"

interface inputProps {
    required?: boolean
    title: string
    placeHolder?: string
    name: string
    type?: string
    children?: ReactNode
    fn: (name: string, value: string) => unknown
}

export const Input = ({ required = true, title, placeHolder, type = "text", name, fn, children }: inputProps) => {

    const [value, setValue] = useState("")
    const [formError, setFormError] = useState<{ isErrorShown: boolean, errorMessage: string }>({ isErrorShown: false, errorMessage: "" })

    const showError = (status: boolean) => { setFormError(prev => ({ ...prev, isErrorShown: status })); return }

    const inputValueChecker = (e: React.FocusEvent<HTMLInputElement>) => {

        const valueToCheck = e.target.value.trim()
        if (valueToCheck.length == 0) showError(false)

        const emailRegex = /^[\w-]+@[a-zA-Z\d-]+\.[a-zA-Z]{2,}$/;
        const phoneNumberRegex = /^09\d{9}$/

        switch (name) {
            case "name": { showError(value.length <= 2 || false); break }
            case "province": { showError(!value.length); break }
            case "lName": { showError(value.length <= 2 || false); break }
            case "email": { showError(!emailRegex.test(value)); break }
            case "codePost": { showError(!(!isNaN(+value) && String(value).length == 10)); break }
            case "phoneNum": { showError(!phoneNumberRegex.test(value)); break }
        }
    }

    useEffect(() => {
        switch (name) {
            case "name": { setFormError(prev => ({ ...prev, errorMessage: "نام باید حداقل سه کاراکتر باشد " })); break }
            case "lName": { setFormError(prev => ({ ...prev, errorMessage: "نام خانوادگی باید حداقل سه کاراکتر باشد " })); break }
            case "email": { setFormError(prev => ({ ...prev, errorMessage: "ایمیل خود را به درستی وارد کنید" })); break }
            case "codePost": { setFormError(prev => ({ ...prev, errorMessage: "کد پستی را به درستی وارد کنید" })); break }
            case "phoneNum": { setFormError(prev => ({ ...prev, errorMessage: "شماره موبایل  نامعتبر است" })); break }
            case "ostan": { setFormError(prev => ({ ...prev, errorMessage: "استان خود را انتخاب کنید" })); break }
            case "province": { setFormError(prev => ({ ...prev, errorMessage: "اسم خیابان را وارد کنید" })); break }
            default: console.error("invalid input name => ", name)
        }
    }, [name])

    useEffect(() => { fn(name, value) }, [value])

    return (
        <div className="flex flex-col gap-2 text-[12px] text-description-text">
            <label className="text-[11px]">{title}{required && " *"}</label>
            {
                children
                    ?
                    <select
                        className="bg-primary-black outline-none border rounded-md border-white/20 p-2" onChange={e => setValue(e.target.value)}>
                        {children}
                    </select>
                    :
                    <>
                        <input
                            className={`appearance bg-primary-black outline-none border rounded-md border-white/20 p-2`}
                            type={type}
                            placeholder={placeHolder}
                            value={value}
                            name={name}
                            onChange={e => setValue(e.target.value)}
                            onBlur={inputValueChecker}
                        />
                        {formError.isErrorShown && <span className={`text-white-red duration-200 text-[10px] ${formError.isErrorShown ? "opacity-100" : "opacity-0"} transition-all`}>{formError.errorMessage}</span>}
                    </>
            }
        </div>
    )
}
