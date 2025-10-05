import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Sidebar/Sidebar';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileSidebar}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            
            {/* Mobile Sidebar */}
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed left-0 top-0 h-screen z-50 lg:hidden"
            >
              <div className="relative">
                <button
                  onClick={toggleMobileSidebar}
                  className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                >
                  <HiX className="text-xl" />
                </button>
                <Sidebar isMobile={true} onClose={toggleMobileSidebar} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 lg:ml-72">
        
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-30 backdrop-blur-xl bg-white/10 border-b border-white/20 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={toggleMobileSidebar}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-all"
            >
              <HiMenuAlt3 className="text-2xl" />
            </button>
            <h1 className="text-lg font-semibold text-white">Dashboard</h1>
            <div className="w-10"></div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
