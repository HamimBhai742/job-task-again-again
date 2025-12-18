import React, { useRef, useState } from "react";
import { Virtual, Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import { FaCrown, FaStar, FaChevronLeft, FaChevronRight, FaAward } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const brands = [
    { name: "Apple", image: "/apple.jpg", description: "Innovation at its finest" },
    { name: "LG", image: "/LG.jpg", description: "Life's Good" },
    { name: "Adidas", image: "/addis.webp", description: "Impossible is Nothing" },
    { name: "Zara", image: "/zara.jpg", description: "Fashion Forward" },
    { name: "Bose", image: "/bose.jpg", description: "Better Sound Through Research" },
    { name: "Canon", image: "/canon.jpg", description: "Delighting You Always" },
    { name: "Gucci", image: "/1-gucci-green-red.webp", description: "Quality is remembered" },
    { name: "Nike", image: "/nike.jpg", description: "Just Do It" },
    { name: "Samsung", image: "/samsung.jpg", description: "Do What You Can't" },
    { name: "HP", image: "/hp.jpg", description: "Keep Reinventing" },
    { name: "Sony", image: "/sony.jpg", description: "Be Moved" }
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
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full px-4 py-2"
        >
          <FaCrown className="text-yellow-400" />
          <span className="text-white/90 text-sm font-medium">Premium Brands</span>
        </motion.div>

        {/* Title */}
        <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-yellow-100 to-orange-100 bg-clip-text text-transparent">
          Top Brands Of The World
        </h2>

        {/* Subtitle */}
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Discover products from the world's most trusted and innovative brands
        </p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center space-x-8 text-sm"
        >
          <div className="flex items-center space-x-2 text-white/70">
            <FaAward className="text-yellow-400" />
            <span>11 Premium Brands</span>
          </div>
          <div className="flex items-center space-x-2 text-white/70">
            <FaStar className="text-yellow-400" />
            <span>Trusted Worldwide</span>
          </div>
        </motion.div>

        {/* Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mx-auto"
        />
      </motion.div>

      {/* Slider Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>

        {/* Custom Navigation Buttons */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
          <motion.button
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
            className="swiper-button-prev-custom w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 shadow-lg"
          >
            <FaChevronLeft className="text-lg" />
          </motion.button>
        </div>

        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
          <motion.button
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
            className="swiper-button-next-custom w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 shadow-lg"
          >
            <FaChevronRight className="text-lg" />
          </motion.button>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Virtual, Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          speed={3000}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
          }}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} custom-bullet"></span>`;
            },
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 5,
            },
          }}
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          className="brand-slider"
        >
          {brands.map((brand, index) => (
            <SwiperSlide key={index}>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Brand Image */}
                <div className="relative h-32 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Brand Name Overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-0 left-0 right-0 p-4 text-center"
                  >
                    <h3 className="text-white font-bold text-lg mb-1">{brand.name}</h3>
                    <p className="text-white/80 text-xs">{brand.description}</p>
                  </motion.div>

                  {/* Sparkle Effect */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <HiSparkles className="text-yellow-400 text-lg" />
                  </motion.div>
                </div>

                {/* Bottom Accent */}
                <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination Dots */}
        <style jsx>{`
          .brand-slider .swiper-pagination {
            bottom: -50px !important;
          }

          .brand-slider .custom-bullet {
            width: 12px !important;
            height: 12px !important;
            background: rgba(255, 255, 255, 0.3) !important;
            border-radius: 50% !important;
            transition: all 0.3s ease !important;
            margin: 0 6px !important;
          }

          .brand-slider .custom-bullet.swiper-pagination-bullet-active {
            background: linear-gradient(45deg, #3B82F6, #8B5CF6) !important;
            transform: scale(1.2) !important;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4) !important;
          }
        `}</style>
      </motion.div>

      {/* Brand Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="space-y-3"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <FaCrown className="text-2xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Premium</h3>
            <p className="text-white/70 text-sm">Only the finest brands make it to our platform</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="space-y-3"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <FaAward className="text-2xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Trusted</h3>
            <p className="text-white/70 text-sm">Brands trusted by millions worldwide</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="space-y-3"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <FaStar className="text-2xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Quality</h3>
            <p className="text-white/70 text-sm">Guaranteed quality and authenticity</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Slider;
