import { useRoutes } from "react-router-dom"
import { routes } from "./routes"
import { useEffect } from "react";
import Aos from "aos";
import 'aos/dist/aos.css'
import { useAppDispatch } from "./Hooks/useRedux";
import { fetchData, showToast } from "./utils";

function App() {

    useEffect(() => {

        (async () => {
            const posts = await fetchData('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST', body: {
                    title: 'foo',
                    body: 'bar',
                    userId: 1,
                }
            })
            console.log(posts)
            showToast(true, 'سلام ممو')
        })()

    }, [])

    const route = useRoutes(routes)
    const dispatch = useAppDispatch()

    useEffect(() => { Aos.init() }, []);

    return (route)
}

export default App