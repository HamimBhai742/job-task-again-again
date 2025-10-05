import React from 'react';
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import Loading from '../Components/Loading/Loading';

const AdminRoute = ({children}) => {
    const [admin, adminLoding] = useAdmin()
    const { loder } = useAuth()
    console.log(admin);
    if (loder || adminLoding) {
        return <Loading/>
    }
    if(admin){
        return children
    }
    return <Navigate to='/login'></Navigate>
};

export default AdminRoute;