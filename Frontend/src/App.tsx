import { useRoutes } from "react-router-dom"
import { routes } from "./routes"
import { useEffect } from "react";
import Aos from "aos";
import 'aos/dist/aos.css'

function App() {

    const route = useRoutes(routes)

    useEffect(() => { Aos.init() }, []);

    return (route)
}

export default App