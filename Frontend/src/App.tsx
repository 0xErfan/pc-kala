import { useRoutes } from "react-router-dom"
import { routes } from "./routes"
import { useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css'

function App() {

    const route = useRoutes(routes)

    useEffect(() => { AOS.init() }, []);

    return (route)
}

export default App