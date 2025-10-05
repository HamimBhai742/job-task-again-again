import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import img from '/images.jpg'
import Swal from 'sweetalert2';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { FaGoogle, FaShoppingBag, FaEnvelope, FaLock } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import useUser from '../../hooks/useUser';
import { PiSpinner } from 'react-icons/pi';
import { motion } from 'framer-motion';

const Login = () => {
    const { loginUser, googleLogin } = useAuth()
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [showPass, setShowPass] = useState(false)
    const [focusedField, setFocusedField] = useState('')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [userDB] = useUser()
    
    const onSubmit = async (data) => {
        setLoading(true)
        console.log(data);
        const email = data.email
        const password = data.password
        const findSl = userDB.find(s => s.email === email)
        if (findSl?.status === 'pending') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You cannot login because your ID has not been activated by admin!",
            });
            setLoading(false)
            return
        }
        loginUser(email, password)
            .then(userData => {
                console.log(userData.user);
                if (userData.user) {
                    Swal.fire({
                        title: "Thank You!",
                        text: "Your login successfully!",
                        icon: "success"
                    });
                    setLoading(false)
                    navigate('/')
                    reset()
                }
            })
            .catch(error => {
                setLoading(false)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Incorrect your email or password!",
                });
            })
    }

    const handelGoogleLogin = () => {
        googleLogin().then((userData) => {
          console.log(userData.user);
          if (userData.user) {
            Swal.fire({
              title: "Thank You!",
              text: "Your login successfully!",
              icon: "success",
            });
            navigate("/");
            reset();
          }
        });
    }
    
    const handelShowBtn = (e) => {
        e.preventDefault();
        setShowPass(!showPass)
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400/30 to-red-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Floating Geometric Shapes */}
            <motion.div
                animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 180, 360]
                }}
                transition={{ 
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-20 left-20 w-4 h-4 bg-yellow-400/50 rounded-full"
            />
            <motion.div
                animate={{ 
                    y: [0, 30, 0],
                    x: [0, 20, 0]
                }}
                transition={{ 
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-40 right-32 w-6 h-6 bg-pink-400/50 rotate-45"
            />
            <motion.div
                animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, -180, -360]
                }}
                transition={{ 
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute bottom-32 left-32 w-8 h-8 border-2 border-blue-400/50 rounded-full"
            />

            {/* Main Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md mx-4"
            >
                <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
                    {/* Card Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                    
                    <div className="relative z-10">
                        {/* Logo & Welcome Section */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="text-center mb-8"
                        >
                            <div className="flex justify-center mb-4">
                                <div className="relative">
                                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                        <FaShoppingBag className="text-3xl text-white" />
                                    </div>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        className="absolute -top-2 -right-2"
                                    >
                                        <HiSparkles className="text-yellow-400 text-xl" />
                                    </motion.div>
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-2">
                                Welcome Back
                            </h1>
                            <p className="text-white/70 text-sm">
                                Sign in to continue your shopping journey
                            </p>
                        </motion.div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Email Field */}
                            <motion.div
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="relative"
                            >
                                <div className="relative">
                                    <FaEnvelope className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                                        focusedField === 'email' ? 'text-blue-400' : 'text-white/50'
                                    }`} />
                                    <input
                                        {...register("email")}
                                        type="email"
                                        required
                                        placeholder="Enter your email"
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField('')}
                                        className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-sm"
                                    />
                                </div>
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: focusedField === 'email' ? 1 : 0 }}
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full origin-left"
                                />
                            </motion.div>

                            {/* Password Field */}
                            <motion.div
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="relative"
                            >
                                <div className="relative">
                                    <FaLock className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                                        focusedField === 'password' ? 'text-blue-400' : 'text-white/50'
                                    }`} />
                                    <input
                                        {...register("password", {
                                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                        })}
                                        type={showPass ? "text" : "password"}
                                        required
                                        placeholder="Enter your password"
                                        onFocus={() => setFocusedField('password')}
                                        onBlur={() => setFocusedField('')}
                                        className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-sm"
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        type="button"
                                        onClick={handelShowBtn}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors duration-300"
                                    >
                                        {showPass ? <IoMdEyeOff className="text-xl" /> : <IoMdEye className="text-xl" />}
                                    </motion.button>
                                </div>
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: focusedField === 'password' ? 1 : 0 }}
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full origin-left"
                                />
                            </motion.div>

                            {/* Submit Button */}
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <motion.button
                                    whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="relative z-10 flex items-center justify-center">
                                        {loading ? (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            >
                                                <PiSpinner className="text-2xl" />
                                            </motion.div>
                                        ) : (
                                            "Sign In"
                                        )}
                                    </span>
                                </motion.button>
                            </motion.div>
                        </form>

                        {/* Divider */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center my-8"
                        >
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                            <span className="px-4 text-white/60 text-sm font-medium">or continue with</span>
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                        </motion.div>

                        {/* Google Login Button */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handelGoogleLogin}
                                type="button"
                                className="w-full py-4 bg-white/10 border border-white/20 text-white font-medium rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-3 group"
                            >
                                <FaGoogle className="text-xl group-hover:text-red-400 transition-colors duration-300" />
                                <span>Continue with Google</span>
                            </motion.button>
                        </motion.div>

                        {/* Sign Up Link */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="text-center mt-8"
                        >
                            <p className="text-white/70 text-sm">
                                Don't have an account?{' '}
                                <Link 
                                    to="/register"
                                    className="text-blue-400 hover:text-blue-300 font-semibold hover:underline transition-colors duration-300"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
