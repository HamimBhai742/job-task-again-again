import React from 'react';
import useSteps from '../../hooks/useSteps';
import { motion } from 'framer-motion';
import { 
    FaShoppingBag, 
    FaTruck, 
    FaCreditCard, 
    FaCheck, 
    FaTimes,
    FaSpinner
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const Steps = () => {
    const [stp] = useSteps();
    const stps = stp?.find(s => s?.status === 'pending' || s?.status === 'success');
    
    const steps = [
        {
            id: 1,
            title: 'Shop',
            icon: FaShoppingBag,
            status: 'completed',
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            id: 2,
            title: 'Shipping',
            icon: FaTruck,
            status: stps?.status === 'pending' || stps?.status === 'success' ? 'completed' : 'pending',
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            id: 3,
            title: 'Payment',
            icon: FaCreditCard,
            status: stps?.status === 'success' ? 'completed' : stps?.status === 'pending' ? 'pending' : 'inactive',
            gradient: 'from-green-500 to-emerald-500'
        }
    ];

    const getStepIcon = (step) => {
        if (step.status === 'completed') {
            return FaCheck;
        } else if (step.status === 'pending') {
            return FaSpinner;
        } else {
            return step.icon;
        }
    };

    const getStepStyles = (step, index) => {
        const baseStyles = "relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500";
        
        if (step.status === 'completed') {
            return `${baseStyles} bg-gradient-to-r ${step.gradient} border-transparent text-white shadow-lg`;
        } else if (step.status === 'pending') {
            return `${baseStyles} bg-white/20 border-white/40 text-white animate-pulse`;
        } else {
            return `${baseStyles} bg-white/10 border-white/30 text-white/50`;
        }
    };

    const getProgressWidth = () => {
        const completedSteps = steps.filter(step => step.status === 'completed').length;
        const pendingSteps = steps.filter(step => step.status === 'pending').length;
        const totalProgress = completedSteps + (pendingSteps * 0.5);
        return (totalProgress / steps.length) * 100;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl mx-4 my-6"
        >
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
                {/* Logo Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center space-x-3"
                >
                    <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <FaShoppingBag className="text-2xl text-white" />
                        </div>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-1 -right-1"
                        >
                            <HiSparkles className="text-yellow-400 text-lg" />
                        </motion.div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                            NeXaBuY
                        </h2>
                        <p className="text-white/70 text-sm">Checkout Process</p>
                    </div>
                </motion.div>

                {/* Progress Steps */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex-1 max-w-2xl"
                >
                    <div className="relative">
                        {/* Progress Line Background */}
                        <div className="absolute top-6 left-6 right-6 h-1 bg-white/20 rounded-full"></div>
                        
                        {/* Animated Progress Line */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${getProgressWidth()}%` }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            className="absolute top-6 left-6 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full shadow-lg"
                            style={{ maxWidth: 'calc(100% - 48px)' }}
                        />

                        {/* Steps Container */}
                        <div className="relative flex justify-between items-center">
                            {steps.map((step, index) => {
                                const StepIcon = getStepIcon(step);
                                
                                return (
                                    <motion.div
                                        key={step.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 + index * 0.2 }}
                                        className="flex flex-col items-center space-y-3 relative z-10"
                                    >
                                        {/* Step Circle */}
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            className={getStepStyles(step, index)}
                                        >
                                            {step.status === 'pending' ? (
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                >
                                                    <StepIcon className="text-lg" />
                                                </motion.div>
                                            ) : (
                                                <StepIcon className="text-lg" />
                                            )}
                                            
                                            {/* Glow Effect for Active Steps */}
                                            {step.status === 'completed' && (
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1.5, opacity: 0 }}
                                                    transition={{ duration: 1, repeat: Infinity }}
                                                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${step.gradient} opacity-30`}
                                                />
                                            )}
                                        </motion.div>

                                        {/* Step Label */}
                                        <div className="text-center">
                                            <p className={`font-semibold text-sm transition-colors duration-300 ${
                                                step.status === 'completed' 
                                                    ? 'text-white' 
                                                    : step.status === 'pending'
                                                    ? 'text-blue-300'
                                                    : 'text-white/50'
                                            }`}>
                                                {step.title}
                                            </p>
                                            
                                            {/* Status Badge */}
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.8 + index * 0.1 }}
                                                className={`mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                                                    step.status === 'completed'
                                                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                        : step.status === 'pending'
                                                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                                        : 'bg-white/10 text-white/50 border border-white/20'
                                                }`}
                                            >
                                                {step.status === 'completed' && 'Complete'}
                                                {step.status === 'pending' && 'Processing'}
                                                {step.status === 'inactive' && 'Pending'}
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Progress Percentage */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="mt-6 text-center"
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${getProgressWidth()}%` }}
                                    transition={{ duration: 1, ease: "easeInOut" }}
                                    className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                                />
                            </div>
                            <span className="text-white/80 text-sm font-medium">
                                {Math.round(getProgressWidth())}%
                            </span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Status Summary */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-center lg:text-right"
                >
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                        <p className="text-white/70 text-sm mb-1">Current Status</p>
                        <p className={`font-semibold ${
                            stps?.status === 'success' 
                                ? 'text-green-400' 
                                : stps?.status === 'pending'
                                ? 'text-blue-400'
                                : 'text-white/70'
                        }`}>
                            {stps?.status === 'success' && 'Payment Complete'}
                            {stps?.status === 'pending' && 'Processing Payment'}
                            {!stps?.status && 'Ready to Ship'}
                        </p>
                        
                        {/* Animated Dots */}
                        <div className="flex justify-center lg:justify-end space-x-1 mt-2">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                                className="w-2 h-2 bg-blue-400 rounded-full"
                            />
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                                className="w-2 h-2 bg-purple-400 rounded-full"
                            />
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                                className="w-2 h-2 bg-pink-400 rounded-full"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Steps;
