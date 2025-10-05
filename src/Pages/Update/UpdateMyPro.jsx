import React from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useUser from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import useMyProducts from "../../hooks/useMyProducts";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FiEdit3, FiSave } from "react-icons/fi";

const UpdateMyPro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [userDB] = useUser();
  const { user } = useAuth();
  const [myProducts] = useMyProducts();
  const findUser = userDB.find((u) => u.email === user?.email);
  const findProduct = myProducts.find((my) => my?._id === id);
  console.log(findProduct);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      productName: findProduct?.productName || "",
      brandName: findProduct?.brandName || "",
      productCategory: findUser?.businessCategory || "",
      sellerEmail: findUser?.email || "",
      productPrice: findProduct?.productPrice || "",
      productRating: findProduct?.productRating || "",
      productDescription: findProduct?.productDescription || "",
    },
  });

  const onSubmit = async (data) => {
    const updateProduct = getValues();
    console.log(updateProduct);
    const resProduct = await axiosPublic.patch(
      `/update-my-product/${findProduct?._id}`,
      updateProduct
    );
    console.log(resProduct.data);
    if (resProduct.data.modifiedCount) {
      Swal.fire({
        title: "Thank You!",
        text: "Your product update successfully!",
        icon: "success",
      });
      navigate("/dashboard/my-products");
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
          className="text-center py-8 px-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-white/20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FiEdit3 className="text-3xl text-blue-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Update Product
            </h1>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
            Update your favorite product. Mention the price along with the product. Also mention the time and date of adding the product.
          </p>
        </motion.div>

        {/* Product Preview Card */}
        {findProduct && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-6 mt-6 p-4 bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl"
          >
            <div className="flex items-center gap-4">
              <img 
                src={findProduct?.productImg} 
                alt={findProduct?.productName}
                className="w-16 h-16 rounded-lg object-cover border-2 border-white/30"
              />
              <div>
                <h3 className="text-white font-semibold">{findProduct?.productName}</h3>
                <p className="text-gray-300 text-sm">Currently editing this product</p>
              </div>
            </div>
          </motion.div>
        )}

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
                  defaultValue={findProduct?.brandName}
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
                  defaultValue={findProduct?.productName}
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
                  defaultValue={findProduct?.productPrice}
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
                  defaultValue={findProduct?.offerPrice}
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
                className="space-y-2 sm:col-span-2"
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
                  defaultValue={findProduct?.productRating}
                  placeholder="Product Rating (0-5)"
                  className="w-full h-12 px-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all backdrop-blur-sm"
                />
                {errors.productRating && (
                  <p className="text-red-400 text-sm">Please provide rating only 0 to 5</p>
                )}
              </motion.div>
            </div>

            {/* Product Description */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="space-y-2"
            >
              <label className="text-sm font-semibold text-white">Product Description</label>
              <textarea
                required
                defaultValue={findProduct?.productDescription}
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
              transition={{ duration: 0.6, delay: 1.3 }}
              className="pt-4"
            >
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-lg py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <FiSave className="text-xl" />
                Update Product
              </motion.button>
            </motion.div>
          </motion.fieldset>
        </form>
      </motion.section>
    </div>
  );
};

export default UpdateMyPro;
