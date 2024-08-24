import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from './useAxiosPublic';

const useMyCarts = () => {
    const axiosPublic = useAxiosPublic()
    const { data: myCarts = [], refetch } = useQuery({
        queryKey: ['myCarts'],
        queryFn: async () => {
            const my = await axiosPublic.get('/my-carts')
            return my.data;
        }
    })
    return [myCarts, refetch]
};

export default useMyCarts;