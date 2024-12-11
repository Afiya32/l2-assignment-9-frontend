import { createBrowserRouter } from "react-router-dom";
import App from "../src/App"
import Home from "./pages/home";
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import AdminLayout from "./layOut/AdminLayOut"
import Users from "./pages/AdminPage/Users"
import Products from './pages/AdminPage/products'
import Setting from './pages/AdminPage/setting'
import CustomerLayOut from "./layOut/CustomerLayOut";
import CustomerProfile from "./pages/CustomerPage/customerProfile";
import CustomerOrder from "./pages/CustomerPage/CustomerOrder";
import Help from "./pages/CustomerPage/Help"
import VendorLayout from "./layOut/VendorLayOut";
import VendorProducts from "./pages/VendorPage/vendorProducts";
import Order from "./pages/VendorPage/Order"

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
    },{
        path:'/admin-dashboard',
        element:<AdminLayout/>,
        children:[{
            path:'/admin-dashboard',
            element:<Users/>
        },{
            path:'/admin-dashboard/product',
            element:<Products/>
        },{
            path:'/admin-dashboard/setting',
            element:<Setting/>
        }]
    },{
        path:'/customer-dashboard',
        element:<CustomerLayOut/>,
        children:[{
            path:'/customer-dashboard',
            element:<CustomerProfile/>
        },{
            path:'/customer-dashboard/orders',
            element:<CustomerOrder/>
        },{
            path:'/customer-dashboard/help',
            element:<Help/>
        }]
    },{
        path:'/vendor-dashboard',
        element:<VendorLayout/>,
        children:[{
            path:'/vendor-dashboard',
            element:<VendorProducts/>,
        },{
            path:'/vendor-dashboard/orders',
            element:<Order/>
        },{
            path:'/vendor-dashboard/settings',
            element:<Setting/>
        }]
    }
])
export default router;