import { useRoutes } from "react-router-dom"
import { routes } from "./routes"
import Header from "./components/Header"

function App() {

    const route = useRoutes(routes)

    return (
        route
    )
}

export default App