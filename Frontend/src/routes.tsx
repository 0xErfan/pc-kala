import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Product from "./Pages/Product"
import Register from "./Pages/Register"

export const routes = [
    { path: "/", element: <Home /> },
    { path: "/products/:id", element: <Product /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/*", element: <div>صفحه یافت نشد</div> },
]