import React from 'react';
import useUserR from '../hooks/useUserR';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import Loading from '../Components/Loading/Loading';

const UserRoutes = ({ children }) => {
  const [userR, userRLoding] = useUserR();
  const { loder } = useAuth();
  if (loder || userRLoding) {
    return <Loading />;
  }
  if (userR) {
    return children;
  }
  return <Navigate to='/login'></Navigate>;
};

export default UserRoutes;
