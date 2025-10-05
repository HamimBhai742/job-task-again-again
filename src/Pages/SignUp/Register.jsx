import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import img from "/images.jpg";
import Swal from "sweetalert2";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FaGoogle, FaUser, FaEnvelope, FaLock, FaUpload, FaStore, FaUserTie } from "react-icons/fa";
import { HiSparkles, HiUserGroup } from "react-icons/hi";
import { MdBusiness, MdCategory } from "react-icons/md";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useUser from "../../hooks/useUser";
import { PiSpinner } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";

const API_KEY = import.meta.env.VITE_IMAGE_API_KEY;
const Hosting = `https://api.imgbb.com/1/upload?key=${API_KEY}`;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const axiosPublic = useAxiosPublic();
  const { registerUser, updateUserProfile, googleLogin, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [userDB] = useUser();
  const [role, setRole] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    const imgeFile = { image: data.photo[0] };
    console.log(imgeFile, "imgfile");
    const res = await axios.post(Hosting, imgeFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(res.data.data.display_url);
    const email = data.email;
    const password = data.password;
    const name = data.name;
    const businessCategory = data.businessCategory;
    const photo = res.data.data.display_url;
    const findUser = userDB.find((u) => u.email === data.email);
    console.log(findUser);
    if (role) {
      const userData = {
        name,
        email,
        photo,
        role: "user",
      };

      console.log(userData);
      if (!findUser) {
        const resUser = await axiosPublic.post("/user", userData);
      }
    } else if (!role) {
      const sellerData = {
        name,
        email,
        photo,
        businessCategory,
        role: "seller",
        status: "pending",
      };
      if (!findUser) {
        const resSeller = await axiosPublic.post("/user", sellerData);
      }
    }
    registerUser(email, password)
      .then(async (userData) => {
        updateUserProfile(photo, name);
        if (userData.user) {
          Swal.fire({
            title: "Thank You!",
            text: "Your register successfully!",
            icon: "success",
          });
          setLoading(false);
          reset();
          navigate("/login");
          logoutUser();
        }
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This email already register!",
        });
      });
  };

  const handelGoogleLogin = () => {
    googleLogin()
      .then(async (datas) => {
        const findUser = userDB.find((u) => u.email === datas.user.email);
        const userData = {
          name: datas.user.displayName,
          email: datas.user.email,
          photo: datas.user.photoURL,
          role: "user",
        };
        navigate("/");
        if (!findUser) {
          const resUser = await axiosPublic.post("/user", userData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handelShowBtn = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  const handelRole = (e) => {
    const ro = e.target.value;
    console.log(ro);
    if (ro === "Seller") {
      setRole(false);
      console.log(ro);
    } else {
      setRole(true);
      console.log(ro);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Particles */}
      <motion.div
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 360]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-20 left-20 w-3 h-3 bg-yellow-400/60 rounded-full"
      />
      <motion.div
        animate={{ 
          y: [0, 40, 0],
          x: [0, 30, 0]
        }}
        transition={{ 
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-32 right-32 w-4 h-4 bg-pink-400/60 rotate-45"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.5, 1],
          rotate: [0, -360]
        }}
        transition={{ 
          duration: 22,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-40 left-40 w-6 h-6 border-2 border-blue-400/60 rounded-full"
      />

      {/* Main Register Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg mx-4"
      >
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
          {/* Card Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
          
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
                  <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <HiUserGroup className="text-3xl text-white" />
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
                Join NeXaBuY
              </h1>
              <p className="text-white/70 text-sm">
                Create your account and start your journey
              </p>
            </motion.div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Role Selection */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-white font-semibold text-lg mb-4">Choose Your Role</h3>
                <div className="grid grid-cols-2 gap-4" onChange={handelRole}>
                  <motion.label
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative flex flex-col items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      role 
                        ? 'border-blue-400 bg-blue-400/20 text-white' 
                        : 'border-white/30 bg-white/10 text-white/70 hover:border-white/50'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="v" 
                      value="Customer" 
                      className="sr-only"
                      required
                    />
                    <FaUser className="text-2xl mb-2" />
                    <span className="font-medium">Customer</span>
                  </motion.label>
                  
                  <motion.label
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative flex flex-col items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      !role 
                        ? 'border-purple-400 bg-purple-400/20 text-white' 
                        : 'border-white/30 bg-white/10 text-white/70 hover:border-white/50'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="v" 
                      value="Seller" 
                      className="sr-only"
                      required
                    />
                    <FaStore className="text-2xl mb-2" />
                    <span className="font-medium">Seller</span>
                  </motion.label>
                </div>
              </motion.div>

              {/* Name Field */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <div className="relative">
                  <FaUser className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                    focusedField === 'name' ? 'text-blue-400' : 'text-white/50'
                  }`} />
                  <input
                    {...register("name")}
                    type="text"
                    required
                    placeholder={role ? "Enter your full name" : "Enter seller name"}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField('')}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === 'name' ? 1 : 0 }}
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full origin-left"
                />
              </motion.div>

              {/* Business Category (Seller Only) */}
              <AnimatePresence>
                {!role && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative overflow-hidden"
                  >
                    <div className="relative">
                      <MdCategory className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                        focusedField === 'category' ? 'text-purple-400' : 'text-white/50'
                      }`} />
                      <select
                        {...register("businessCategory")}
                        required
                        onFocus={() => setFocusedField('category')}
                        onBlur={() => setFocusedField('')}
                        className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 backdrop-blur-sm appearance-none"
                      >
                        <option value="" disabled className="bg-gray-800 text-white">
                          Select your category
                        </option>
                        <option value="Electronics" className="bg-gray-800 text-white">Electronics</option>
                        <option value="Fashion" className="bg-gray-800 text-white">Fashion</option>
                        <option value="Home and Kitchen" className="bg-gray-800 text-white">Home and Kitchen</option>
                        <option value="Health and Beauty" className="bg-gray-800 text-white">Health and Beauty</option>
                        <option value="Books and Stationery" className="bg-gray-800 text-white">Books and Stationery</option>
                      </select>
                    </div>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: focusedField === 'category' ? 1 : 0 }}
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full origin-left"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email Field */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
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
                    placeholder={role ? "Enter your email" : "Enter business email"}
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
                transition={{ delay: 0.6 }}
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
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2"
                  >
                    Please provide a strong password
                  </motion.p>
                )}
              </motion.div>

              {/* Photo Upload */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="relative"
              >
                <div className="relative">
                  <FaUpload className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                    focusedField === 'photo' ? 'text-green-400' : 'text-white/50'
                  }`} />
                  <input
                    {...register("photo")}
                    type="file"
                    required
                    accept="image/*"
                    onFocus={() => setFocusedField('photo')}
                    onBlur={() => setFocusedField('')}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-500 file:to-purple-500 file:text-white hover:file:bg-gradient-to-r hover:file:from-blue-600 hover:file:to-purple-600 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === 'photo' ? 1 : 0 }}
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 rounded-full origin-left"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center justify-center">
                    {loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <PiSpinner className="text-2xl" />
                      </motion.div>
                    ) : (
                      "Create Account"
                    )}
                  </span>
                </motion.button>
              </motion.div>
            </form>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
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
              transition={{ delay: 1.0 }}
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handelGoogleLogin}
                disabled={!role}
                type="button"
                className={`w-full py-4 border border-white/20 text-white font-medium rounded-2xl backdrop-blur-sm transition-all duration-300 flex items-center justify-center space-x-3 group ${
                  role 
                    ? 'bg-white/10 hover:bg-white/20' 
                    : 'bg-white/5 text-white/50 cursor-not-allowed'
                }`}
              >
                <FaGoogle className={`text-xl transition-colors duration-300 ${
                  role ? 'group-hover:text-red-400' : ''
                }`} />
                <span>Continue with Google</span>
                {!role && <span className="text-xs">(Customer only)</span>}
              </motion.button>
            </motion.div>

            {/* Sign In Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-center mt-8"
            >
              <p className="text-white/70 text-sm">
                Already have an account?{' '}
                <Link 
                  to="/login"
                  className="text-blue-400 hover:text-blue-300 font-semibold hover:underline transition-colors duration-300"
                >
                  Sign In
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
