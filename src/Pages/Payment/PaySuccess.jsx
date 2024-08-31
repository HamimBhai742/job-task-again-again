import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PaySuccess = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const handelBackBtn = async () => {
        const res = await axiosPublic.delete(`/pay-step?email=${user?.email}`)
        console.log(res.data);
        navigate('/dashboard/history')
    }
    return (
        <div>
            <div id="payment-success-modal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                    <p className='flex justify-center'> <img src="/check.png" className='w-24 flex' alt="" /></p>
                    <h2 class="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h2>
                    <p class="text-gray-700 mb-6">Thank you for your purchase. Your order is being processed and will be shipped soon.</p>
                    <button class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" onClick={handelBackBtn}>
                        View Order History
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaySuccess;