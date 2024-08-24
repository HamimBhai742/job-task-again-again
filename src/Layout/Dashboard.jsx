import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Sidebar/Sidebar';

const Dashboard = () => {
    return (
        <div className='dashboard'>
            <Sidebar></Sidebar>
            <div className=''>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;