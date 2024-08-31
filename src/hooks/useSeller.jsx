import React from 'react';
import useUser from './useUser';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useSeller = () => {
    const { user } = useAuth()
    const [userDB] = useUser()
    // console.log(userDB, user);
    // console.log(user.email);
    const { data: seller = [], isPending: sellerLoding, refetch } = useQuery({
        queryKey: ['seller'],
        queryFn: async () => {
            const us = await userDB.find(u => u.email === user?.email)
            const roleCheak = us.role === 'seller'
            console.log(us);
            return roleCheak;
        }
    })
    return [seller, sellerLoding, refetch]
};

export default useSeller;