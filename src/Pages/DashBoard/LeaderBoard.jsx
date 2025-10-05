import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import usePayHis from "../../hooks/usePayHis";
import BarChat from "./BarChat";
import useUser from "../../hooks/useUser";
import Chart from "./Chart";
import useSeller from "../../hooks/useSeller";
import { motion } from "framer-motion";
import { 
  FaDollarSign, 
  FaShoppingCart, 
  FaCheckCircle, 
  FaTimesCircle,
  FaChartLine,
  FaUsers,
  FaStore,
  FaClock
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const LeaderBoard = () => {
  const { user } = useAuth();
  const [payHis] = usePayHis();
  const [seller] = useSeller();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const payHisMy = payHis.filter((p) => p.cusEmail == user?.email);
  const pay = payHisMy.filter((p) => p.payStatus === "Success");
  const payF = payHisMy.filter((p) => p.payStatus !== "Success");
  const totalPrice = pay.reduce((p, q) => p + q.amount, 0);
  const payPay = payHis.filter((p) => p.payStatus === "Success");
  const tP = payPay.reduce((p, q) => p + q.amount, 0);
  const totalPriceF = payF.reduce((p, q) => p + q.amount, 0);
  const [userDB] = useUser();
  const find = userDB.find((f) => f.email === user?.email);
  const payPayF = payHis.filter((p) => p.payStatus !== "Success");
  const tPF = payPayF.reduce((p, q) => p + q.amount, 0);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Animated Counter Component
  const AnimatedCounter = ({ value, prefix = "", suffix = "" }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      const timer = setInterval(() => {
        setCount(prev => {
          if (prev < value) {
            return Math.min(prev + Math.ceil(value / 50), value);
          }
          return value;
        });
      }, 50);
      
      return () => clearInterval(timer);
    }, [value]);

    return <span>{prefix}{count.toFixed(2)}{suffix}</span>;
  };

  // Stats Card Component
  const StatsCard = ({ title, value, icon: Icon, gradient, delay, prefix = "", suffix = "" }) => (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`relative bg-gradient-to-br ${gradient} rounded-3xl p-6 shadow-2xl overflow-hidden group cursor-pointer`}
    >
      {/* Background Pattern */}
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
          <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
        </p>
      </div>
    </motion.div>
  );

  // Admin Stats
  const adminStats = [
    {
      title: "Total Revenue",
      value: tP,
      icon: FaDollarSign,
      gradient: "from-emerald-500 to-teal-600",
      prefix: "$"
    },
    {
      title: "Failed Payments",
      value: tPF,
      icon: FaTimesCircle,
      gradient: "from-amber-500 to-orange-600",
      prefix: "$"
    },
    {
      title: "Completed Orders",
      value: payPay.length,
      icon: FaCheckCircle,
      gradient: "from-purple-500 to-indigo-600",
      suffix: ""
    },
    {
      title: "Cancelled Orders",
      value: payPayF.length,
      icon: FaTimesCircle,
      gradient: "from-rose-500 to-pink-600",
      suffix: ""
    }
  ];

  // User Stats
  const userStats = [
    {
      title: "Total Spent",
      value: totalPrice,
      icon: FaDollarSign,
      gradient: "from-green-500 to-emerald-600",
      prefix: "$"
    },
    {
      title: "Failed Payments",
      value: totalPriceF,
      icon: FaTimesCircle,
      gradient: "from-rose-500 to-red-600",
      prefix: "$"
    },
    {
      title: "Successful Orders",
      value: pay.length,
      icon: FaCheckCircle,
      gradient: "from-purple-500 to-violet-600",
      suffix: ""
    },
    {
      title: "Cancelled Orders",
      value: payF.length,
      icon: FaTimesCircle,
      gradient: "from-yellow-500 to-amber-600",
      suffix: ""
    }
  ];

  if (seller) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl mb-6"
            >
              <FaStore className="text-3xl text-white" />
            </motion.div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent mb-4">
              Seller Dashboard
            </h1>
            <p className="text-white/70 text-lg">
              Your seller features are coming soon!
            </p>
          </div>

          {/* Coming Soon Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 text-center shadow-2xl"
          >
            <div className="mb-8">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-block text-8xl mb-6"
              >
                🚀
              </motion.div>
              
              <h2 className="text-3xl font-bold text-white mb-4">
                Exciting Features Coming Soon!
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                We're working hard to bring you amazing seller tools including analytics, 
                inventory management, order tracking, and much more.
              </p>
            </div>

            <div className="flex justify-center space-x-4">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-100"></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-200"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-2">
                {getGreeting()}, {user?.displayName}!
              </h1>
              <p className="text-white/70 text-lg">
                {find?.role === "admin" ? "Admin Dashboard Overview" : "Your Personal Dashboard"}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2">
                <FaClock className="text-blue-400" />
                <span className="text-white/80 text-sm">
                  {currentTime.toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {(find?.role === "admin" ? adminStats : userStats).map((stat, index) => (
            <StatsCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              gradient={stat.gradient}
              delay={index * 0.1}
              prefix={stat.prefix}
              suffix={stat.suffix}
            />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {find?.role === "admin" ? (
            <>
              <Chart />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl"
              >
                <div className="text-center py-12">
                  <FaChartLine className="text-6xl text-white/50 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Additional Analytics
                  </h3>
                  <p className="text-white/70">
                    More detailed analytics coming soon
                  </p>
                </div>
              </motion.div>
            </>
          ) : (
            <>
              <BarChat />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Quick Actions
                  </h3>
                  <p className="text-white/70 text-sm mt-1">Manage your account</p>
                </div>
                
                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl text-white hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300"
                  >
                    <FaShoppingCart className="text-xl" />
                    <span className="font-medium">View My Cart</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center space-x-4 p-4 bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-500/30 rounded-2xl text-white hover:from-green-500/30 hover:to-teal-500/30 transition-all duration-300"
                  >
                    <FaCheckCircle className="text-xl" />
                    <span className="font-medium">Order History</span>
                  </motion.button>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
