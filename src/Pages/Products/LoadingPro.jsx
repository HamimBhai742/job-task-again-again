import { motion } from 'framer-motion';

const LoadingPro = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900 flex items-center justify-center z-50">

      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main Loading Container */}
      <motion.div
        className="relative backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 rounded-3xl p-8 sm:p-12 shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >

        {/* Central Loading Spinner */}
        <div className="flex flex-col items-center space-y-6">

          {/* Main Spinner */}
          <div className="relative">
            <motion.div
              className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-purple-500/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 border-4 border-transparent border-t-purple-500 border-r-pink-500 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 w-16 h-16 sm:w-20 sm:h-20 border-2 border-transparent border-t-blue-400 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Loading Text */}
          <div className="text-center space-y-2">
            <motion.h2
              className="text-2xl sm:text-3xl font-bold text-white"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Loading Products
            </motion.h2>
            <motion.p
              className="text-gray-300 text-sm sm:text-base"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Please wait while we fetch the latest products...
            </motion.p>
          </div>

          {/* Progress Bar */}
          <div className="w-64 sm:w-80 bg-white/10 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Animated Dots */}
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl" />
      </motion.div>

      {/* Loading Skeleton Cards */}
      <div className="absolute bottom-8 left-8 right-8 hidden lg:block">
        <div className="grid grid-cols-4 gap-4 opacity-20">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-4 space-y-3"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            >
              <div className="bg-white/10 h-32 rounded-lg" />
              <div className="space-y-2">
                <div className="bg-white/10 h-4 rounded w-3/4" />
                <div className="bg-white/10 h-3 rounded w-1/2" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingPro;
