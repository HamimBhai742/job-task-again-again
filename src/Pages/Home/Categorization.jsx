import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Products from "../Products/Products";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaLaptop,
  FaHome,
  FaBook,
  FaSpa,
  FaTshirt,
  FaArrowRight,
  FaTag,
  FaFire
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const Categorization = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handelEtBtn = async (productCategory) => {
    console.log(productCategory);
    navigate("/product", { state: { category: productCategory, statUs: true } });
  };

  const categories = [
    {
      name: "Electronics",
      image: "/Electronic.jpg",
      icon: FaLaptop,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/20 to-cyan-500/20",
      description: "Latest gadgets & tech",
      count: "500+ Products"
    },
    {
      name: "Home and Kitchen",
      image: "/homes.jpg",
      icon: FaHome,
      gradient: "from-green-500 to-teal-500",
      bgGradient: "from-green-500/20 to-teal-500/20",
      description: "Everything for your home",
      count: "300+ Products"
    },
    {
      name: "Books and Stationery",
      image: "/books.jpg",
      icon: FaBook,
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-500/20 to-indigo-500/20",
      description: "Knowledge & creativity",
      count: "200+ Products"
    },
    {
      name: "Health and Beauty",
      image: "/beuti.jpg",
      icon: FaSpa,
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-500/20 to-rose-500/20",
      description: "Beauty & wellness",
      count: "400+ Products"
    },
    {
      name: "Fashion",
      image: "/gdfgfdgf.jpg",
      icon: FaTshirt,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/20 to-red-500/20",
      description: "Style & trends",
      count: "600+ Products"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-4 py-2"
        >
          <FaTag className="text-purple-400" />
          <span className="text-white/90 text-sm font-medium">Shop by Category</span>
        </motion.div>

        {/* Title */}
        <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
          Products Categorize
        </h2>

        {/* Subtitle */}
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Explore our diverse range of products organized by categories to find exactly what you're looking for
        </p>

        {/* Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto"
        />
      </motion.div>

      {/* Categories Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
      >
        {categories.map((category, index) => {
          const IconComponent = category.icon;

          return (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => handelEtBtn(category.name)}
              className="group cursor-pointer"
            >
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>

                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-48 object-cover"
                    src={category.image}
                    alt={category.name}
                  />

                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.bgGradient} to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300`} />

                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="absolute top-4 right-4"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="text-white text-xl" />
                    </div>
                  </motion.div>

                  {/* Hot Badge */}
                  {index < 2 && (
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg"
                    >
                      <FaFire className="text-xs" />
                      <span>HOT</span>
                    </motion.div>
                  )}

                  {/* Hover Arrow */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute bottom-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white group-hover:bg-white/30 transition-all duration-300"
                  >
                    <FaArrowRight className="text-sm" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  {/* Category Name */}
                  <h3 className=" font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 text-sm leading-relaxed">
                    {category.description}
                  </p>

                  {/* Product Count */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <span className="text-white/60 text-xs font-medium">
                      {category.count}
                    </span>

                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <HiSparkles className="text-yellow-400 text-lg" />
                    </motion.div>
                  </div>
                </div>

                {/* Bottom Accent */}
                <div className={`h-1 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="text-center"
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">
              Can't find what you're looking for?
            </h3>
            <p className="text-white/70">
              Browse all our products or use our search feature to find exactly what you need
            </p>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/product")}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>View All Products</span>
              <FaArrowRight className="text-sm" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Categorization;
