import React, { useState, useEffect } from 'react';
import useMyCarts from '../../hooks/useMyCarts';
import { MdDelete, MdShoppingCart, MdRemove, MdAdd } from 'react-icons/md';
import { FaShoppingBag, FaDollarSign, FaHeart } from 'react-icons/fa';
import { HiSparkles, HiShoppingCart } from 'react-icons/hi';
import useProducts from '../../hooks/useProducts';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const MyCart = () => {
  const [myCarts, refetch] = useMyCarts();
  const [products] = useProducts();
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const [animatedItems, setAnimatedItems] = useState(0);

  const totalItem = myCarts.reduce(
    (p, q) => Number(p) + Number(q.productQuantity),
    0
  );
  const totalPrice = myCarts.reduce(
    (p, q) => Number(p) + Number(q.productPrice),
    0
  );
  const navigate = useNavigate();
  console.log(myCarts);
  // Animate counters
  useEffect(() => {
    const animateCounter = (target, setter) => {
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, 20);
    };

    animateCounter(totalPrice, setAnimatedTotal);
    animateCounter(totalItem, setAnimatedItems);
  }, [totalPrice, totalItem]);

  const handelDeleteBtn = async (id, productId) => {
    const axiosPublic = useAxiosPublic();
    const findDeleteItm = myCarts.find((d) => d._id === id);
    const findpro = products.find((d) => d._id === productId);
    const tP = findDeleteItm.productPrice;
    const pP = findpro.productPrice;
    const pQ = findDeleteItm.productQuantity;

    Swal.fire({
      title: 'Remove Item?',
      text: 'Are you sure you want to remove this item from your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Keep it',
      background: 'rgba(255, 255, 255, 0.95)',
      backdrop: 'rgba(0, 0, 0, 0.4)',
      customClass: {
        popup: 'rounded-3xl border border-white/20 shadow-2xl',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (pQ > 1) {
          const totalSa = parseFloat(tP - pP);
          const qty = parseInt(pQ - 1);
          const res = await axiosPublic.patch(
            `/deletPro/${id}?price=${totalSa}&&qty=${qty}`
          );
          if (res.data) {
            refetch();
          }
        } else {
          const re = await axiosPublic.delete(`/deletePro/${id}`);
          refetch();
        }

        Swal.fire({
          title: 'Removed!',
          text: 'Item has been removed from your cart.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          background: 'rgba(255, 255, 255, 0.95)',
          customClass: {
            popup: 'rounded-3xl border border-white/20 shadow-2xl',
          },
        });
      }
    });
  };

  const handelPayBtn = () => {
    if (totalPrice > 0) {
      navigate('/payment/shopping');
    }
  };

  console.log(myCarts);

  if (myCarts.length === 0) {
    return (
      <div className='min-h-screen flex items-center justify-center p-6'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className='text-center max-w-md mx-auto'
        >
          <div className='bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl'>
            {/* Empty Cart Icon */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className='mb-8'
            >
              <div className='relative inline-block'>
                <div className='w-24 h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border-2 border-white/20'>
                  <HiShoppingCart className='text-5xl text-white/60' />
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className='absolute -top-2 -right-2'
                >
                  <HiSparkles className='text-yellow-400 text-xl' />
                </motion.div>
              </div>
            </motion.div>

            <h3 className='text-2xl font-bold text-white mb-4'>
              Your Cart is Empty
            </h3>
            <p className='text-white/70 mb-8'>
              Looks like you haven't added any items to your cart yet. Start
              shopping to fill it up!
            </p>

            <Link to='/product'>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className='px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto'
              >
                <FaShoppingBag className='text-lg' />
                <span>Continue Shopping</span>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className='min-h-screen p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='mb-8'
        >
          <h1 className='text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6'>
            Shopping Cart
          </h1>

          {/* Cart Summary */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
            {/* Total Items */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className='bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl'
            >
              <div className='flex items-center space-x-4'>
                <div className='p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl'>
                  <MdShoppingCart className='text-2xl text-white' />
                </div>
                <div>
                  <p className='text-white/70 text-sm'>Total Items</p>
                  <p className='text-3xl font-bold text-white'>
                    {animatedItems}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Total Price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className='bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl'
            >
              <div className='flex items-center space-x-4'>
                <div className='p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl'>
                  <FaDollarSign className='text-2xl text-white' />
                </div>
                <div>
                  <p className='text-white/70 text-sm'>Total Price</p>
                  <p className='text-3xl font-bold text-white'>
                    ${animatedTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Pay Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className='flex items-center'
            >
              <motion.button
                onClick={handelPayBtn}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                disabled={totalPrice <= 0}
                className='w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2'
              >
                <FaShoppingBag className='text-lg' />
                <span>Proceed to Payment</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Cart Items */}
        <div className='space-y-4'>
          <AnimatePresence>
            {myCarts.map((myCart, idx) => (
              <motion.div
                key={myCart._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -2 }}
                className='bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl group'
              >
                <div className='flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6'>
                  {/* Product Image */}
                  <div className='relative'>
                    <div className='w-24 h-24 lg:w-32 lg:h-32 rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg'>
                      <img
                        src={myCart?.productImg}
                        alt={myCart?.productName}
                        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                      />
                    </div>
                    <div className='absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold'>
                      {idx + 1}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className='flex-1 text-center lg:text-left'>
                    <h3 className='text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300'>
                      {myCart?.productName}
                    </h3>
                    <div className='flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-4'>
                      <div className='flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2'>
                        <span className='text-white/70 text-sm'>Price:</span>
                        <span className='text-green-400 font-semibold'>
                          ${myCart?.productPrice}
                        </span>
                      </div>
                      <div className='flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2'>
                        <span className='text-white/70 text-sm'>Qty:</span>
                        <span className='text-blue-400 font-semibold'>
                          {myCart?.productQuantity}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className='flex items-center space-x-4'>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className='p-3 bg-white/10 hover:bg-red-500/20 border border-white/20 hover:border-red-500/50 rounded-2xl text-white/70 hover:text-red-400 transition-all duration-300 group'
                    >
                      <FaHeart className='text-lg group-hover:scale-110 transition-transform duration-300' />
                    </motion.button>

                    <motion.button
                      onClick={() =>
                        handelDeleteBtn(myCart?._id, myCart?.productId)
                      }
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className='p-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 rounded-2xl text-red-400 hover:text-red-300 transition-all duration-300 group'
                    >
                      <MdDelete className='text-xl group-hover:scale-110 transition-transform duration-300' />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className='mt-12 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-6'
        >
          <Link to='/product'>
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className='px-6 py-3 bg-white/10 border border-white/20 text-white font-medium rounded-2xl hover:bg-white/20 transition-all duration-300 flex items-center space-x-2'
            >
              <span>← Continue Shopping</span>
            </motion.button>
          </Link>

          <div className='text-center'>
            <p className='text-white/70 text-sm mb-2'>
              Secure checkout with SSL encryption
            </p>
            <div className='flex items-center justify-center space-x-2'>
              <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
              <span className='text-green-400 text-sm font-medium'>
                Safe & Secure
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MyCart;
