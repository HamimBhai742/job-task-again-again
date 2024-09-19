import React from 'react';
import useProducts from '../../hooks/useProducts';
import LaProductCa from './LaProductCa';
import { Link } from 'react-router-dom';

const LatestProducts = () => {
    const [products] = useProducts()
    const sortedProducts = products.sort(
      (a, b) => new Date(b.productDaTa) - new Date(a.productDaTa)
    );
    const pro = sortedProducts.slice(0, 9);

    return (
        <div className='my-5'>
            <h3 className='font-semibold text-3xl text-center '>Latest Products</h3>
            <div className='grid grid-cols-3 gap-5 mt-5'>
                {
                    pro.map(product=><LaProductCa product={product}></LaProductCa>)
                }
            </div>
            <div className='my-5 text-center'>
                <Link to="/product" className='btn hover:bg-lime-500 bg-lime-500 text-gray-700'>See All Products</Link>
            </div>
        </div>
    );o
};

export default LatestProducts;