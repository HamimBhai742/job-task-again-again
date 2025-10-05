import React from 'react';
import usePayHis from '../../hooks/usePayHis';
import useAuth from '../../hooks/useAuth';
import TableRowData from './TableRowData';

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
                            payHisMy.map((pay, idx) => <TableRowData pay={pay} idx={idx} key={idx} />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default History;