import { useEffect, useState } from "react"
import { FaArrowUp } from "react-icons/fa"

const ScroolToTop = () => {

    const [scrollUpShown, setScroolUpShown] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => setScroolUpShown(window.pageYOffset > 0 ? true : false))
        return () => window.removeEventListener('scroll', () => { setScroolUpShown(window.pageYOffset > 0 ? true : false) })
    }, [])

    return (<span onClick={() => scrollTo({ top: 0, behavior: 'smooth' })} className={`xl:fixed z-50 xl:flex items-center justify-center hidden ${scrollUpShown ? 'left-8 opacity-100' : '-left-8 opacity-0'} border border-white/30 cursor-pointer transition-all rounded-md bottom-12 bg-secondary-black text-white size-12 ch:size-5`}><FaArrowUp /></span>)
}

export default ScroolToTop;