import React from 'react';
import useAuth from '../../hooks/useAuth';
import usePayHis from '../../hooks/usePayHis';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { curveCardinal } from "d3-shape";
import useUser from '../../hooks/useUser';
import { motion } from 'framer-motion';

const Chart = () => {
  const { user } = useAuth();
  const [payHis] = usePayHis();
  const [userDB] = useUser()
  const uR = userDB.filter(u => u.role === "user")
  const pay = payHis.filter((p) => p.payStatus === "Success");
  const payF = payHis.filter((p) => p.payStatus !== "Success");
  const cardinal = curveCardinal.tension(0.2);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-lg border border-white/20 rounded-2xl p-4 shadow-2xl">
          <p className="text-gray-800 font-semibold">{`Amount: $${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-blue-600 font-medium">
              {`Value: $${entry.value}`}
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
      transition={{ duration: 0.6 }}
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Revenue Analytics
        </h3>
        <p className="text-white/70 text-sm mt-1">Payment success trends over time</p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={pay}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorAmount1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorAmount2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="amount" 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#3B82F6"
              strokeWidth={3}
              fill="url(#colorAmount1)"
              fillOpacity={1}
            />
            <Area
              type={cardinal}
              dataKey="amount"
              stroke="#10B981"
              strokeWidth={2}
              fill="url(#colorAmount2)"
              fillOpacity={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default Chart;
