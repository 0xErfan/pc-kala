import Cart from "./Pages/Cart"
import Checkout from "./Pages/Checkout"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Product from "./Pages/Product"
import Register from "./Pages/Register"
import Search from "./Pages/Search.tsx";

export const routes = [
    {path: "/", element: <Home/>},
    {path: "/products/:id", element: <Product/>},
    {path: "/login", element: <Login/>},
    {path: "/register", element: <Register/>},
    {path: "/cart", element: <Cart/>},
    {path: "/checkout", element: <Checkout/>},
    {path: "/search/:text", element: <Search/>},
    {path: "/*", element: <div>صفحه یافت نشد</div>},
]