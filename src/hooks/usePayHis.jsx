
import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

const usePayHis = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const { data: payHis = [], refetch } = useQuery({
        queryKey: ['payment-his'],
        queryFn: async () => {
            const pay = await axiosPublic.get(`/payment-his`)
            return pay.data;
        }
    })
    return [payHis, refetch]
};

export default usePayHis;