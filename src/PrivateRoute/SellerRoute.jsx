import React from 'react';
import useSeller from '../hooks/useSeller';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const SellerRoute = ({ children }) => {
    const [seller, sellerLoding] = useSeller()
    const { loder } = useAuth()
    if (loder || sellerLoding) {
        return <span className="loading loading-bars loading-lg"></span>
    }
    if (seller) {
        return children
    }
    return <Navigate to='/login'></Navigate>
};

export default SellerRoute;