import React from 'react';
import useMyProducts from '../../hooks/useMyProducts';
import MyProductsCard from './MyProductsCard';

const MyProducts = () => {
    const [myProducts]=useMyProducts()
    console.log(myProducts)
    return (
      <div className='p-8 pl-16'>
        <p>my products</p>
        <div className='grid grid-cols-2 gap-4'>
          {myProducts.map((my, idx) => (
            <MyProductsCard my={my}></MyProductsCard>
          ))}
        </div>
      </div>
    );
};

export default MyProducts;