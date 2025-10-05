import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import Loading from '../Components/Loading/Loading';

const ProtectedRoute = ({ children }) => {
    const { user,loder } = useAuth()
    if(loder){
        return <Loading/>
    }
    if (user) {
        return children
    }
    return <Navigate to='/login'></Navigate>
};

export default ProtectedRoute;