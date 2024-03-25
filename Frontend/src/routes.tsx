import Home from "./Pages/Home"

export const routes = [
    { path: "/", element: <Home /> },
    { path: "/data", element: <div>ff</div> },
    { path: "/*", element: <div>صفحه یافت نشد</div> },
]