import React, { useState, useEffect } from 'react';
import usePayHis from '../../hooks/usePayHis';
import useAuth from '../../hooks/useAuth';
import TransactionCard from './TransactionCard';
import { motion } from 'framer-motion';
import { 
    FaHistory, 
    FaCheckCircle, 
    FaTimesCircle, 
    FaDollarSign,
    FaCreditCard,
    FaSearch,
    FaFilter,
    FaShoppingBag
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const History = () => {
    const { user } = useAuth();
    const [payHis] = usePayHis();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [animatedStats, setAnimatedStats] = useState({
        total: 0,
        success: 0,
        failed: 0,
        totalAmount: 0
    });

    const payHisMy = payHis.filter(p => p.cusEmail == user?.email);
    
    // Filter transactions based on search and status
    const filteredTransactions = payHisMy.filter(transaction => {
        const matchesSearch = transaction.transactionID.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            transaction.amount.toString().includes(searchTerm);
        const matchesStatus = filterStatus === 'all' || 
                            (filterStatus === 'success' && transaction.payStatus === 'Success') ||
                            (filterStatus === 'failed' && transaction.payStatus !== 'Success');
        return matchesSearch && matchesStatus;
    });

    // Calculate statistics
    const successfulTransactions = payHisMy.filter(p => p.payStatus === 'Success');
    const failedTransactions = payHisMy.filter(p => p.payStatus !== 'Success');
    const totalAmount = successfulTransactions.reduce((sum, p) => sum + p.amount, 0);

    // Animate statistics
    useEffect(() => {
        const animateValue = (target, key) => {
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    setAnimatedStats(prev => ({ ...prev, [key]: target }));
                    clearInterval(timer);
                } else {
                    setAnimatedStats(prev => ({ ...prev, [key]: Math.floor(current) }));
                }
            }, 20);
        };

        animateValue(payHisMy.length, 'total');
        animateValue(successfulTransactions.length, 'success');
        animateValue(failedTransactions.length, 'failed');
        animateValue(totalAmount, 'totalAmount');
    }, [payHisMy.length, successfulTransactions.length, failedTransactions.length, totalAmount]);

    // Statistics cards data
    const statsCards = [
        {
            title: 'Total Transactions',
            value: animatedStats.total,
            icon: FaHistory,
            gradient: 'from-blue-500 to-cyan-500',
            suffix: ''
        },
        {
            title: 'Successful',
            value: animatedStats.success,
            icon: FaCheckCircle,
            gradient: 'from-green-500 to-emerald-500',
            suffix: ''
        },
        {
            title: 'Failed',
            value: animatedStats.failed,
            icon: FaTimesCircle,
            gradient: 'from-red-500 to-pink-500',
            suffix: ''
        },
        {
            title: 'Total Spent',
            value: animatedStats.totalAmount,
            icon: FaDollarSign,
            gradient: 'from-purple-500 to-indigo-500',
            prefix: '$',
            suffix: ''
        }
    ];

    // Stats Card Component
    const StatsCard = ({ title, value, icon: Icon, gradient, prefix = '', suffix = '', delay }) => (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay }}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`relative bg-gradient-to-br ${gradient} rounded-3xl p-6 shadow-2xl overflow-hidden group cursor-pointer`}
        >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
            
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                        <Icon className="text-2xl text-white" />
                    </div>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                        <HiSparkles className="text-white/60 text-xl" />
                    </motion.div>
                </div>
                
                <h3 className="text-white/80 text-sm font-medium mb-2">{title}</h3>
                <p className="text-3xl font-bold text-white">
                    {prefix}{typeof value === 'number' ? value.toFixed(prefix === '$' ? 2 : 0) : value}{suffix}
                </p>
            </div>
        </motion.div>
    );

    if (payHisMy.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-md mx-auto"
                >
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl">
                        <motion.div
                            animate={{ 
                                y: [0, -10, 0],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{ 
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="mb-8"
                        >
                            <div className="relative inline-block">
                                <div className="w-24 h-24 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center border-2 border-white/20">
                                    <FaHistory className="text-5xl text-white/60" />
                                </div>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="absolute -top-2 -right-2"
                                >
                                    <HiSparkles className="text-yellow-400 text-xl" />
                                </motion.div>
                            </div>
                        </motion.div>

                        <h3 className="text-2xl font-bold text-white mb-4">
                            No Transaction History
                        </h3>
                        <p className="text-white/70 mb-8">
                            You haven't made any purchases yet. Start shopping to see your transaction history here!
                        </p>

                        <Link to='/product'>
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
                            >
                                <FaShoppingBag className="text-lg" />
                                <span>Start Shopping</span>
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent mb-6">
                        Transaction History
                    </h1>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {statsCards.map((stat, index) => (
                            <StatsCard
                                key={stat.title}
                                title={stat.title}
                                value={stat.value}
                                icon={stat.icon}
                                gradient={stat.gradient}
                                prefix={stat.prefix}
                                suffix={stat.suffix}
                                delay={index * 0.1}
                            />
                        ))}
                    </div>

                    {/* Search and Filter */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        {/* Search */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="relative flex-1"
                        >
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" />
                            <input
                                type="text"
                                placeholder="Search by transaction ID or amount..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 backdrop-blur-sm"
                            />
                        </motion.div>

                        {/* Filter */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="relative"
                        >
                            <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="pl-12 pr-8 py-3 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 backdrop-blur-sm appearance-none cursor-pointer"
                            >
                                <option value="all" className="bg-gray-800 text-white">All Transactions</option>
                                <option value="success" className="bg-gray-800 text-white">Successful</option>
                                <option value="failed" className="bg-gray-800 text-white">Failed</option>
                            </select>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Transaction Cards */}
                <div className="space-y-4">
                    {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((transaction, idx) => (
                            <TransactionCard 
                                key={transaction._id || idx} 
                                transaction={transaction} 
                                index={idx} 
                            />
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12"
                        >
                            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                                <FaSearch className="text-4xl text-white/50 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    No transactions found
                                </h3>
                                <p className="text-white/70">
                                    Try adjusting your search or filter criteria
                                </p>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Results Summary */}
                {filteredTransactions.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mt-8 text-center"
                    >
                        <p className="text-white/70">
                            Showing {filteredTransactions.length} of {payHisMy.length} transactions
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default History;
