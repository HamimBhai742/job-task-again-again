import React from 'react';
import useSeller from '../hooks/useSeller';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import Loading from '../Components/Loading/Loading';

const SellerRoute = ({ children }) => {
    const [seller, sellerLoding] = useSeller()
    const { loder } = useAuth()
    if (loder || sellerLoding) {
        return <Loading/>
    }
    if (seller) {
        return children
    }
    return <Navigate to='/login'></Navigate>
};

export default SellerRoute;