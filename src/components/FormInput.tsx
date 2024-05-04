import { inputValidationProps, inputValidations } from "@/utils";
import { useEffect, useState } from "react";

interface formInputProps {
    label: string
    placeHolder: string
    type?: string
    confirmPassword?: string
    id: string
    updater: any
    errorUpdater: any
}

const FormInput = ({ label, placeHolder, type = 'text', id, confirmPassword, updater, errorUpdater }: formInputProps) => {

    const [errorPayload, setErrorPayload] = useState<{ isShown: boolean, message: string | null }>({ isShown: false, message: null })
    const [value, setValue] = useState('')

    useEffect(() => {
        updater(id, value)
        if (!value.length) return

        const timeOut = setTimeout(validateInput, 500);
        return () => clearTimeout(timeOut)
    }, [value])

    useEffect(() => { errorUpdater(errorPayload) }, [errorPayload])

    const validateInput = () => {
        const { isValid, errorMessage }: inputValidationProps = inputValidations(id, value, id === 'confirmPassword' ? confirmPassword : "")!
        setErrorPayload({ isShown: !isValid, message: errorMessage })
    }

    return (
        <div className="flex flex-col p-2 text-[13px] gap-2">
            <label className="text-black mr-6 font-bold" htmlFor={id}>{label}</label>
            <input
                name={id}
                value={value}
                onChange={e => setValue(e.target.value)}
                className={`p-3 input-shadow rounded-lg transition-all placeholder:text-[12px] ${errorPayload.isShown && 'border border-white-red'} text-[15px] text-gray-500 outline-none`} type={type} placeholder={placeHolder} />
        </div>
    )
}

export default FormInput;