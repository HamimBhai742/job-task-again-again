import React from 'react';
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const [admin, adminLoding] = useAdmin()
    const { loder } = useAuth()
    console.log(admin);
    if (loder || adminLoding) {
        return <span className="loading loading-bars loading-lg"></span>
    }
    if(admin){
        return children
    }
    return <Navigate to='/login'></Navigate>
};

export default AdminRoute;