import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';
import useUser from './useUser';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const [userDB] = useUser()
    // console.log(userDB, user);
    // console.log(user.email);
    const { data: admin = [], isPending: adminLoding, refetch } = useQuery({
        queryKey: ['admin'],
        queryFn: async () => {
            const us = await userDB.find(u => u.email === user?.email)
            const roleCheak = us.role === 'admin'
            console.log(us);
            return roleCheak;
        }
    })
    return [admin, adminLoding, refetch]
};

export default useAdmin;