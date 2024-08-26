import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from './useAxiosPublic';

const useUser = () => {
    const axiosPublic = useAxiosPublic()
    const { data: userDB = [], refetch } = useQuery({
        queryKey: ['userDB'],
        queryFn: async () => {
            const UD = await axiosPublic.get(`/user`)
            return UD.data;
        }
    })
    return [userDB, refetch]
};

export default useUser;