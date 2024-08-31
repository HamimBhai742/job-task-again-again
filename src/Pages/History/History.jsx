import React from 'react';
import usePayHis from '../../hooks/usePayHis';
import useAuth from '../../hooks/useAuth';

const History = () => {
    const { user } = useAuth()
    const [payHis] = usePayHis()
    const payHisMy = payHis.filter(p => p.cusEmail == user?.email)

    // console.log(formattedDate);
    return (
        <div className='p-3'>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='text-lg'>
                        <tr>
                            <th>SQ</th>
                            <th>Time & Date</th>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Payment Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            payHisMy.map((pay, idx) => <tr>
                                <th>{idx + 1}</th>
                                <td>{pay.timeAndDate}</td>
                                <td>{pay.transactionID}</td>
                                <td>${pay.amount.toFixed(2)}</td>
                                <td>
                                    <p className={pay.payStatus === 'Success' ? 'bg-green-100 text-center rounded-full text-green-600 font-semibold' : 'bg-red-100 text-red-600 font-medium text-center rounded-full'}>{pay.payStatus}</p>
                                </td>
                                <td>{pay.cardType || 'Cencelled'}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default History;