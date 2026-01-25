import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '/home/hamim/hamim/job-task-again/src/Layout/Dashboard';
import PayLaout from '/home/hamim/hamim/job-task-again/src/Layout/PayLaout';
import Root from '/home/hamim/hamim/job-task-again/src/Layout/Root';
import AddProduct from '/home/hamim/hamim/job-task-again/src/Pages/AddProduct/AddProduct';
import LeaderBoard from '/home/hamim/hamim/job-task-again/src/Pages/DashBoard/LeaderBoard';
import History from '/home/hamim/hamim/job-task-again/src/Pages/History/History';
import Home from '/home/hamim/hamim/job-task-again/src/Pages/Home/Home';
import ManageUser from '/home/hamim/hamim/job-task-again/src/Pages/ManageAll/ManageUser';
import MyCart from '/home/hamim/hamim/job-task-again/src/Pages/MyCart/MyCart';
import MyProducts from '/home/hamim/hamim/job-task-again/src/Pages/MyProducts/MyProducts';
import PayCancel from '/home/hamim/hamim/job-task-again/src/Pages/Payment/PayCancel';
import PayFail from '/home/hamim/hamim/job-task-again/src/Pages/Payment/PayFail';
import PaymentS1 from '/home/hamim/hamim/job-task-again/src/Pages/Payment/PaymentS1';
import PaySuccess from '/home/hamim/hamim/job-task-again/src/Pages/Payment/PaySuccess';
import Products from '/home/hamim/hamim/job-task-again/src/Pages/Products/Products';
import Login from '/home/hamim/hamim/job-task-again/src/Pages/SignIn/Login';
import Register from '/home/hamim/hamim/job-task-again/src/Pages/SignUp/Register';
import AdminRoute from '/home/hamim/hamim/job-task-again/src/PrivateRoute/AdminROute';
import ProtectedRoute from '/home/hamim/hamim/job-task-again/src/PrivateRoute/ProtectedRoute';
import SellerRoute from '/home/hamim/hamim/job-task-again/src/PrivateRoute/SellerRoute';
import UserRoutes from '/home/hamim/hamim/job-task-again/src/PrivateRoute/UserRoutes';
import UpdateMyPro from '../Pages/Update/UpdateMyPro';
import HelpSupport from '../Pages/helpSupport/HelpSupport';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/product',
        element: <Products></Products>,
      },
      {
        path: '/register',
        element: <Register></Register>,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: '/dashboard',
        element: <LeaderBoard></LeaderBoard>,
      },
      {
        path: '/dashboard/my-cart',
        element: (
          <ProtectedRoute>
            <UserRoutes>
              <MyCart></MyCart>
            </UserRoutes>
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard/history',
        element: (
          <ProtectedRoute>
            <UserRoutes>
              <History></History>
            </UserRoutes>
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard/manage-all',
        element: (
          <ProtectedRoute>
            <AdminRoute>
              <ManageUser></ManageUser>
            </AdminRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard/my-products',
        element: (
          <ProtectedRoute>
            <SellerRoute>
              <MyProducts></MyProducts>
            </SellerRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard/update-my-product/:id',
        element: (
          <ProtectedRoute>
            <SellerRoute>
              <UpdateMyPro></UpdateMyPro>
            </SellerRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard/help&support',
        element: <HelpSupport />,
      },
      {
        path: '/dashboard/add-product',
        element: (
          <ProtectedRoute>
            <AddProduct></AddProduct>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/payment',
    element: <PayLaout></PayLaout>,
    children: [
      {
        path: '/payment/shopping',
        element: <PaymentS1></PaymentS1>,
      },
      {
        path: '/payment/success',
        element: <PaySuccess></PaySuccess>,
      },
      {
        path: '/payment/fail',
        element: <PayFail></PayFail>,
      },
      {
        path: '/payment/cancel',
        element: <PayCancel></PayCancel>,
      },
    ],
  },
]);
export default router;
