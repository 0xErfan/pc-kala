import { useAppDispatch } from "@/Hooks/useRedux"
import { isScrolledDownUpdater } from "@/Redux/Features/globalVarsSlice"
import { useEffect, useState } from "react"
import { FaArrowUp } from "react-icons/fa"

const ScroolToTop = () => {

    const [scrollUpShown, setScroolUpShown] = useState(false)
    const [previousScrollValue, setPreviousScrollValue] = useState(window.pageYOffset)

    const dispatch = useAppDispatch()

    useEffect(() => {

        const handleScroll = () => {
            setScroolUpShown(window.pageYOffset > 0 ? true : false)
            dispatch(isScrolledDownUpdater(window.pageYOffset > previousScrollValue ? false : true))
            setPreviousScrollValue(window.pageYOffset)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
        
    }, [previousScrollValue, dispatch])

    return (<span onClick={() => scrollTo({ top: 0, behavior: 'smooth' })} className={`xl:fixed z-50 xl:flex items-center justify-center hidden ${scrollUpShown ? 'left-8 opacity-100' : '-left-8 opacity-0'} border border-white/30 cursor-pointer transition-all rounded-md bottom-12 bg-secondary-black text-white size-12 ch:size-5`}><FaArrowUp /></span>)
}

export default ScroolToTop;