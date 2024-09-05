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

const BarChat = () => {
  const { user } = useAuth();
  const [payHis] = usePayHis();
  const payHisMy = payHis.filter((p) => p.cusEmail == user?.email);
    const pay = payHisMy.filter((p) => p.payStatus === "Success");
    console.log(pay)
  return (
    <ResponsiveContainer width="100%" height="70%">
      <BarChart data={pay}>
        <XAxis dataKey="name" />
        <YAxis/>
        <Tooltip cursor={{ fill: "transparent" }} />
        <Bar dataKey="amount" fill="#33ff8d">
          <LabelList dataKey="payStatus" position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChat;
