import React, { useState } from "react";
import ReactStars from "react-stars";
import useProducts from "../../hooks/useProducts";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useMyCarts from "../../hooks/useMyCarts";
import { motion, useAnimation } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import useSeller from "../../hooks/useSeller";
import { ShoppingCart, Heart, Eye } from "lucide-react";

const ProductsCard = ({ product }) => {
  const controls = useAnimation();
  const [clicked, setClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [myCarts, refetch] = useMyCarts();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [products] = useProducts();
  const [admin] = useAdmin();
  const [seller] = useSeller();
  const [loading, setLoading] = useState(false);

  const {
    productRating,
    productAddingTime,
    _id,
    productPrice,
    offerPrice,
    brandName,
    productName,
    productImg,
    productDescription,
    productCategory,
  } = product;

  const handelAddToCartBtn = async (id) => {
    setLoading(true);
    setClicked(true);

    await controls.start({
      x: [0, 20, -10, 0],
      transition: { duration: 0.6, ease: "easeInOut" },
    });

    if (admin) {
      setLoading(false);
      setClicked(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You can't add products to cart because you are an admin!",
      });
      return;
    } else if (seller) {
      setLoading(false);
      setClicked(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You can't add products to cart because you are an seller!",
      });
      return;
    }

    const findMyItem = products.find((product) => product._id === id);
    const findM = myCarts.find((product) => product.productId === id);
    const { productName, productImg, productPrice, offerPrice } = findMyItem;
    const addCart = {
      productName,
      productImg,
      productPrice: offerPrice || productPrice,
      productId: id,
      productQuantity: 1,
      myEmail: user?.email,
    };

    if (!findM) {
      const res = await axiosPublic.post("/add-to-cart", addCart);
      if (res.data.insertedId) {
        setLoading(false);
        setClicked(false);
        Swal.fire({
          title: "Thank You!",
          text: "Your product add to cart!",
          icon: "success",
        });
        refetch();
      }
    } else {
      const pervPr = findM.productPrice;
      const pr = productPrice;
      const totalPr = parseFloat(pervPr + pr);
      const pervQty = findM.productQuantity;
      const qty = 1;
      const totalQty = parseInt(pervQty + qty);

      const re = await axiosPublic.patch(
        `/add-to-cart/${findM._id}?price=${totalPr}&&qty=${totalQty}`
      );
      if (re.data.modifiedCount) {
        setLoading(false);
        setClicked(false);
        Swal.fire({
          title: "Thank You!",
          text: "Your product add to cart!",
          icon: "success",
        });
      }
      refetch();
    }
  };

  const discountPercentage = offerPrice
    ? Math.round(((productPrice - offerPrice) / productPrice) * 100)
    : 0;

  return (
    <motion.div
      className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <motion.img
          src={productImg}
          alt={productName}
          className="w-full h-64 object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <div className="flex flex-col gap-2">
            {discountPercentage > 0 && (
              <span className="bg-gradient-to-r w-fit from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                -{discountPercentage}%
              </span>
            )}
          </div>
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            {brandName}
          </span>
        </div>

        {/* Hover Actions */}
        <motion.div
          className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className="w-5 h-5" />
          </motion.button>
          <motion.button
            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <span className="inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 px-3 py-1 rounded-full text-xs font-medium">
            {productCategory}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
          {productName}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
          {productDescription}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <ReactStars
            value={productRating}
            edit={false}
            size={18}
            color2="#fbbf24"
            color1="#374151"
          />
          <span className="text-gray-400 text-sm">({productRating})</span>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {offerPrice && (
              <span className="text-gray-400 line-through text-sm">
                ${productPrice}
              </span>
            )}
            <span className="text-2xl font-bold text-white">
              ${offerPrice || productPrice}
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          onClick={() => handelAddToCartBtn(_id)}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.span animate={controls}>
            <ShoppingCart className="w-5 h-5" />
          </motion.span>
          <span className={`${clicked ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}>
            {loading ? "Adding..." : "Add to Cart"}
          </span>
        </motion.button>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default ProductsCard;
