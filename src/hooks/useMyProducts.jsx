import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';


const useMyProducts = () => {
    const axiosPublic = useAxiosPublic()
    const {user}=useAuth()
    console.log(user)
    const { data: myProducts = [] ,refetch} = useQuery({
        queryKey: ['myProducts'],
        queryFn: async () => {
            const mypro = await axiosPublic.get(`/my-products?email=${user?.email}`)
            return mypro.data;
        }
    })
    return [myProducts,refetch]
};

export default useMyProducts;