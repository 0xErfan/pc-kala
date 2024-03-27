import { ReactElement } from "react"

interface ButtonProops {
    filled?: boolean
    active?: boolean
    fn: () => unknown
    text: string
    Icon?: ReactElement
}

const Button: React.FC<ButtonProops> = ({ filled, active, fn, text, Icon }) => {
    return (
        <button
            disabled={active}
            onClick={fn}
            className={` text-white ${filled ? "bg-white-red" : "bordered-btn"} rounded-md p-3 text-[12px] transition-all `}>
            <div className="z-10 flex items-center gap-2 relative"><div className="ch:size-5">{Icon}</div>{text}</div>
        </button>
    )
}

export default Button
