import { ReactElement } from "react"

interface ButtonProops {
    filled?: boolean
    active?: boolean
    fn: () => unknown
    text?: string
    size?: "sm" | "md"
    Icon?: ReactElement
}

const Button: React.FC<ButtonProops> = ({ filled, active, fn, text, Icon, size = "md" }) => {
    return (
        <button
            disabled={active}
            onClick={fn}
            className={` text-white ${filled ? "bg-white-red" : "bordered-btn"} rounded-md ${ size == "md" ? "p-3" : "p-2" } text-[12px] transition-all shrink`}>
            <div className="z-10 flex items-center gap-2 shrink relative px-1"> {Icon && <div className="ch:size-5">{Icon}</div> } {text}</div>
        </button>
    )
}

export default Button;
