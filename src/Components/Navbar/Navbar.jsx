import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { GiShoppingCart } from "react-icons/gi";
import { HiMenu, HiX, HiShoppingBag, HiUser, HiLogout, HiSupport } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import useMyCarts from "../../hooks/useMyCarts";
import useUser from "../../hooks/useUser";
import useAdmin from "../../hooks/useAdmin";
import useSeller from "../../hooks/useSeller";
import useUserR from "../../hooks/useUserR";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [myCarts, refetch] = useMyCarts();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalAddItm = myCarts.reduce((p, q) => p + q.productQuantity, 0);
  
  const [admin] = useAdmin();
  const [seller] = useSeller();
  const [userR] = useUserR();
  const [userDB] = useUser();
  const fiUser = userDB.find((u) => u.email === user?.email);
  
  const handelLogOutBtn = () => {
    logoutUser();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Main Navbar */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600/95 via-purple-600/95 to-pink-600/95 backdrop-blur-lg border-b border-white/20 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo Section */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <Link to="/" className="flex items-center space-x-2">
                <div className="relative">
                  <HiShoppingBag className="text-3xl text-white drop-shadow-lg" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
                <div className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-white bg-clip-text text-transparent drop-shadow-lg">
                    NeXaBuY
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `relative px-4 py-2 text-white font-medium transition-all duration-300 hover:text-yellow-300 ${
                    isActive ? 'text-yellow-300' : ''
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Home
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-300 rounded-full"
                      />
                    )}
                  </>
                )}
              </NavLink>
              
              <NavLink 
                to="/product" 
                className={({ isActive }) => 
                  `relative px-4 py-2 text-white font-medium transition-all duration-300 hover:text-yellow-300 ${
                    isActive ? 'text-yellow-300' : ''
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Products
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-300 rounded-full"
                      />
                    )}
                  </>
                )}
              </NavLink>

              {userR && (
                <NavLink 
                  to="/dashboard/my-cart" 
                  className="relative flex items-center space-x-2 px-4 py-2 text-white font-medium transition-all duration-300 hover:text-yellow-300"
                >
                  <GiShoppingCart className="text-xl" />
                  <span>Cart</span>
                  {totalAddItm > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
                    >
                      {totalAddItm}
                    </motion.div>
                  )}
                </NavLink>
              )}
            </div>

            {/* User Section */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="relative group">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 p-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
                  >
                    <img
                      src={user?.photoURL}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border-2 border-white/50"
                    />
                  </motion.button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="p-4 border-b border-gray-200/50">
                      <div className="flex items-center space-x-3">
                        <img
                          src={user?.photoURL}
                          alt="Profile"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-800">{fiUser?.name}</h3>
                          <span className="inline-block px-3 py-1 text-xs font-medium bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full">
                            {fiUser?.role}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all duration-200"
                      >
                        <MdDashboard className="text-lg text-blue-600" />
                        <span className="font-medium">Dashboard</span>
                      </Link>
                      
                      <Link
                        to="/dashboard/help&support"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all duration-200"
                      >
                        <HiSupport className="text-lg text-green-600" />
                        <span className="font-medium">Help & Support</span>
                      </Link>
                      
                      <motion.button
                        onClick={handelLogOutBtn}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 mt-2"
                      >
                        <HiLogout className="text-lg" />
                        <span className="font-medium">Sign Out</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
              >
                {isMobileMenuOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-16 right-0 bottom-0 w-80 bg-gradient-to-b from-blue-600/95 via-purple-600/95 to-pink-600/95 backdrop-blur-lg border-l border-white/20 shadow-2xl z-40 lg:hidden"
          >
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <NavLink
                  to="/"
                  onClick={toggleMobileMenu}
                  className="block px-4 py-3 text-white font-medium text-lg hover:bg-white/20 rounded-xl transition-all duration-200"
                >
                  Home
                </NavLink>
                
                <NavLink
                  to="/product"
                  onClick={toggleMobileMenu}
                  className="block px-4 py-3 text-white font-medium text-lg hover:bg-white/20 rounded-xl transition-all duration-200"
                >
                  Products
                </NavLink>

                {userR && (
                  <NavLink
                    to="/dashboard/my-cart"
                    onClick={toggleMobileMenu}
                    className="flex items-center justify-between px-4 py-3 text-white font-medium text-lg hover:bg-white/20 rounded-xl transition-all duration-200"
                  >
                    <div className="flex items-center space-x-2">
                      <GiShoppingCart className="text-xl" />
                      <span>My Cart</span>
                    </div>
                    {totalAddItm > 0 && (
                      <span className="bg-red-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center font-bold">
                        {totalAddItm}
                      </span>
                    )}
                  </NavLink>
                )}
              </div>

              {user && (
                <div className="border-t border-white/20 pt-6 space-y-4">
                  <div className="flex items-center space-x-3 px-4">
                    <img
                      src={user?.photoURL}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/50"
                    />
                    <div>
                      <h3 className="font-semibold text-white">{fiUser?.name}</h3>
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-white/20 text-white rounded-full">
                        {fiUser?.role}
                      </span>
                    </div>
                  </div>
                  
                  <Link
                    to="/dashboard"
                    onClick={toggleMobileMenu}
                    className="flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/20 rounded-xl transition-all duration-200"
                  >
                    <MdDashboard className="text-lg" />
                    <span className="font-medium">Dashboard</span>
                  </Link>
                  
                  <Link
                    to="/dashboard/help&support"
                    onClick={toggleMobileMenu}
                    className="flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/20 rounded-xl transition-all duration-200"
                  >
                    <HiSupport className="text-lg" />
                    <span className="font-medium">Help & Support</span>
                  </Link>
                  
                  <motion.button
                    onClick={() => {
                      handelLogOutBtn();
                      toggleMobileMenu();
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-red-300 hover:bg-red-500/20 rounded-xl transition-all duration-200"
                  >
                    <HiLogout className="text-lg" />
                    <span className="font-medium">Sign Out</span>
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMobileMenu}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
