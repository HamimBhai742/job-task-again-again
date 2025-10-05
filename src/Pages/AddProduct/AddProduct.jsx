import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useUser from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";

const API_KEY = import.meta.env.VITE_IMAGE_API_KEY;
const Hosting = `https://api.imgbb.com/1/upload?key=${API_KEY}`;

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const [userDB] = useUser();
  const { user } = useAuth();
  const findUser = userDB.find((u) => u.email === user?.email);
  console.log(findUser);
  
  const onSubmit = async (data) => {
    console.log(data);
    const imgeFile = { image: data.productImg[0] };
    console.log(imgeFile, "imgfile");
    const res = await axios.post(Hosting, imgeFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(res.data.data.display_url);
    const timeAndDate = new Date().toLocaleString();
    const time = new Date();

    const addProduct = {
      productName: data.productName,
      brandName: data.brandName,
      email: findUser?.email,
      productImg: res.data.data.display_url,
      productRating: parseFloat(data.productRating),
      productCategory: findUser?.businessCategory,
      productDescription: data.productDescription,
      productPrice: parseFloat(data.productPrice),
      offerPrice: parseFloat(data.offerPrice),
      productAddingTime: timeAndDate,
      productDaTa: time,
    };

    const resProduct = await axiosPublic.post("/products", addProduct);
    console.log(resProduct.data);
    if (resProduct.data.insertedId) {
      Swal.fire({
        title: "Thank You!",
        text: "Your product added successfully!",
        icon: "success",
      });
      reset();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900 p-4 sm:p-6">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center py-8 px-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-b border-white/20"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
            Add Product
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
            Add your favorite product. Mention the price along with the product. Also mention the time and date of adding the product.
          </p>
        </motion.div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=""
          action=""
          className="p-6 sm:p-8"
        >
          <motion.fieldset 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Brand Name */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-2"
              >
                <label className="text-sm font-semibold text-white">Brand Name</label>
                <input
                  required
                  {...register("brandName")}
                  type="text"
                  placeholder="Brand Name"
                  className="w-full h-12 px-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all backdrop-blur-sm"
                />
              </motion.div>

              {/* Product Name */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-2"
              >
                <label className="text-sm font-semibold text-white">Product Name</label>
                <input
                  required
                  {...register("productName")}
                  type="text"
                  placeholder="Product Name"
                  className="w-full h-12 px-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all backdrop-blur-sm"
                />
              </motion.div>

              {/* Product Category */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="space-y-2"
              >
                <label className="text-sm font-semibold text-white">Product Category</label>
                <input
                  disabled={findUser?.businessCategory}
                  defaultValue={findUser?.businessCategory}
                  required
                  {...register("productCategory")}
                  type="text"
                  placeholder="Product Category"
                  className="w-full h-12 px-4 bg-white/5 border border-white/20 rounded-xl text-gray-300 placeholder-gray-500 cursor-not-allowed backdrop-blur-sm"
                />
              </motion.div>

              {/* Seller Email */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="space-y-2"
              >
                <label className="text-sm font-semibold text-white">Seller Email</label>
                <input
                  disabled={findUser?.email}
                  defaultValue={findUser?.email}
                  required
                  {...register("sellerEmail")}
                  type="text"
                  placeholder="Seller Email"
                  className="w-full h-12 px-4 bg-white/5 border border-white/20 rounded-xl text-gray-300 placeholder-gray-500 cursor-not-allowed backdrop-blur-sm"
                />
              </motion.div>

              {/* Product Price */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="space-y-2"
              >
                <label className="text-sm font-semibold text-white">Product Price</label>
                <input
                  required
                  {...register("productPrice", { pattern: /^\d*\.?\d*$/ })}
                  type="text"
                  placeholder="Product Price"
                  className="w-full h-12 px-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all backdrop-blur-sm"
                />
                {errors.productPrice && (
                  <p className="text-red-400 text-sm">Please provide only number</p>
                )}
              </motion.div>

              {/* Offer Price */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="space-y-2"
              >
                <label className="text-sm font-semibold text-white">Offer Price</label>
                <input
                  required
                  {...register("offerPrice", { pattern: /^\d*\.?\d*$/ })}
                  type="text"
                  placeholder="Offer Price"
                  className="w-full h-12 px-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all backdrop-blur-sm"
                />
                {errors.offerPrice && (
                  <p className="text-red-400 text-sm">Please provide only number</p>
                )}
              </motion.div>

              {/* Product Rating */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="space-y-2"
              >
                <label className="text-sm font-semibold text-white">Product Rating</label>
                <input
                  required
                  {...register("productRating", {
                    min: 0,
                    max: 5,
                    pattern: /^\d*\.?\d*$/,
                  })}
                  type="text"
                  placeholder="Product Rating (0-5)"
                  className="w-full h-12 px-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all backdrop-blur-sm"
                />
                {errors.productRating && (
                  <p className="text-red-400 text-sm">Please provide rating only 0 to 5</p>
                )}
              </motion.div>

              {/* Product Image */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="space-y-2"
              >
                <label htmlFor="productImg" className="text-sm font-semibold text-white">
                  Product Image
                </label>
                <input
                  id="productImg"
                  type="file"
                  {...register("productImg", {
                    required: "Product image is required",
                  })}
                  className="w-full h-12 px-4 bg-white/10 border border-white/20 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-purple-500 file:to-pink-500 file:text-white file:font-medium hover:file:from-purple-600 hover:file:to-pink-600 transition-all backdrop-blur-sm"
                />
                {errors.productImg && (
                  <p className="text-red-400 text-sm">{errors.productImg.message}</p>
                )}
              </motion.div>
            </div>

            {/* Product Description */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="space-y-2"
            >
              <label className="text-sm font-semibold text-white">Product Description</label>
              <textarea
                required
                {...register("productDescription")}
                placeholder="Product Description...."
                rows="4"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all backdrop-blur-sm resize-none"
              ></textarea>
            </motion.div>

            {/* Submit Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="pt-4"
            >
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Add Product
              </motion.button>
            </motion.div>
          </motion.fieldset>
        </form>
      </motion.section>
    </div>
  );
};

export default AddProduct;
