import React from 'react';
import useUserR from '../hooks/useUserR';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const UserRoutes = ({children}) => {
    const [userR, userRLoding] = useUserR()
    const { loder } = useAuth()
    if (loder || userRLoding) {
        return <span className="loading loading-bars loading-lg"></span>
    }
    if (userR) {
        return children
    }
    return <Navigate to='/login'></Navigate>
};

export default UserRoutes;