import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Products from "../Products/Products";
import { useNavigate } from "react-router-dom";

const Categorization = () => {
  const axiosPublic = useAxiosPublic();
  const navigate=useNavigate()
  const handelEtBtn = async (productCategory) => {
    console.log(productCategory);
    navigate("/product",{state:{category:productCategory,statUs:true}})
  };

  return (
    <div>
      <h3 className="font-semibold text-3xl text-center ">
        Products Categorize
      </h3>
      <div className="grid grid-cols-4 gap-5 mt-5">
        <div
          onClick={() => handelEtBtn("Electronics")}
          className="hover:cursor-pointer hover:underline hover:text-blue-500"
        >
          <img className="w-64 h-48" src="/Electronic.jpg" alt="" />
          <h5>Electronics</h5>
        </div>
        <div
          onClick={() => handelEtBtn("Home and Kitchen")}
          className="hover:cursor-pointer hover:underline hover:text-blue-500"
        >
          <img className="w-64 h-48" src="/homes.jpg" alt="" />
          <h5>Home and Kitchen</h5>
        </div>
        <div
          onClick={() => handelEtBtn("Books and Stationery")}
          className="hover:cursor-pointer hover:underline hover:text-blue-500"
        >
          <img className="w-64 h-48" src="/books.jpg" alt="" />
          <h5>Books and Stationery</h5>
        </div>
        <div
          onClick={() => handelEtBtn("Health and Beauty")}
          className="hover:cursor-pointer hover:underline hover:text-blue-500"
        >
          <img className="w-64 h-48" src="/beuti.jpg" alt="" />
          <h5>Health and Beauty</h5>
        </div>
        <div
          onClick={() => handelEtBtn("Fashion")}
          className="hover:cursor-pointer hover:underline hover:text-blue-500"
        >
          <img className="w-64 h-48" src="/gdfgfdgf.jpg" alt="" />
          <h5>Fashion</h5>
        </div>
      </div>
    </div>
  );
};

export default Categorization;
