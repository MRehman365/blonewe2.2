"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaCross, FaRegHeart, FaStar } from "react-icons/fa";
import { MdOutlineZoomOutMap } from "react-icons/md";
import banner2 from "../assets/banner-16.jpg";
import ProductDetail from "../components/ProductDetail";
import { FaCropSimple, FaPlus } from "react-icons/fa6";
import { BsGrid, BsListUl } from "react-icons/bs";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { LuFilter } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/store/reducer/categoryReducer";
import { fetchFilteredProducts } from "@/store/reducer/productReducer";
import { toast } from "react-toast";
import { addToWishlist, getWishlist } from "@/store/reducer/wishlistReducer";
import { addToCart, getCart } from "@/store/reducer/cartReducer";
import Link from "next/link";

export default function ProductListing() {
  const { categories } = useSelector((state) => state.category);
  const { products, totalPages } = useSelector((state) => state.products); // Add totalPages to Redux state

     const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userid");
      setUserId(storedUserId);
    }
  }, []);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showInStock, setShowInStock] = useState(false);
  const [showOnSale, setShowOnSale] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [showOpen, setShowOpen] = useState(false);
  const [sortValue, setSortValue] = useState("latest");
  const [showValue, setShowValue] = useState("20 items");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [page, setPage] = useState(1); // Add page state

  const dispatch = useDispatch();

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categorydata = Array.isArray(categories) ? categories : categories.category || [];

  // Fetch filtered products when selectedCategories, sortValue, or page changes
  useEffect(() => {
    dispatch(fetchFilteredProducts({ categories: selectedCategories, sortBy: sortValue, page }));
  }, [selectedCategories, sortValue, page, dispatch]);

  // Handle category selection
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Handle sorting change
  const handleSortChange = (sortBy) => {
    setSortValue(sortBy);
    setPage(1); // Reset to first page when sorting changes
  };

  const productdata = Array.isArray(products) ? products : products?.menu || [];

  console.log(products, 'shopproducts');

  // Toggle category selection
  const toggleCategory = (category) => {
    const queryParams = {
      categories: selectedCategories.join(','), // Convert array to comma-separated string
      sortBy: sortValue.toLowerCase().replace(' ', ''), // Format sort value
    };
    dispatch(fetchFilteredProducts(queryParams));
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSortValue("Sort by latest");
    setPage(1); // Reset to first page when clearing filters
  };

  // Handle wishlist
  const handlewish = async (productId) => {
    await dispatch(addToWishlist({ userId, productId })).then((res) => {
      if (res?.payload?.success) {
        toast.success(res.payload.message);
      } else {
        toast.error(res.payload.message);
      }
    });
    dispatch(getWishlist(userId));
  };

  // Handle cart
  const handlecart = async (productId) => {
    await dispatch(addToCart({ userId, productId })).then((res) => {
      if (res?.payload?.success) {
        toast.success(res.payload.message);
      } else {
        toast.error(res.payload.message);
      }
    });
    dispatch(getCart(userId));
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="max-w-7xl mx-auto mt-4">
      {/* Banner */}
      <div className="mx-auto overflow-hidden rounded-md">
        <Image
          src={banner2}
          alt="banner"
          className="w-full h-[300px] md:h-[300px] object-cover rounded-md"
        />
      </div>

      {/* Filters and Sorting */}
      <div className="flex items-center justify-between py-4 px-2">
        <p className="text-sm text-gray-500 hidden md:block">
          Showing 1–20 of 67 results
        </p>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
            className="block md:hidden"
          >
            <LuFilter className="text-xl" />
          </button>
          <div className="flex items-center justify-between py-4 px-2">
            <div className="flex items-center gap-2">
              <span className="text-[12px] md:text-sm text-gray-500">Sort:</span>
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center justify-between w-[140px] px-3 py-1.5 text-[12px] md:text-sm border rounded-md"
                >
                  <span>{sortValue}</span>
                  <IoIosArrowDown className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
                </button>

                {sortOpen && (
                  <div className="absolute z-10 w-full mt-1 border rounded-md shadow-lg">
                    {["latest", "lowtohigh", "hightolow"].map((option) => (
                      <button
                        key={option}
                        className="w-full px-3 py-1.5 text-left text-[12px] md:text-sm"
                        onClick={() => {
                          handleSortChange(option);
                          setSortOpen(false);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="md:flex gap-1 ml-4 hidden">
            <button
              className={`p-1.5 text-gray-500 hover:bg-gray-100 rounded-md ${
                viewMode === "grid" ? "bg-gray-200" : ""
              }`}
              onClick={() => setViewMode("grid")}
            >
              <BsGrid className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </button>
            <button
              className={`p-1.5 text-gray-500 hover:bg-gray-100 rounded-md ${
                viewMode === "list" ? "bg-gray-200" : ""
              }`}
              onClick={() => setViewMode("list")}
            >
              <BsListUl className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-4 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div
          className={`w-64 fixed md:sticky min-h-[100vh] z-[99] top-0 ${
            isSidebarVisible ? "left-0" : "-left-[100%]"
          } bg-white md:bg-[#ffffff04] z-50 p-2 transition-all duration-300`}
        >
          <div className="space-y-6">
            {/* Categories */}
            <div className="flex justify-end md:hidden">
              <IoMdClose
                onClick={() => setIsSidebarVisible(!isSidebarVisible)}
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4">Product Categories</h2>
              <div className="space-y-2">
                {categorydata.map((category, index) => (
                  <label
                    key={index}
                    className="flex space-y-3 items-center justify-between"
                  >
                    <div className="space-x-2 text-sm text-gray-500">
                      <input
                        type="checkbox"
                        className="text-[#004798]"
                        checked={selectedCategories.includes(category.name)}
                        onChange={() => toggleCategory(category.name)}
                      />
                      <span>{category.name}</span>
                    </div>
                    <FaPlus className="text-sm text-gray-500" />
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Filters */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Product Status</h2>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={showInStock}
                    onChange={(e) => setShowInStock(e.target.checked)}
                  />
                  <span>In Stock</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={showOnSale}
                    onChange={(e) => setShowOnSale(e.target.checked)}
                  />
                  <span>On Sale</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-6 p-2">
            <button
              onClick={clearFilters}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Clear Filters
            </button>
            {selectedCategories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 bg-[#004798] text-white rounded-full"
              >
                {category}
                <button
                  onClick={() => toggleCategory(category)}
                  className="ml-2 text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <div
            className={`grid gap-1 p-2 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
            {productdata?.map((item, i) => (
              <div key={i} className="h-full">
                <div className={`${viewMode === "grid" ? "group relative overflow-hidden w-full transition-all duration-300 h-[376px] flex flex-col border border-gray-200 mx-auto " : "group relative overflow-hidden w-full transition-all duration-300 h-[200px] flex border border-gray-200 mx-auto"}`}>
                  <div className="relative aspect-square">
                    <Link href={`/product/${item._id}`} className="overflow-hidden">
                      <Image
                        src={item?.image[0]}
                        alt={item?.name}
                        loading="lazy"
                        fill
                        className={`${viewMode === "grid" ? "object-contain  h-[400px] w-auto overflow-hidden transition-transform duration-300 group-hover:scale-105" : "object-cover h-[200px] w-auto overflow-hidden transition-transform duration-300 group-hover:scale-105"}`}
                      />
                    </Link>
                    {item?.discount > 0 && (
                      <div className="absolute left-2 bottom-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {item?.discount}%
                      </div>
                    )}
                    <div
                      className={`absolute right-2 top-2 flex-col gap-2 transition-opacity duration-300 hidden group-hover:flex`}
                    >
                      {/* <button
                        className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                      >
                        <MdOutlineZoomOutMap className="h-4 w-4 text-gray-600" />
                      </button> */}
                      <button
                        onClick={() => handlewish(item._id)}
                        className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                      >
                        <FaRegHeart className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    <div className="flex gap-2 items-center">
                      <div className="text-sm text-gray-500 line-through">
                        ₹{item?.price.toFixed(2)}
                      </div>
                      <div className="text-lg font-bold bg-green-600 px-1 text-white rounded-md">
                        ₹{(item?.price * (1 - item.discount / 100)).toFixed(2)}
                      </div>
                    </div>

                    <h3 className="mb-2 text-sm font-medium line-clamp-2">
                      {item?.name.slice(0, 25)}...
                    </h3>
                    <div className="h-[25px] overflow-hidden relative">
                      <div className="absolute flex flex-col gap-2 bottom-0 group-hover:-bottom-7 transform transition-all duration-500">
                        <div className="text-[12px]">
                          <span className="text-gray-400">Store:</span> {item.store}
                        </div>
                        <div className="mb-2 flex items-center gap-2">
                          <div className="flex items-center">
                            <FaStar className="text-yellow-300" />
                          </div>
                          <div className="text-sm text-gray-500">
                            4.5 (14 reviews)
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <button
                        onClick={() => handlecart(item._id)}
                        className="px-3 py-2 w-full bg-[#004798] text-white text-sm font-medium rounded-md hover:bg-[#004798]/80 flex items-center justify-center"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup for Product Detail */}
      {isPopupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-4xl rounded-lg shadow-lg">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={handleClosePopup}
            >
              <span className="text-2xl md:text-4xl font-bold">&times;</span>
            </button>
            <ProductDetail />
          </div>
        </div>
      )}
    </div>
  );
}