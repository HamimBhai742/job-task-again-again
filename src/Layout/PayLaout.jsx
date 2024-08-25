import React from 'react';
import { Outlet } from 'react-router-dom';
import Steps from '../Components/Steps/Steps';

const PayLaout = () => {
    return (
        <div>
            <Steps></Steps>
            <Outlet></Outlet>
        </div>
    );
};

export default PayLaout;