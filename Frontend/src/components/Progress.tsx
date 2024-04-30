import { useEffect, useState } from "react"
import { CgFileDocument } from "react-icons/cg"

const Progress = () => {

    const [routeParam, setRouteParam] = useState("")

    useEffect(() => { setRouteParam(location.pathname) }, [location.pathname])

    const progressPercentage: number = routeParam == '/checkout' ? 2 : routeParam == '/success-purchase' ? 3 : 1

    return (
        <div className="flex items-center justify-evenly gap-12 relative mb-12 container text-[12px]">

            <span style={{ width: `${33.333 * progressPercentage}%` }} className="absolute rounded-sm animate-pulse right-0 h-4 z-20 bg-blue-white top-4"></span>
            <span className="absolute rounded-sm w-full right-0 h-4 z-10 bg-secondary-black top-4"></span>

            <div className="flex items-center flex-col gap-2 z-30">
                <CgFileDocument className="size-11 rounded-md text-dark-red/90 p-2 bg-secondary-black" />
                <p className="text-description-text transition-all hover:text-white">سبد خرید</p>
            </div>
            <div className="flex items-center flex-col gap-2 z-30">
                <CgFileDocument className="size-11 rounded-md text-dark-red/90 p-2 bg-secondary-black" />
                <p className="text-description-text transition-all hover:text-white">جزئیات پرداخت</p>
            </div>
            <div className="flex items-center flex-col gap-2 z-30">
                <CgFileDocument className="size-11 rounded-md text-dark-red/90 p-2 bg-secondary-black" />
                <p className="text-description-text transition-all hover:text-white">تکمیل سفارش</p>
            </div>

        </div>
    )
}

export default Progress