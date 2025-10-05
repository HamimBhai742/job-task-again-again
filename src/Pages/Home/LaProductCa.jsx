import React from 'react';
import ReactStars from 'react-stars';
import useProducts from '../../hooks/useProducts';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useMyCarts from '../../hooks/useMyCarts';
import useAuth from '../../hooks/useAuth';
import useAdmin from '../../hooks/useAdmin';
import useSeller from '../../hooks/useSeller';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaHeart, FaEye, FaTag, FaClock } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const LaProductCa = ({ product }) => {
  const [myCarts, refetch] = useMyCarts();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [products] = useProducts();
  const [admin] = useAdmin();
  const navigate = useNavigate();
  const [seller] = useSeller();
  
  const {
    productRating,
    productAddingTime,
    _id,
    productPrice,
    brandName,
    productName,
    productImg,
    productDescription,
    productCategory,
    offerPrice,
  } = product;

  const handelAddToCartBtn = async (id) => {
    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You need to login first!',
        background: 'rgba(255, 255, 255, 0.95)',
        backdrop: 'rgba(0, 0, 0, 0.4)',
        customClass: {
          popup: 'rounded-3xl border border-white/20 shadow-2xl'
        }
      });
      return navigate('/login');
    }
    
    if (admin) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "You can't add products to cart because you are an admin!",
        background: 'rgba(255, 255, 255, 0.95)',
        customClass: {
          popup: 'rounded-3xl border border-white/20 shadow-2xl'
        }
      });
      return;
    } else if (seller) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "You can't add products to cart because you are a seller!",
        background: 'rgba(255, 255, 255, 0.95)',
        customClass: {
          popup: 'rounded-3xl border border-white/20 shadow-2xl'
        }
      });
      return;
    }

    const findMyItem = products.find((product) => product._id === id);
    const findM = myCarts.find((product) => product.productId === id);
    const { productName, productImg, productPrice, offerPrice } = findMyItem;
    const addCart = {
      productName,
      productImg,
      productPrice: offerPrice || productPrice,
      productId: id,
      productQuantity: 1,
      myEmail: user?.email,
    };

    if (!findM) {
      const res = await axiosPublic.post('/add-to-cart', addCart);
      if (res.data.insertedId) {
        Swal.fire({
          title: 'Success!',
          text: 'Product added to cart successfully!',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          background: 'rgba(255, 255, 255, 0.95)',
          customClass: {
            popup: 'rounded-3xl border border-white/20 shadow-2xl'
          }
        });
        refetch();
      }
    } else {
      const pervPr = findM.productPrice;
      const pr = productPrice;
      const totalPr = parseFloat(pervPr + pr);
      const pervQty = findM.productQuantity;
      const qty = 1;
      const totalQty = parseInt(pervQty + qty);

      const re = await axiosPublic.patch(
        `/add-to-cart/${findM._id}?price=${totalPr}&&qty=${totalQty}`
      );
      if (re.data.modifiedCount) {
        Swal.fire({
          title: 'Updated!',
          text: 'Cart quantity updated successfully!',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          background: 'rgba(255, 255, 255, 0.95)',
          customClass: {
            popup: 'rounded-3xl border border-white/20 shadow-2xl'
          }
        });
      }
      refetch();
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          className="w-full h-64 object-cover"
          src={productImg}
          alt={productName}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium"
          >
            <FaClock className="text-xs" />
            <span>{productAddingTime}</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg"
          >
            {brandName}
          </motion.div>
        </div>

        {/* Offer Badge */}
        {offerPrice && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
          >
            SALE!
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white hover:bg-white/30 transition-all duration-300"
            >
              <FaEye className="text-lg" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white hover:bg-white/30 transition-all duration-300"
            >
              <FaHeart className="text-lg" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300 line-clamp-2">
          {productName}
        </h3>

        {/* Description */}
        <p className="text-white/70 text-sm line-clamp-2 leading-relaxed">
          {productDescription}
        </p>

        {/* Rating and Category */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <ReactStars
              value={productRating}
              edit={false}
              size={18}
              color2="#fbbf24"
            />
            <span className="text-white/60 text-sm">({productRating})</span>
          </div>
          
          <div className="flex items-center space-x-1 bg-white/10 border border-white/20 rounded-full px-3 py-1">
            <FaTag className="text-blue-400 text-xs" />
            <span className="text-white/80 text-xs font-medium">{productCategory}</span>
          </div>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="space-y-1">
            {offerPrice && (
              <div className="text-white/50 text-sm line-through">
                ${productPrice}
              </div>
            )}
            <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
              ${offerPrice || productPrice}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handelAddToCartBtn(_id)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <FaShoppingCart className="text-sm group-hover:animate-bounce" />
            <span>Add to Cart</span>
          </motion.button>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

export default LaProductCa;
