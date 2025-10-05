import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ProductsCard from "./ProductsCard";
import useProductCount from "../../hooks/useProductCount";
import { MdOutlineMenuOpen } from "react-icons/md";
import useUser from "../../hooks/useUser";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingPro from "./LoadingPro";

const Products = () => {
  const location = useLocation();
  const cateGory = location?.state?.category || null;
  const cateGorySta = location?.state?.statUs || false;
  const [userDB] = useUser();
  const axiosPublic = useAxiosPublic();
  const productsCount = useProductCount();
  const [counts, setCounts] = useState(productsCount);
  const [products, setProducts] = useState([]);
  const [selectedValue, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [itemPerPage, setItemPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [productCategory, setProductCategory] = useState(null);
  const [brandName, setBrandName] = useState(null);
  const [sorts, setSorts] = useState(false);
  const [categorys, setCategory] = useState(false);
  const [search, setSearch] = useState(null);
  const [sea, setSea] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    async function fetchDatas() {
      const cou = await axiosPublic.get("/productsCount");
      setCounts(cou.data.count);
      setLoading(false);
    }
    fetchDatas();
  }, []);

  const handelPerPage = (e) => {
    setItemPerPage(e.target.value);
    setCurrentPage(0);
  };

  const handelPreviousBtn = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handelNextBtn = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const numberOfPage = Math.ceil(counts / itemPerPage);
  const pages = [...Array(numberOfPage).keys()];

  const handelSort = (e) => {
    setSelected(e.target.value);
    setCategory(false);
    setSea(false);
    setSorts(true);
  };

  const handelSearchBtn = async (e) => {
    e.preventDefault();
    const searchss = e.target.search.value;
    setCategory(false);
    setSorts(false);
    setSea(true);
    setSearch(searchss);
  };

  const handelCategorization = async (e) => {
    e.preventDefault();
    const form = e.target;
    setMaxPrice(form.maxPrice.value);
    setMinPrice(form.minPrice.value);
    setProductCategory(form.productCategory.value);
    setBrandName(form.brandName.value);
    setSorts(false);
    setSea(false);
    setCategory(true);
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    async function fetchDatas() {
      const ress = await axiosPublic.get(
        `/productsPage?page=${currentPage}&&size=${itemPerPage}&&sorting=${selectedValue}&&minPrice=${minPrice}&maxPrice=${maxPrice}&brandName=${brandName}&productCategory=${productCategory}&&type=${sorts}&&ca=${categorys}&&cas=${cateGory}&&casT=${cateGorySta}&&searchs=${search}&&sea=${sea}`
      );
      setProducts(ress.data.result);
      setCounts(ress.data.result2.length);
    }
    fetchDatas();
  }, [
    currentPage,
    itemPerPage,
    selectedValue,
    productCategory,
    minPrice,
    maxPrice,
    brandName,
    search,
    cateGory
  ]);

  const brand = [
    "Breville", "Ninja Kitchen", "Vita-Mix Corporation", "Unilever", "CeraVe",
    "Adidas", "Nike", "Sony", "Apple", "Samsung", "Pilot", "Moleskine", "La Mer",
  ];

  const category = [
    "Electronics", "Fashion", "Home and Kitchen", "Health and Beauty", "Books and Stationery",
  ];

  if(loading){
    return <LoadingPro/>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900">

      {/* Header Section */}
      <div className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">

            {/* Search Section */}
            <div className="flex-1 max-w-md">
              <form onSubmit={handelSearchBtn} className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-20 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all transform hover:scale-105">
                  Search
                </button>
              </form>
            </div>

            {/* Sort & Filter Section */}
            <div className="flex items-center gap-4">
              <select
                onChange={handelSort}
                className="bg-white/10 select backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 min-w-[160px]"
              >
                <option disabled selected className="text-gray-800">Sort By</option>
                <option value={"desc"} className="text-gray-800">High to Low</option>
                <option value={"asc"} className="text-gray-800">Low to High</option>
                <option value={"recently"} className="text-gray-800">Newest first</option>
              </select>

              <button
                onClick={toggleSidebar}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-3 rounded-xl transition-all transform hover:scale-105 shadow-lg"
              >
                <MdOutlineMenuOpen className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Filter Panel */}
      <div className={`fixed top-0 left-0 h-full w-80 z-50 backdrop-blur-xl bg-white/10 dark:bg-black/30 border-r border-white/20 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out overflow-y-auto`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Filters</h2>
            <button onClick={toggleSidebar} className="text-white hover:text-purple-400 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handelCategorization} className="space-y-6">
            {/* Brand Filter */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Brand Name</h3>
              <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                {brand.map((b, index) => (
                  <label key={index} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white cursor-pointer">
                    <input type="radio" value={b} name="brandName" className="text-purple-500 focus:ring-purple-400" />
                    <span>{b}</span>
                  </label>
                ))}
                <label className="flex items-center gap-2 text-sm text-gray-300 hover:text-white cursor-pointer">
                  <input type="radio" value="" name="brandName" className="text-purple-500 focus:ring-purple-400" />
                  <span>None</span>
                </label>
              </div>
            </div>

            {/* Category Filter */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Product Category</h3>
              <div className="space-y-2">
                {category.map((c, index) => (
                  <label key={index} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white cursor-pointer">
                    <input type="radio" name="productCategory" value={c} className="text-purple-500 focus:ring-purple-400" />
                    <span>{c}</span>
                  </label>
                ))}
                <label className="flex items-center gap-2 text-sm text-gray-300 hover:text-white cursor-pointer">
                  <input type="radio" value="" name="productCategory" className="text-purple-500 focus:ring-purple-400" />
                  <span>None</span>
                </label>
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Price Range</h3>
              <div className="flex flex-col gap-3">
                <input
                  placeholder="Min price"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  name="minPrice"
                  type="number"
                />
                <input
                  placeholder="Max price"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  name="maxPrice"
                  type="number"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Apply Filters
            </button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {products.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductsCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No Products Found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}

        {/* Pagination */}
        {products.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <div className="flex items-center gap-2">
              <button
                onClick={handelPreviousBtn}
                disabled={currentPage === 0}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </button>

              <div className="flex gap-1">
                {pages.map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all ${
                      currentPage === p
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    {p + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={handelNextBtn}
                disabled={currentPage === pages.length - 1}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next
              </button>
            </div>

            <select
              onChange={handelPerPage}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="6" className="text-gray-800">6 per page</option>
              <option value="12" selected className="text-gray-800">12 per page</option>
              <option value="24" className="text-gray-800">24 per page</option>
              <option value="36" className="text-gray-800">36 per page</option>
              <option value="48" className="text-gray-800">48 per page</option>
            </select>
          </div>
        )}
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Products;
