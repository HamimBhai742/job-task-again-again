import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useProducts = () => {
    const axiosPublic = useAxiosPublic()
    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const pro = await axiosPublic.get('/products')
            return pro.data;
        }
    })
    return [products]
};

export default useProducts;