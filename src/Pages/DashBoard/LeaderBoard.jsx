import React from 'react';
import useAuth from '../../hooks/useAuth';
import usePayHis from '../../hooks/usePayHis';
import BarChat from './BarChat';
import useUser from '../../hooks/useUser';
import Chart from './Chart';

const LeaderBoard = () => {
   const { user } = useAuth();
   const [payHis] = usePayHis();
    const payHisMy = payHis.filter((p) => p.cusEmail == user?.email);
    const pay = payHisMy.filter(p => p.payStatus === "Success")
     const payF = payHisMy.filter((p) => p.payStatus !== "Success");
  const totalPrice = pay.reduce((p, q) => p + q.amount, 0);
  const payPay = payHis.filter((p) => p.payStatus === "Success");
  const totalPriceF = payF.reduce((p, q) => p + q.amount, 0);
  const [userDB] = useUser()
  const find=userDB.find(f=>f.email===user?.email)
  console.log(find);

    return (
      <>
        {find?.role === "admin" ? (
          <>
            <div className="my-10 p-10 flex gap-5">
              <div className="bg-red-500  text-white font-semibold w-52 h-36 rounded-lg flex justify-center items-center flex-col ">
                <h3 className="text-lg font-semibold">Success Payment</h3>
                <p>${totalPrice.toFixed(2)}</p>
              </div>

              <div className="bg-yellow-500 text-white font-semibold w-52 h-36  rounded-lg flex justify-center items-center flex-col">
                <h3 className="text-lg font-semibold">Failed Payment</h3>
                <p>${totalPriceF}</p>
              </div>

              <div className="bg-purple-500 text-white font-semibold w-52 h-36  rounded-lg flex justify-center items-center flex-col">
                <h3 className="text-lg font-semibold">Total Complete Order</h3>
                <p>{pay.length}</p>
              </div>

              <div className="bg-yellow-500 text-white font-semibold w-52 h-36  rounded-lg flex justify-center items-center flex-col">
                <h3 className="text-lg font-semibold">Total Cencel Order</h3>
                <p>{payF.length}</p>
              </div>
            </div>
            <Chart></Chart>
          </>
        ) : (
          <>
            <div className="my-10 p-10 flex gap-5">
              <div className="bg-green-500  text-white font-semibold w-52 h-36 rounded-lg flex justify-center items-center flex-col ">
                <h3 className="text-lg font-semibold">Success Payment</h3>
                <p>${totalPrice.toFixed(2)}</p>
              </div>

              <div className="bg-rose-500 text-white font-semibold w-52 h-36  rounded-lg flex justify-center items-center flex-col">
                <h3 className="text-lg font-semibold">Failed Payment</h3>
                <p>${totalPriceF}</p>
              </div>

              <div className="bg-purple-500 text-white font-semibold w-52 h-36  rounded-lg flex justify-center items-center flex-col">
                <h3 className="text-lg font-semibold">Total Complete Order</h3>
                <p>{pay.length}</p>
              </div>

              <div className="bg-yellow-500 text-white font-semibold w-52 h-36  rounded-lg flex justify-center items-center flex-col">
                <h3 className="text-lg font-semibold">Total Cencel Order</h3>
                <p>{payF.length}</p>
              </div>
            </div>
            <BarChat></BarChat>
          </>
        )}
      </>
    );
};

export default LeaderBoard;