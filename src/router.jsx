import { createBrowserRouter } from "react-router-dom";
import App from "../src/App"
import Home from "./pages/home";
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";


const router = createBrowserRouter([
    {
        path: "/",
        element:<App/>,
        children:[
            {
                path: "/",
                element:<Home/>
            },
            {
                path:"/all-products",
                element:<ContactPage/>
            },{
                path:"/about",
                element:<AboutPage/>
            }, {
                path: "/product/:id", 
                element: <ProductDetails />,
              }
        ]
    },
    {
        path:"/register",
        element:<Register/>
    }
])
export default router;