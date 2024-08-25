import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const PaySuccess = () => {
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
            <p>Payment Success</p>
            <button className='btn btn-accent' onClick={handelBackBtn}>Back</button>

        </div>
    );
};

export default PaySuccess;