import { useRoutes } from "react-router-dom"
import { routes } from "./routes"
import Header from "./components/Header"

function App() {

    const route = useRoutes(routes)

    return (
        <div className="font-sans max-w-[1340px] w-full " >
            <Header />
            {route}
        </div>
    )
}

export default App