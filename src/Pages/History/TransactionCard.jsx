import React from "react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { 
    FaCheckCircle, 
    FaTimesCircle, 
    FaCreditCard, 
    FaCalendarAlt,
    FaDollarSign,
    FaReceipt
} from "react-icons/fa";

const TransactionCard = ({ transaction, index }) => {
    const dateandtime = dayjs(transaction?.timeAndDate, "M/D/YYYY, hh:mm:ss A").format(
        "DD-MM-YYYY, hh:mm:ss A"
    );

    const isSuccess = transaction.payStatus === "Success";
    
    const getStatusConfig = () => {
        if (isSuccess) {
            return {
                icon: FaCheckCircle,
                gradient: "from-green-500 to-emerald-500",
                bgColor: "bg-green-500/20",
                borderColor: "border-green-500/30",
                textColor: "text-green-400"
            };
        } else {
            return {
                icon: FaTimesCircle,
                gradient: "from-red-500 to-pink-500",
                bgColor: "bg-red-500/20",
                borderColor: "border-red-500/30",
                textColor: "text-red-400"
            };
        }
    };

    const statusConfig = getStatusConfig();
    const StatusIcon = statusConfig.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -2, scale: 1.01 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl group hover:shadow-3xl transition-all duration-300"
        >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
                {/* Left Section - Transaction Info */}
                <div className="flex-1 space-y-4">
                    <div className="flex items-center space-x-4">
                        {/* Transaction Number */}
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                            #{index + 1}
                        </div>
                        
                        {/* Transaction ID */}
                        <div>
                            <p className="text-white/70 text-sm">Transaction ID</p>
                            <p className="text-white font-mono text-lg group-hover:text-blue-300 transition-colors duration-300">
                                {transaction.transactionID}
                            </p>
                        </div>
                    </div>

                    {/* Transaction Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Date & Time */}
                        <div className="flex items-center space-x-3 bg-white/5 rounded-2xl p-3">
                            <div className="p-2 bg-blue-500/20 rounded-xl">
                                <FaCalendarAlt className="text-blue-400" />
                            </div>
                            <div>
                                <p className="text-white/70 text-xs">Date & Time</p>
                                <p className="text-white text-sm font-medium">{dateandtime}</p>
                            </div>
                        </div>

                        {/* Amount */}
                        <div className="flex items-center space-x-3 bg-white/5 rounded-2xl p-3">
                            <div className="p-2 bg-green-500/20 rounded-xl">
                                <FaDollarSign className="text-green-400" />
                            </div>
                            <div>
                                <p className="text-white/70 text-xs">Amount</p>
                                <p className="text-white text-lg font-bold">${transaction.amount.toFixed(2)}</p>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="flex items-center space-x-3 bg-white/5 rounded-2xl p-3">
                            <div className="p-2 bg-purple-500/20 rounded-xl">
                                <FaCreditCard className="text-purple-400" />
                            </div>
                            <div>
                                <p className="text-white/70 text-xs">Payment Method</p>
                                <p className="text-white text-sm font-medium">
                                    {transaction.cardType || "Cancelled"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section - Status */}
                <div className="flex flex-col items-center lg:items-end space-y-4">
                    {/* Status Badge */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={`flex items-center space-x-2 px-4 py-3 ${statusConfig.bgColor} ${statusConfig.borderColor} border rounded-2xl backdrop-blur-sm`}
                    >
                        <StatusIcon className={`text-xl ${statusConfig.textColor}`} />
                        <span className={`font-semibold ${statusConfig.textColor}`}>
                            {transaction.payStatus}
                        </span>
                    </motion.div>

                    {/* Action Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-2xl text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300"
                    >
                        <FaReceipt className="text-sm" />
                        <span className="text-sm font-medium">View Details</span>
                    </motion.button>
                </div>
            </div>

            {/* Bottom Border Animation */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${statusConfig.gradient} rounded-b-3xl origin-left`}
            />
        </motion.div>
    );
};

export default TransactionCard;
