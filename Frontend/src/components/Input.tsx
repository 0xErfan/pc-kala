import { useEffect, useState } from "react"

interface inputProps {
    required?: boolean
    title: string
    placeHolder?: string
    name: string
    type?: string
    fn: (name: string, value: string) => unknown
}

export const Input = ({ required = true, title, placeHolder, type = "text", name, fn }: inputProps) => {

    const [value, setValue] = useState("")

    useEffect(() => { fn(name, value) }, [value])

    return (
        <div className="flex flex-col gap-2 text-[12px] text-description-text">
            <label className="text-[11px]">{title}{required && " *"}</label>
            <input
                className={`${required && "required:border-red-400"} appearance bg-primary-black outline-none border rounded-md border-white/20 p-2`}
                type={type}
                placeholder={placeHolder}
                value={value}
                formAction="falsa"
                name={name}
                onChange={e => setValue(e.target.value)}
            />
        </div>
    )
}
