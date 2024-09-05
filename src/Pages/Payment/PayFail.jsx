import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const PayFail = () => {
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
              <div id="payment-failed-modal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                    <p className='flex justify-center'><img src="/multiply.png" className='w-20' alt="" /></p>
                    <h2 class="text-2xl font-bold text-red-600 mb-4">Payment Failed</h2>
                    <p class="text-gray-700 mb-6">Unfortunately, your payment could not be processed. Please try again or contact support if the issue persists.</p>
                    <button onClick={handelBackBtn} class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                        Retry Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PayFail;