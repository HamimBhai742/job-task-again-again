import React from 'react';
import useMyProducts from '../../hooks/useMyProducts';
import MyProductsCard from './MyProductsCard';

const MyProducts = () => {
    const [myProducts, refetch] = useMyProducts();
    console.log(myProducts)
    return (
      <div className="p-8 pl-16">
        <p>my products</p>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
          {myProducts.map((my, idx) => (
            <MyProductsCard my={(my)} key={idx} refetch={refetch}></MyProductsCard>
          ))}
        </div>
      </div>
    );
};

export default MyProducts;