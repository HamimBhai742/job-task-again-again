import React from "react";
import useMyProducts from "../../hooks/useMyProducts";
import MyProductsCard from "./MyProductsCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiPackage, FiPlus } from "react-icons/fi";

const MyProducts = () => {
  const [myProducts, refetch] = useMyProducts();
  console.log(myProducts);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
      
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                My Products
              </h1>
              <p className="text-gray-300">Manage your product inventory</p>
            </div>
            
            {/* Stats */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl p-4 min-w-[140px]"
            >
              <div className="flex items-center gap-3">
                <FiPackage className="text-2xl text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{myProducts.length}</p>
                  <p className="text-xs text-blue-300">Total Products</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {myProducts.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {myProducts.map((my, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <MyProductsCard
                my={my}
                refetch={refetch}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col justify-center items-center min-h-[60vh] gap-6"
        >
          <div className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 rounded-2xl p-12 text-center max-w-md">
            <div className="text-6xl mb-6">📦</div>
            <h3 className="text-2xl font-bold text-white mb-4">No Products Found</h3>
            <p className="text-gray-300 mb-6">
              No products found. Please add products to get started.
            </p>
            <Link
              to="/add-product"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <FiPlus className="text-xl" />
              Add Products
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MyProducts;
