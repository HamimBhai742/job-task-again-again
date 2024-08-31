import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const PayCancel = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const handelBackBtn = async () => {
        const res = await axiosPublic.delete(`/pay-step?email=${user?.email}`)
        console.log(res.data);
        navigate('/dashboard/my-cart')
    }

    return (
        <div>
            <div id="payment-cancelled-modal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
                <div class="bg-gradient-to-r from-red-400 to-red-600 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center transform transition-transform duration-300 scale-95">
                    <div class="text-white">
                        <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 5.636a9 9 0 11-12.728 0 9 9 0 0112.728 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 9l-6 6M9 9l6 6"></path>
                        </svg>
                        <h2 class="text-3xl font-extrabold mb-3">Payment Cancelled</h2>
                        <p class="text-lg mb-6">Your payment has been cancelled. If this was a mistake, you can restart the payment process.</p>
                        <button class="bg-white text-red-600 font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition duration-200" onClick={handelBackBtn}>
                            Restart Payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayCancel;