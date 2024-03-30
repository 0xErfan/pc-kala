import Home from "./Pages/Home"
import Product from "./Pages/Product"

export const routes = [
    { path: "/", element: <Home /> },
    { path: "/products/:id", element: <Product /> },
    { path: "/*", element: <div>صفحه یافت نشد</div> },
]