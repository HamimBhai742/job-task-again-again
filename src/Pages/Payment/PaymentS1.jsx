import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdOutlineAlternateEmail, MdOutlinePayment, MdLocalShipping, MdSecurity } from 'react-icons/md';
import { PiCardholderThin, PiSpinner } from 'react-icons/pi';
import { FaUser, FaPhone, FaMapMarkerAlt, FaShieldAlt, FaClock, FaTruck } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import useMyCarts from '../../hooks/useMyCarts';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { RiNumbersFill } from 'react-icons/ri';
import useAuth from '../../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

const PaymentS1 = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [shipping, setShipping] = useState('');
    const [focusedField, setFocusedField] = useState('');
    const [myCarts, refetch] = useMyCarts();
    console.log(myCarts)
    const subTotalPrice = myCarts.reduce((p, q) => Number(p) + Number(q.productPrice), 0);
    const [shippingCrarge, setShippingCharge] = useState(0.00);
    const [plcBtn, setPlcBtn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [animatedSubtotal, setAnimatedSubtotal] = useState(0);
    const [animatedShipping, setAnimatedShipping] = useState(0);
    const [animatedTotal, setAnimatedTotal] = useState(0);

    const totalPrice = parseFloat(subTotalPrice + shippingCrarge);

    // Animate price values
    useEffect(() => {
        const animateValue = (target, setter) => {
            let current = 0;
            const increment = target / 30;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    setter(target);
                    clearInterval(timer);
                } else {
                    setter(current);
                }
            }, 30);
        };

        animateValue(subTotalPrice, setAnimatedSubtotal);
        animateValue(shippingCrarge, setAnimatedShipping);
        animateValue(totalPrice, setAnimatedTotal);
    }, [subTotalPrice, shippingCrarge, totalPrice]);

    const handelShippingBtn = (e) => {
        setShipping(e.target.value);
        if (e.target.value === 'inDhaka') {
            setShippingCharge(6.99);
            setPlcBtn(true);
        } else if (e.target.value === 'outDhaka') {
            setShippingCharge(12.99);
            setPlcBtn(true);
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);
        const payDetails = {
            cardHolder: data.cardHolder,
            amount: totalPrice,
            email: user?.email,
            state: data.state,
            billingAddress: data.billingAddress,
            imgCu: user?.photoURL
        };

        const res = await axiosPublic.post('/payment', payDetails);
        const rrr = await axiosPublic.post('/pay-setp', {
            status: 'pending',
            stepEmail: user?.email
        });

        const redrictUrl = res.data.paymentUrl;
        if (redrictUrl) {
            window.location.replace(redrictUrl);
            setLoading(false);
        }
    };

    const shippingOptions = [
        {
            id: 'inDhaka',
            title: 'Inside Dhaka',
            subtitle: 'Delivery: 2 - 3 Days',
            price: 6.99,
            icon: FaTruck,
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            id: 'outDhaka',
            title: 'Outside Dhaka',
            subtitle: 'Delivery: 3 - 7 Days',
            price: 12.99,
            icon: MdLocalShipping,
            gradient: 'from-purple-500 to-pink-500'
        }
    ];

    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4">
                        Checkout & Shipping
                    </h1>
                    <p className="text-white/80 text-lg">
                        Complete your order with secure payment
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Form */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Shipping Options */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/15 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-2xl"
                        >
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                                <MdLocalShipping className="text-blue-400" />
                                <span>Shipping Options</span>
                            </h2>

                            <div className="space-y-4" onChange={handelShippingBtn}>
                                {shippingOptions.map((option, index) => (
                                    <motion.div
                                        key={option.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        whileHover={{ scale: 1.02 }}
                                        className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                                            shipping === option.id
                                                ? 'border-blue-400 bg-blue-400/20 shadow-lg'
                                                : 'border-white/30 bg-white/10 hover:border-white/50'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className={`p-3 rounded-2xl bg-gradient-to-r ${option.gradient}`}>
                                                    <option.icon className="text-2xl text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white">{option.title}</h3>
                                                    <p className="text-white/80 flex items-center space-x-1">
                                                        <FaClock className="text-sm" />
                                                        <span>{option.subtitle}</span>
                                                    </p>
                                                    <p className="text-green-400 font-semibold">${option.price}</p>
                                                </div>
                                            </div>
                                            <div className="relative">
                                                <input
                                                    value={option.id}
                                                    type="radio"
                                                    name="radio-1"
                                                    className="w-6 h-6 text-blue-600 bg-transparent border-2 border-white/50 focus:ring-blue-500 focus:ring-2"
                                                />
                                                {shipping === option.id && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="absolute inset-0 flex items-center justify-center"
                                                    >
                                                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Delivery Details Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white/15 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-2xl"
                        >
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                                <FaUser className="text-green-400" />
                                <span>Delivery Details</span>
                            </h2>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Name Field */}
                                <div className="relative">
                                    <label className="block text-white text-sm font-medium mb-2">Full Name</label>
                                    <div className="relative">
                                        <FaUser className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                                            focusedField === 'name' ? 'text-blue-400' : 'text-white/60'
                                        }`} />
                                        <input
                                            {...register("cardHolder", {
                                                required: true,
                                                pattern: /^[A-Za-z\s]+$/,
                                            })}
                                            type="text"
                                            placeholder="Enter your full name"
                                            onFocus={() => setFocusedField('name')}
                                            onBlur={() => setFocusedField('')}
                                            className="w-full pl-12 pr-4 py-4 bg-white/15 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-sm"
                                        />
                                    </div>
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: focusedField === 'name' ? 1 : 0 }}
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full origin-left"
                                    />
                                    {errors.cardHolder && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-400 text-sm mt-2"
                                        >
                                            Please provide your valid name!
                                        </motion.p>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div className="relative">
                                    <label className="block text-white text-sm font-medium mb-2">Email Address</label>
                                    <div className="relative">
                                        <MdOutlineAlternateEmail className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                                            focusedField === 'email' ? 'text-blue-400' : 'text-white/60'
                                        }`} />
                                        <input
                                            {...register("email")}
                                            type="email"
                                            placeholder="your.email@gmail.com"
                                            defaultValue={user?.email}
                                            disabled={user}
                                            onFocus={() => setFocusedField('email')}
                                            onBlur={() => setFocusedField('')}
                                            className="w-full pl-12 pr-4 py-4 bg-white/15 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-sm disabled:opacity-70"
                                        />
                                    </div>
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: focusedField === 'email' ? 1 : 0 }}
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full origin-left"
                                    />
                                </div>

                                {/* Phone Field */}
                                <div className="relative">
                                    <label className="block text-white text-sm font-medium mb-2">Phone Number</label>
                                    <div className="relative">
                                        <FaPhone className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                                            focusedField === 'phone' ? 'text-blue-400' : 'text-white/60'
                                        }`} />
                                        <input
                                            {...register("number", {
                                                required: true,
                                                pattern: /^(?:\+88|88)?(01[3-9]\d{8})$/,
                                            })}
                                            type="text"
                                            placeholder="Your phone number"
                                            onFocus={() => setFocusedField('phone')}
                                            onBlur={() => setFocusedField('')}
                                            className="w-full pl-12 pr-4 py-4 bg-white/15 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-sm"
                                        />
                                    </div>
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: focusedField === 'phone' ? 1 : 0 }}
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full origin-left"
                                    />
                                    {errors.number && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-400 text-sm mt-2"
                                        >
                                            Please provide your valid phone number!
                                        </motion.p>
                                    )}
                                </div>

                                {/* Billing Address */}
                                <div className="space-y-4">
                                    <label className="block text-white text-sm font-medium">Billing Address</label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {/* Address */}
                                        <div className="md:col-span-2 relative">
                                            <div className="relative">
                                                <FaMapMarkerAlt className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                                                    focusedField === 'address' ? 'text-blue-400' : 'text-white/60'
                                                }`} />
                                                <input
                                                    {...register("billingAddress", { required: true })}
                                                    type="text"
                                                    placeholder="Full Address"
                                                    onFocus={() => setFocusedField('address')}
                                                    onBlur={() => setFocusedField('')}
                                                    className="w-full pl-12 pr-4 py-4 bg-white/15 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-sm"
                                                />
                                            </div>
                                            <motion.div
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: focusedField === 'address' ? 1 : 0 }}
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full origin-left"
                                            />
                                        </div>

                                        {/* State */}
                                        <div className="relative">
                                            <select
                                                {...register("state")}
                                                className="w-full px-4 py-4 bg-white/15 border border-white/30 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-sm appearance-none"
                                            >
                                                <option value="" disabled className="bg-slate-800 text-white">Select State</option>
                                                <option disabled={shipping !== "inDhaka"} value="Dhaka" className="bg-slate-800 text-white">Dhaka</option>
                                                <option disabled={shipping === "inDhaka"} value="Chattogram" className="bg-slate-800 text-white">Chattogram</option>
                                                <option disabled={shipping === "inDhaka"} value="Barishal" className="bg-slate-800 text-white">Barishal</option>
                                                <option disabled={shipping === "inDhaka"} value="Khulna" className="bg-slate-800 text-white">Khulna</option>
                                                <option disabled={shipping === "inDhaka"} value="Rangpur" className="bg-slate-800 text-white">Rangpur</option>
                                                <option disabled={shipping === "inDhaka"} value="Rajshahi" className="bg-slate-800 text-white">Rajshahi</option>
                                                <option disabled={shipping === "inDhaka"} value="Mymensingh" className="bg-slate-800 text-white">Mymensingh</option>
                                                <option disabled={shipping === "inDhaka"} value="Sylhet" className="bg-slate-800 text-white">Sylhet</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* ZIP Code */}
                                    <div className="relative max-w-xs">
                                        <input
                                            {...register("ZIP", { required: true, pattern: /^\d{1,5}$/ })}
                                            type="text"
                                            placeholder="ZIP Code"
                                            onFocus={() => setFocusedField('zip')}
                                            onBlur={() => setFocusedField('')}
                                            className="w-full px-4 py-4 bg-white/15 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-sm"
                                        />
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: focusedField === 'zip' ? 1 : 0 }}
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full origin-left"
                                        />
                                        {errors.ZIP && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-red-400 text-sm mt-2"
                                            >
                                                ZIP code should only contain numbers
                                            </motion.p>
                                        )}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={!plcBtn || loading}
                                    className={`w-full py-4 font-semibold rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                                        plcBtn && !loading
                                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-xl'
                                            : 'bg-gray-600/50 text-gray-300 cursor-not-allowed'
                                    }`}
                                >
                                    {loading ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        >
                                            <PiSpinner className="text-2xl" />
                                        </motion.div>
                                    ) : (
                                        <>
                                            <FaShieldAlt className="text-lg" />
                                            <span>Place Secure Order</span>
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white/15 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-2xl h-fit sticky top-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                            <MdOutlinePayment className="text-purple-400" />
                            <span>Order Summary</span>
                        </h2>

                        <div className="space-y-4">
                            {/* Subtotal */}
                            <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl">
                                <span className="text-white/90">Subtotal</span>
                                <span className="text-white font-semibold text-lg">
                                    ${animatedSubtotal.toFixed(2)}
                                </span>
                            </div>

                            {/* Shipping */}
                            <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl">
                                <span className="text-white/90">Shipping</span>
                                <span className="text-white font-semibold text-lg">
                                    ${animatedShipping.toFixed(2)}
                                </span>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

                            {/* Total */}
                            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-2xl border border-purple-500/40">
                                <span className="text-white font-semibold text-lg">Total</span>
                                <span className="text-white font-bold text-2xl">
                                    ${animatedTotal.toFixed(2)}
                                </span>
                            </div>

                            {/* Security Badge */}
                            <div className="mt-6 p-4 bg-green-500/20 border border-green-500/40 rounded-2xl">
                                <div className="flex items-center space-x-3">
                                    <MdSecurity className="text-green-400 text-2xl" />
                                    <div>
                                        <p className="text-green-400 font-semibold">Secure Payment</p>
                                        <p className="text-white/80 text-sm">SSL encrypted checkout</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default PaymentS1;
