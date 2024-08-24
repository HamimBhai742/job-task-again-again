import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";
import Register from "../Pages/SignUp/Register";
import Login from "../Pages/SignIn/Login";
import AddProduct from "../Pages/AddProduct/AddProduct";
import ProtectedRoute from "../PrivateRoute/ProtectedRoute";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../Pages/MyCart/MyCart";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/product',
                element: <ProtectedRoute><Products></Products></ProtectedRoute>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/add-product',
                element: <ProtectedRoute><AddProduct></AddProduct></ProtectedRoute>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: '/dashboard/my-cart',
                element: <MyCart></MyCart>
            }
        ]
    }
]);
export default router;