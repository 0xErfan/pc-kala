import { ScrollRestoration, useRoutes } from "react-router-dom"
import { routes } from "./routes"
import { useEffect, useState } from "react";
import Aos from "aos";
import 'aos/dist/aos.css'
import { useAppDispatch } from "./Hooks/useRedux";
import { fetchData, showToast } from "./utils";
import { FaArrowUp } from "react-icons/fa6";

function App() {

    const [scrollUpShown, setScroolUpShown] = useState(false)

    // useEffect(() => {

    //     (async () => {
    //         const posts = await fetchData('https://jsonplaceholder.typicode.com/posts', {
    //             method: 'POST', body: {
    //                 title: 'foo',
    //                 body: 'bar',
    //                 userId: 1,
    //             }
    //         })
    //         console.log(posts)
    //         showToast(true, 'سلام ممو')
    //     })()

    // }, [])

    useEffect(() => {
        window.addEventListener('scroll', () => { setScroolUpShown(window.pageYOffset > 0 ? true : false), console.log(window.pageYOffset) })
        return () => window.removeEventListener('scroll', () => { setScroolUpShown(window.pageYOffset > 0 ? true : false) })
    }, [])

    const route = useRoutes(routes)
    const dispatch = useAppDispatch()

    useEffect(() => { Aos.init() }, []);

    return (
        <>
            <span
                onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}
                className={`xl:fixed xl:flex items-center justify-center hidden left-10 ${scrollUpShown ? 'left-10 opacity-100' : '-left-12 opacity-0'} border border-white/30 cursor-pointer duration-400 rounded-md bottom-32 bg-secondary-black transition-all text-white size-12 ch:size-5`}><FaArrowUp /></span>
            {route}
        </>
    )
}

export default App;