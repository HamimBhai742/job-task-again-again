import React from 'react';
import Banner from './Banner';
import LatestProducts from './LatestProducts';
import Categorization from './Categorization';
const Home = () => {
    return (
        <div className='px-10 my-5'>
            <Banner></Banner>
            <LatestProducts></LatestProducts>
            <Categorization></Categorization>
        </div>
    );
};

export default Home;