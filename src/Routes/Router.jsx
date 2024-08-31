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
import PayLaout from "../Layout/PayLaout";
import PaymentS1 from "../Pages/Payment/PaymentS1";
import PaySuccess from "../Pages/Payment/PaySuccess";
import PayFail from "../Pages/Payment/PayFail";
import PayCancel from "../Pages/Payment/PayCancel";
import History from "../Pages/History/History";
import AdminRoute from "../PrivateRoute/AdminROute";
import UserRoutes from "../PrivateRoute/UserRoutes";
import SellerRoute from "../PrivateRoute/sellerRoute";
import ManageUser from "../Pages/ManageAll/ManageUser";
import DashBoard from "../Pages/DashBoard/LeaderBoard";
import LeaderBoard from "../Pages/DashBoard/LeaderBoard";
import MyProducts from "../Pages/MyProducts/MyProducts";


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
                path: '/dashboard/das',
                element: <LeaderBoard></LeaderBoard>
            },
            {
                path: '/dashboard/my-cart',
                element: <ProtectedRoute><UserRoutes><MyCart></MyCart></UserRoutes></ProtectedRoute>
            },
            {
                path: '/dashboard/history',
                element: <ProtectedRoute><UserRoutes><History></History></UserRoutes></ProtectedRoute>
            },
            {
                path: '/dashboard/manage-all',
                element: <ProtectedRoute><AdminRoute><ManageUser></ManageUser></AdminRoute></ProtectedRoute>
            },
            {
                path: '/dashboard/my-products',
                element: <ProtectedRoute><SellerRoute><MyProducts></MyProducts></SellerRoute></ProtectedRoute>
            },
        ]
    },
    {
        path: '/payment',
        element: <PayLaout></PayLaout>,
        children: [
            {
                path: '/payment/shopping',
                element: <PaymentS1></PaymentS1>
            },
            {
                path: '/payment/success',
                element: <PaySuccess></PaySuccess>
            },
            {
                path: '/payment/fail',
                element: <PayFail></PayFail>
            },
            {
                path: '/payment/cancel',
                element: <PayCancel></PayCancel>
            }
        ]
    },
]);
export default router;