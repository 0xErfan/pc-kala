import { useRoutes } from "react-router-dom"
import { routes } from "./routes"
import { useEffect } from "react";
import Aos from "aos";
import 'aos/dist/aos.css'
import { getAllProducts } from './Redux/Features/productsSlice'
import { useAppDispatch } from "./Hooks";

function App() {

    const route = useRoutes(routes)
    const dispatch = useAppDispatch()

    useEffect(() => { Aos.init(), dispatch(getAllProducts()) }, []);

    return (route)
}

export default App