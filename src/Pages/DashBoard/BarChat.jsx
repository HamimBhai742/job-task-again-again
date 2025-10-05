import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import useAuth from "../../hooks/useAuth";
import usePayHis from "../../hooks/usePayHis";
import { motion } from "framer-motion";

const BarChat = () => {
  const { user } = useAuth();
  const [payHis] = usePayHis();
  const payHisMy = payHis.filter((p) => p.cusEmail == user?.email);
  const pay = payHisMy.filter((p) => p.payStatus === "Success");

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-lg border border-white/20 rounded-2xl p-4 shadow-2xl">
          <p className="text-gray-800 font-semibold">{`Product: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-green-600 font-medium">
              {`Amount: $${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          My Purchase History
        </h3>
        <p className="text-white/70 text-sm mt-1">Your successful transactions</p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={pay} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="#059669" stopOpacity={0.7}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="amount" 
              fill="url(#barGradient)"
              radius={[8, 8, 0, 0]}
              stroke="#10B981"
              strokeWidth={1}
            >
              <LabelList 
                dataKey="payStatus" 
                position="top" 
                fill="rgba(255,255,255,0.8)"
                fontSize={10}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default BarChat;
