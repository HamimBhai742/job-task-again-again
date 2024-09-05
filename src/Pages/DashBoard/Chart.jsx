import React from 'react';
import useAuth from '../../hooks/useAuth';
import usePayHis from '../../hooks/usePayHis';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { curveCardinal } from "d3-shape";
import useUser from '../../hooks/useUser';

const Chart = () => {
  const { user } = useAuth();
  const [payHis] = usePayHis();
  //   const payHisMy = payHis.filter((p) => p.cusEmail == user?.email);
  const [userDB] = useUser()
  const uR=userDB.filter(u=>u.role==="user")
  const pay = payHis.filter((p) => p.payStatus === "Success");
  const payF = payHis.filter((p) => p.payStatus !== "Success");
  // console.log(pay.length,uR.length,payF.length);
  const cardinal = curveCardinal.tension(0.2);
  return (
    <ResponsiveContainer width="100%" height="60%">
      <AreaChart
        width={500}
        height={400}
        data={pay}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="amount" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="amount"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.3}
        />
        <Area
          type={cardinal}
          dataKey="amount"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;