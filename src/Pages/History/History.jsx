import React from 'react';
import usePayHis from '../../hooks/usePayHis';

const History = () => {
    const [payHis] = usePayHis()
    console.log(payHis);
    return (
        <div>

        </div>
    );
};

export default History;