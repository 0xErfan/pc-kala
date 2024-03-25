import { useRoutes } from "react-router-dom"
import { routes } from "./routes"

function App() {

    const route = useRoutes(routes)

    return (
        <div className="font-sans max-w-[1340px] w-full " >
            {route}
        </div>
    )
}

export default App