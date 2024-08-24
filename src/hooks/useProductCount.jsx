import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from './useAxiosPublic';


const useProductCount = () => {
    const axiosPublic = useAxiosPublic()
    const { data: productsCount = [] } = useQuery({
        queryKey: ['productsCount'],
        queryFn: async () => {
            const cou = await axiosPublic.get('/productsCount')
            return cou.data.count;
        }
    })
    return productsCount
};

export default useProductCount;