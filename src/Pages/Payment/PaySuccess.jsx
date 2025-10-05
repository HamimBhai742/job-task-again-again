import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaShoppingBag, FaHistory  } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const PaySuccess = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        setShowConfetti(true);
        const timer = setTimeout(() => setShowConfetti(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    const handelBackBtn = async () => {
        const res = await axiosPublic.delete(`/pay-step?email=${user?.email}`);
        console.log(res.data);
        navigate('/dashboard/history');
    };

    // Confetti particles
    const confettiParticles = Array.from({ length: 50 }, (_, i) => (
        <motion.div
            key={i}
            initial={{
                opacity: 0,
                y: -100,
                x: Math.random() * window.innerWidth,
                rotate: 0
            }}
            animate={showConfetti ? {
                opacity: [0, 1, 0],
                y: window.innerHeight + 100,
                rotate: 360 * 3
            } : {}}
            transition={{
                duration: 3,
                delay: Math.random() * 2,
                ease: "easeOut"
            }}
            className={`absolute w-3 h-3 ${
                Math.random() > 0.5 ? 'bg-yellow-400' :
                Math.random() > 0.5 ? 'bg-green-400' : 'bg-blue-400'
            } rounded-full`}
            style={{
                left: Math.random() * 100 + '%'
            }}
        />
    ));

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-green-900/90 via-emerald-900/90 to-teal-900/90 backdrop-blur-sm z-50">
            {/* Confetti Animation */}
            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    {confettiParticles}
                </div>
            )}

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [360, 180, 0]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-teal-400/20 to-green-400/20 rounded-full blur-3xl"
                />
            </div>

            {/* Success Modal */}
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
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>

                <div className="relative z-10">
                    {/* Success Icon */}
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
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 opacity-20 scale-150"
                            />
                            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
                                <FaCheckCircle className="text-4xl text-white" />
                            </div>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute -top-2 -right-2"
                            >
                                <HiSparkles className="text-yellow-400 text-2xl" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Success Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
                            Payment Successful!
                        </h2>
                        <p className="text-white/80 text-lg mb-8 leading-relaxed">
                            🎉 Thank you for your purchase! Your order is being processed and will be shipped soon.
                        </p>
                    </motion.div>

                    {/* Order Details */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/20"
                    >
                        <div className="flex items-center justify-center space-x-2 text-white/90">
                            <FaShoppingBag className="text-green-400" />
                            <span className="font-medium">Order confirmed & processing</span>
                        </div>
                    </motion.div>

                    {/* Action Button */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handelBackBtn}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                        <FaHistory className="text-lg" />
                        <span>View Order History</span>
                    </motion.button>

                    {/* Additional Info */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        className="text-white/60 text-sm mt-4"
                    >
                        You'll receive an email confirmation shortly
                    </motion.p>
                </div>
            </motion.div>
        </div>
    );
};

export default PaySuccess;
