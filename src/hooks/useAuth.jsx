import React, { useContext } from 'react';
import { AuthContext } from '../Authtication/Authtication';

const useAuth = () => {
        const Auth = useContext(AuthContext)
        return Auth
};

export default useAuth;