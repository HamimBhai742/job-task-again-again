import React from 'react';
import useProducts from '../../hooks/useProducts';
import LaProductCa from './LaProductCa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFire, FaArrowRight, FaShoppingBag } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const LatestProducts = () => {
    const [products] = useProducts();
    const sortedProducts = products.sort(
        (a, b) => new Date(b.productDaTa) - new Date(a.productDaTa)
    );
    const pro = sortedProducts.slice(0, 9);

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
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full px-4 py-2"
                >
                    <FaFire className="text-orange-400" />
                    <span className="text-white/90 text-sm font-medium">Hot Products</span>
                </motion.div>

                {/* Title */}
                <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                    Latest Products
                </h2>
                
                {/* Subtitle */}
                <p className="text-white/70 text-lg max-w-2xl mx-auto">
                    Discover our newest arrivals and trending items that everyone's talking about
                </p>

                {/* Decorative Line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"
                />
            </motion.div>

            {/* Products Grid */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {pro.map((product, index) => (
                    <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                    >
                        <LaProductCa product={product} />
                    </motion.div>
                ))}
            </motion.div>

            {/* See All Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="text-center"
            >
                <Link to="/product">
                    <motion.button
                        whileHover={{ 
                            scale: 1.05, 
                            y: -2,
                            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                        <FaShoppingBag className="text-lg" />
                        <span>See All Products</span>
                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <FaArrowRight className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
                        </motion.div>
                    </motion.button>
                </Link>
            </motion.div>

            {/* Stats Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="space-y-2"
                    >
                        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                            <HiSparkles className="text-2xl text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">New Daily</h3>
                        <p className="text-white/70">Fresh products added every day</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="space-y-2"
                    >
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                            <FaFire className="text-2xl text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Trending</h3>
                        <p className="text-white/70">Most popular items this week</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="space-y-2"
                    >
                        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                            <FaShoppingBag className="text-2xl text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Best Deals</h3>
                        <p className="text-white/70">Unbeatable prices guaranteed</p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default LatestProducts;
