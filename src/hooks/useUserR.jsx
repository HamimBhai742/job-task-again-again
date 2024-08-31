import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useUser from './useUser';

const useUserR = () => {
    const { user } = useAuth()
    const [userDB] = useUser()
    // console.log(userDB, user);
    // console.log(user.email);
    const { data: userR = [], isPending: userRLoding, refetch } = useQuery({
        queryKey: ['userR'],
        queryFn: async () => {
            const us = await userDB.find(u => u.email === user?.email)
            const roleCheak = us.role === 'user'
            console.log(us);
            return roleCheak;
        }
    })
    return [userR, userRLoding, refetch]
};

export default useUserR;