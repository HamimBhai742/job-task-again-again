import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';

const useMyCarts = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    // console.log(user.email);
    const { data: myCarts = [], refetch } = useQuery({
        queryKey: ['myCarts'],
        queryFn: async () => {
            const my = await axiosPublic.get(`/my-carts?email=${user?.email}`)
            return my.data;
        }
    })
    return [myCarts, refetch]
};

export default useMyCarts;