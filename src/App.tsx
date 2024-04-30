import { useRoutes } from "react-router-dom"
import { routes } from "./routes"
import { useEffect, useState } from "react";
import Aos from "aos";
import 'aos/dist/aos.css'
import { FaArrowUp } from "react-icons/fa6";

function App() {

    const [scrollUpShown, setScroolUpShown] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => setScroolUpShown(window.pageYOffset > 0 ? true : false))
        return () => window.removeEventListener('scroll', () => { setScroolUpShown(window.pageYOffset > 0 ? true : false) })
    }, [])

    const route = useRoutes(routes)
    useEffect(() => { Aos.init() }, []);

    return (
        <>
            <span
                onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}
                className={`xl:fixed z-50 xl:flex items-center justify-center hidden left-10 ${scrollUpShown ? 'left-10 opacity-100' : '-left-12 opacity-0'} border border-white/30 cursor-pointer duration-400 rounded-md bottom-12 bg-secondary-black transition-all text-white size-12 ch:size-5`}><FaArrowUp /></span>
            {route}
        </>
    )
}

export default App;