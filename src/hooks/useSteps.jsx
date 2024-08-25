import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useSteps = () => {
    const axiosPublic = useAxiosPublic()
    const { data: stp = [] } = useQuery({
        queryKey: ['step'],
        queryFn: async () => {
            const stp = await axiosPublic.get('/pay-setp')
            return stp.data;
        }
    })
    return [stp]
};

export default useSteps;