import React from "react";
import useMyProducts from "../../hooks/useMyProducts";
import MyProductsCard from "./MyProductsCard";
import { Link } from "react-router-dom";

const MyProducts = () => {
  const [myProducts, refetch] = useMyProducts();
  console.log(myProducts);
  return (
    <div className="p-8 pl-16">
      {myProducts.length > 0 ? (
        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
          {myProducts.map((my, idx) => (
            <MyProductsCard
              my={my}
              key={idx}
              refetch={refetch}
            ></MyProductsCard>
          ))}
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center min-h-screen gap-3">
            <p className="text-lg font-semibold ">
              No products found.Please add products.
            </p>
            <Link
              to="/add-product"
              className="bg-teal-500 p-3 rounded-lg font-bold text-lg"
            >
              Add Products
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default MyProducts;
