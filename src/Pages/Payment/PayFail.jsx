import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTimesCircle, FaRedo, FaExclamationTriangle, FaHeadset } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const PayFail = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handelBackBtn = async () => {
        const res = await axiosPublic.delete(`/pay-step?email=${user?.email}`);
        console.log(res.data);
        navigate('/dashboard/my-cart');
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-red-900/90 via-pink-900/90 to-rose-900/90 backdrop-blur-sm z-50">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, -90, -180]
                    }}
                    transition={{ 
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ 
                        scale: [1.1, 1, 1.1],
                        rotate: [-180, -90, 0]
                    }}
                    transition={{ 
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-rose-400/20 to-red-400/20 rounded-full blur-3xl"
                />
            </div>

            {/* Failure Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20,
                    duration: 0.6
                }}
                className="relative bg-white/15 backdrop-blur-2xl border border-white/30 rounded-3xl p-8 shadow-2xl max-w-md w-full mx-4 text-center overflow-hidden"
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>

                <div className="relative z-10">
                    {/* Failure Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 200, 
                            delay: 0.3 
                        }}
                        className="relative mb-6"
                    >
                        <div className="relative inline-block">
                            <motion.div
                                animate={{ 
                                    scale: [1, 1.1, 1],
                                    opacity: [0.3, 0.6, 0.3]
                                }}
                                transition={{ 
                                    duration: 2, 
                                    repeat: Infinity, 
                                    ease: "easeInOut" 
                                }}
                                className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400 to-pink-500 opacity-20 scale-150"
                            />
                            <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
                                <FaTimesCircle className="text-4xl text-white" />
                            </div>
                            <motion.div
                                animate={{ 
                                    rotate: [0, 10, -10, 0],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{ 
                                    duration: 2, 
                                    repeat: Infinity, 
                                    ease: "easeInOut" 
                                }}
                                className="absolute -top-2 -right-2"
                            >
                                <FaExclamationTriangle className="text-yellow-400 text-xl" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Failure Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent mb-4">
                            Payment Failed
                        </h2>
                        <p className="text-white/80 text-lg mb-8 leading-relaxed">
                            Unfortunately, your payment could not be processed. Please try again or contact support if the issue persists.
                        </p>
                    </motion.div>

                    {/* Error Details */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/20"
                    >
                        <div className="flex items-center justify-center space-x-2 text-white/90">
                            <FaExclamationTriangle className="text-yellow-400" />
                            <span className="font-medium">Payment processing error</span>
                        </div>
                        <p className="text-white/70 text-sm mt-2">
                            Your card was not charged
                        </p>
                    </motion.div>

                    {/* Action Buttons */}
                    <div className="space-y-4">
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            whileHover={{ 
                                scale: 1.05, 
                                boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)" 
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handelBackBtn}
                            className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                            <FaRedo className="text-lg" />
                            <span>Retry Payment</span>
                        </motion.button>

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.0 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-white/10 border border-white/30 text-white font-medium py-3 px-6 rounded-2xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                            <FaHeadset className="text-lg" />
                            <span>Contact Support</span>
                        </motion.button>
                    </div>

                    {/* Additional Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="mt-6 p-3 bg-blue-500/20 border border-blue-500/30 rounded-xl"
                    >
                        <p className="text-blue-300 text-sm">
                            💡 Try using a different payment method or check your card details
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default PayFail;
