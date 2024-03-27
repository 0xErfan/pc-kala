interface ButtonProops {
    filled?: boolean
    active?: boolean
    fn: () => unknown
    text: string
}

const Button: React.FC<ButtonProops> = ({ filled, active, fn, text }) => {
    return (
        <button
            disabled={active}
            onClick={fn}
            className={` text-white ${filled ? "bg-white-red" : "bordered-btn"} rounded-md p-3 text-[12px] transition-all `}>
            <div className="z-10 relative " >{text}</div>
        </button>
    )
}

export default Button
