import React, { useState } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { IoBagAddOutline, IoExitOutline, IoSearchOutline } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaHistory, FaShoppingBag, FaUser } from "react-icons/fa";
import { MdDashboard, MdManageAccounts } from "react-icons/md";
import { HiSparkles } from "react-icons/hi";
import useUserR from "../../hooks/useUserR";
import useAdmin from "../../hooks/useAdmin";
import useSeller from "../../hooks/useSeller";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ isMobile = false, onClose = () => {} }) => {
  const { user, logoutUser } = useAuth();
  const [userR] = useUserR();
  const [admin] = useAdmin();
  const [seller] = useSeller();
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();

  const handelLogoutBtn = () => {
    logoutUser();
    navigate("/login");
    toast.success("Logout successful");
    if (isMobile) onClose();
  };

  const handleNavClick = () => {
    if (isMobile) onClose();
  };

  const menuItems = [
    // Dashboard for non-sellers
    ...( [{
      to: "/dashboard",
      icon: MdDashboard,
      label: "Dashboard",
      color: "from-blue-500 to-purple-500",
      end: true
    }] ),

    // Seller specific items
    ...(seller ? [
      {
        to: "/dashboard/add-product",
        icon: IoBagAddOutline,
        label: "Add Product",
        color: "from-green-500 to-teal-500"
      },
      {
        to: "/dashboard/my-products",
        icon: GiShoppingCart,
        label: "My Products",
        color: "from-orange-500 to-red-500"
      }
    ] : []),

    // Admin specific items
    ...(admin ? [{
      to: "/dashboard/manage-all",
      icon: MdManageAccounts,
      label: "Manage All",
      color: "from-purple-500 to-pink-500"
    }] : []),

    // User specific items
    ...(userR ? [
      {
        to: "/dashboard/my-cart",
        icon: GiShoppingCart,
        label: "My Cart",
        color: "from-blue-500 to-cyan-500"
      },
      {
        to: "/dashboard/history",
        icon: FaHistory,
        label: "History",
        color: "from-indigo-500 to-purple-500"
      }
    ] : [])
  ];

  const sidebarContent = (
    <aside className="flex flex-col w-72 h-full px-6 py-8 overflow-y-auto bg-gradient-to-b from-slate-900/95 via-blue-900/95 to-purple-900/95 backdrop-blur-xl border-r border-white/10 shadow-2xl">

      {/* Logo Section */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="mb-8"
      >
        <Link to="/" className="flex items-center space-x-3 group" onClick={handleNavClick}>
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <FaShoppingBag className="text-2xl text-white" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1 -right-1"
            >
              <HiSparkles className="text-yellow-400 text-lg" />
            </motion.div>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              NeXaBuY
            </h2>
            <p className="text-xs text-white/60">Dashboard</p>
          </div>
        </Link>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative mb-8"
      >
        <div className="relative">
          <IoSearchOutline className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-lg transition-colors duration-300 ${
            searchFocused ? 'text-blue-400' : 'text-white/50'
          }`} />
          <input
            type="text"
            placeholder="Search dashboard..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-sm"
          />
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: searchFocused ? 1 : 0 }}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full origin-left"
        />
      </motion.div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-4">
            Navigation
          </h3>

          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `group flex items-center px-4 py-3 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                      isActive
                        ? 'bg-white/20 text-white shadow-lg'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Background gradient for active state */}
                      {isActive && (
                        <motion.div
                          layoutId="activeBackground"
                          className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-20 rounded-2xl`}
                        />
                      )}

                      {/* Icon */}
                      <div className={`relative z-10 p-2 rounded-xl transition-all duration-300 ${
                        isActive
                          ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                          : 'bg-white/10 group-hover:bg-white/20'
                      }`}>
                        <item.icon className="text-lg" />
                      </div>

                      {/* Label */}
                      <span className="relative z-10 ml-4 font-medium">
                        {item.label}
                      </span>

                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute right-4 w-2 h-2 bg-white rounded-full"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </nav>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="my-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />

      {/* User Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="space-y-4"
      >
        {/* User Info */}
        <div className="flex items-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
          <div className="relative">
            <img
              src={user?.photoURL}
              alt="Profile"
              className="w-12 h-12 rounded-xl object-cover border-2 border-white/30"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white/50"></div>
          </div>
          <div className="ml-4 flex-1">
            <h4 className="font-semibold text-white text-sm truncate">
              {user?.displayName}
            </h4>
            <p className="text-xs text-white/60">
              {admin ? 'Administrator' : seller ? 'Seller' : 'Customer'}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={handelLogoutBtn}
          className="w-full flex items-center px-4 py-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 text-red-300 rounded-2xl transition-all duration-300 hover:from-red-500/30 hover:to-pink-500/30 hover:border-red-400/50 hover:text-red-200 group"
        >
          <div className="p-2 bg-red-500/20 rounded-xl group-hover:bg-red-500/30 transition-colors duration-300">
            <IoExitOutline className="text-lg" />
          </div>
          <span className="ml-4 font-medium">Log Out</span>
        </motion.button>
      </motion.div>

      {/* Bottom Decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="mt-4 text-center"
      >
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-400/50 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-400/50 rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-pink-400/50 rounded-full animate-pulse delay-200"></div>
        </div>
        <p className="text-xs text-white/40 mt-2">v2.0.1</p>
      </motion.div>
    </aside>
  );

  if (isMobile) {
    return sidebarContent;
  }

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed left-0 top-0 h-screen z-40 lg:block hidden"
    >
      {sidebarContent}
    </motion.div>
  );
};

export default Sidebar;
