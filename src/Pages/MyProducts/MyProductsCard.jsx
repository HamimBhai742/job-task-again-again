import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEdit3, FiTrash2, FiDollarSign, FiTag } from 'react-icons/fi';

const MyProductsCard = ({ my, refetch }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [isHovered, setIsHovered] = useState(false);

  const handelDeleteBtn = async (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You want to be delete this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const resDelete = await axiosPublic.delete(`/my-product/${id}`);
        if (resDelete.data.deletedCount) {
          Swal.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  const handelUpdateBtn = (id) => {
    navigate(`/dashboard/update-my-product/${id}`);
  };

  return (
    <motion.div
      className="group relative backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl max-w-md mx-auto"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <motion.img
          src={my?.productImg}
          alt={my?.productName}
          className="w-full h-64 object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            onClick={() => handelUpdateBtn(my?._id)}
            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiEdit3 className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={() => handelDeleteBtn(my?._id)}
            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiTrash2 className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
          <FiDollarSign className="w-4 h-4" />
          {my?.offerPrice || my?.productPrice}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Product Title */}
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
          {my?.productName}
        </h3>

        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
            <FiTag className="w-4 h-4" />
            {my?.productCategory}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-6 line-clamp-2">
          {my?.productDescription || "If a dog chews shoes whose shoes does he choose?"}
        </p>

        {/* User Profile Section */}
        <div className="flex items-center gap-3 mb-6 p-3 bg-white/5 rounded-xl border border-white/10">
          <div className="relative">
            <img
              className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
              src={user?.photoURL}
              alt={user?.displayName}
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-white text-sm">{user?.displayName}</h4>
            <p className="text-gray-400 text-xs">{user?.email}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handelUpdateBtn(my?._id)}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FiEdit3 className="w-4 h-4" />
            Update
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handelDeleteBtn(my?._id)}
            className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FiTrash2 className="w-4 h-4" />
            Delete
          </motion.button>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default MyProductsCard;
