"use client";

import Image from "next/image";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaCross, FaRegHeart, FaStar } from "react-icons/fa";
import { MdOutlineZoomOutMap } from "react-icons/md";
import prodcut1 from "../assets/image-1-1-1-450x450.png";
import prodcut2 from "../assets/image-1-10-450x450.png";
import prodcut3 from "../assets/image-1-11-450x450.png";
import prodcut4 from "../assets/image-1-13-450x450.png";
import prodcut5 from "../assets/image-1-14-450x450.png";
import prodcut6 from "../assets/image-1-15-450x450.png";
import prodcut7 from "../assets/image-1-16-450x450.png";
import prodcut8 from "../assets/image-1-17-450x450.png";
import prodcut9 from "../assets/image-1-7-450x450.png";
import prodcut10 from "../assets/image-1-17-450x450.png";
import banner2 from "../assets/banner-16.jpg";
import ProductDetail from "../components/ProductDetail";
import { FaCropSimple, FaPlus } from "react-icons/fa6";
import { BsGrid, BsListUl } from "react-icons/bs";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { LuFilter } from "react-icons/lu";

const products = [
  {
    id: "1",
    name: "Huawei Watch GT 2 Pro Titanium 47mm",
    price: 79,
    originalPrice: 99,
    discount: 21,
    rating: 4.33,
    reviews: 3,
    image: prodcut1,
    store: "graci",
  },
  {
    id: "2",
    name: "HomePod mini — Space Gray",
    price: 249,
    originalPrice: 359,
    discount: 31,
    rating: 4.33,
    reviews: 3,
    image: prodcut2,
  },
  {
    id: "3",
    name: "ELECTROLUX EW6S226SUI",
    price: 190.0,
    originalPrice: 250.0,
    discount: 24,
    rating: 3.33,
    reviews: 3,
    image: prodcut3,
  },
  {
    id: "4",
    name: "ecobee 3 Lite Smart Thermostat 2.0, No Hub Required",
    price: 130.0,
    originalPrice: 142.0,
    discount: 9,
    rating: 3.67,
    reviews: 3,
    image: prodcut4,
  },
  {
    id: "5",
    name: "Canon EOS R10 RF-S 18-45 IS STM",
    price: 850.0,
    originalPrice: 1099.0,
    discount: 23,
    rating: 4.0,
    reviews: 3,
    image: prodcut5,
  },
  {
    id: "6",
    name: "Huawei Watch GT 2 Pro Titanium 47mm",
    price: 79,
    originalPrice: 99,
    discount: 21,
    rating: 4.33,
    reviews: 3,
    image: prodcut6,
  },
  {
    id: "7",
    name: "HomePod mini — Space Gray",
    price: 249,
    originalPrice: 359,
    discount: 31,
    rating: 4.33,
    reviews: 3,
    image: prodcut7,
  },
  {
    id: "8",
    name: "ELECTROLUX EW6S226SUI",
    price: 190.0,
    originalPrice: 250.0,
    discount: 24,
    rating: 3.33,
    reviews: 3,
    image: prodcut8,
  },
  {
    id: "9",
    name: "ecobee 3 Lite Smart Thermostat 2.0, No Hub Required",
    price: 130.0,
    originalPrice: 142.0,
    discount: 9,
    rating: 3.67,
    reviews: 3,
    image: prodcut9,
  },
  {
    id: "10",
    name: "Canon EOS R10 RF-S 18-45 IS STM",
    price: 850.0,
    originalPrice: 1099.0,
    discount: 23,
    rating: 4.0,
    reviews: 3,
    image: prodcut10,
  },
];

const categories = [
  "Auto Parts",
  "Cosmetic",
  "Electronics",
  "Fashion",
  "Furniture",
  "Grocery",
  "Jewellery",
  "Kids",
  "Sports",
];

export default function ProductListing() {
  const [selectedCategories, setSelectedCategories] = useState(["Fashion"]);
  const [priceRange, setPriceRange] = useState([20, 80]);
  const [wishlist, setWishlist] = useState([]);
  const [showInStock, setShowInStock] = useState(false);
  const [showOnSale, setShowOnSale] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [showOpen, setShowOpen] = useState(false);
  const [sortValue, setSortValue] = useState("Sort by latest");
  const [showValue, setShowValue] = useState("20 items");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const handleOpenPopup = () => setIsPopupVisible(true);
  const handleClosePopup = () => setIsPopupVisible(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([20, 80]);
    setShowInStock(false);
    setShowOnSale(false);
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const calculateSliderPosition = (value) => ((value - 20) / (80 - 20)) * 100;

  const filteredProducts = products.filter((product) => {
    if (showInStock && !product.inStock) return false;
    if (showOnSale && product.discount === 0) return false;
    if (selectedCategories.length && !selectedCategories.includes("Fashion"))
      return false;
    return product.price >= priceRange[0] && product.price <= priceRange[1];
  });

  return (
    <div className="max-w-7xl mx-auto mt-4">
      <div className=" mx-auto overflow-hidden rounded-md">
        <Image
          src={banner2}
          alt="banner"
          className="w-full h-[300px] md:h-[300px] object-cover rounded-md"
        />
      </div>
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
          <div className="flex items-center gap-2">
            <span className="text-[12px] md:text-sm text-gray-500">Sort:</span>
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center justify-between w-[140px] px-3 py-1.5 text-[12px] md:text-sm border rounded-md  "
              >
                <span>{sortValue}</span>
                <IoIosArrowDown
                  className={`transition-transform ${
                    sortOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {sortOpen && (
                <div className="absolute z-10 w-full mt-1  border rounded-md shadow-lg">
                  {[
                    "By latest",
                    " Low to High",
                    " High to Low",
                    "By popularity",
                  ].map((option) => (
                    <button
                      key={option}
                      className="w-full px-3 py-1.5 text-left text-[12px] md:text-sm "
                      onClick={() => {
                        setSortValue(option);
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

          <div className="flex items-center gap-2">
            <span className="text-[12px] md:text-sm text-gray-500">Show:</span>
            <div className="relative">
              <button
                onClick={() => setShowOpen(!showOpen)}
                className="flex items-center justify-between w-[100px] px-3 py-1.5 text-[12px] md:text-sm border rounded-md  "
              >
                <span>{showValue}</span>
                <IoIosArrowDown
                  className={`transition-transform ${
                    showOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showOpen && (
                <div className="absolute z-10 w-full mt-1  border rounded-md shadow-lg">
                  {["12 items", "20 items", "30 items"].map((option) => (
                    <button
                      key={option}
                      className="w-full px-3 py-1.5 text-left text-sm "
                      onClick={() => {
                        setShowValue(option);
                        setShowOpen(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
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
      <div className=" py-4 flex flex-col md:flex-row gap-8 ">
        {/* Sidebar */}
        <div
          className={`w-64 fixed md:sticky min-h-[100vh] top-0 ${
            isSidebarVisible ? "left-0" : "-left-[100%]"
          } bg-white md:bg-[#ffffff04]  z-50 p-2 transition-all duration-300`}
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
                {categories.map((category) => (
                  <label
                    key={category}
                    className="flex space-y-3 items-center justify-between "
                  >
                    <div className="space-x-2  text-sm text-gray-500">
                      <input
                        type="checkbox"
                        className="text-[#004798]"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                      />
                      <span>{category}</span>
                    </div>
                    <FaPlus className="text-sm text-gray-500" />
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Filter by Price</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([+e.target.value, priceRange[1]])
                    }
                    className="w-20 p-2 border rounded bg-[#ffffff0c]"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], +e.target.value])
                    }
                    className="w-20 p-2 border rounded bg-[#ffffff0c]"
                  />
                </div>
                <div className="relative w-full h-2  rounded-full">
                  <div
                    className="absolute h-full bg-[#004798] rounded-full"
                    style={{
                      left: `${calculateSliderPosition(priceRange[0])}%`,
                      right: `${100 - calculateSliderPosition(priceRange[1])}%`,
                    }}
                  ></div>
                  <input
                    type="range"
                    min={20}
                    max={80}
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([+e.target.value, priceRange[1]])
                    }
                    className="absolute w-full h-2 appearance-none bg-transparent pointer-events-auto cursor-pointer"
                  />
                  <input
                    type="range"
                    min={20}
                    max={80}
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], +e.target.value])
                    }
                    className="absolute w-full h-2 appearance-none bg-transparent pointer-events-auto cursor-pointer"
                  />
                </div>
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
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className={`group relative overflow-hidden w-full border border-gray-300 flex ${
              viewMode === "grid" ? "flex-col" : "flex-row h-[200px]"
            }`}
          >
            {/* Product Image */}
            <div
              className={`relative ${
                viewMode === "grid" ? "aspect-square" : "w-1/2"
              }`}
              onMouseEnter={(e) => e.currentTarget.classList.add("hovered")}
              onMouseLeave={(e) =>
                e.currentTarget.classList.remove("hovered")
              }
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className={`${
                  viewMode === "grid" ? "object-cover" : "object-contain"
                }  transition-transform duration-300 group-hover:scale-105`}
              />
              {product.discount > 0 && (
                <div className="absolute left-2 bottom-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {product.discount}%
                </div>
              )}
              <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100">
                    <button
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                      onClick={() => console.log("Popup opened")}
                    >
                      <MdOutlineZoomOutMap className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                      <FaRegHeart className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
            </div>

            {/* Product Details */}
            <div className={`p-4 flex-grow flex flex-col`}>
              <div className="flex gap-2 items-center">
                <div className="text-sm text-gray-500 line-through">
                  ₹{product.price.toFixed(2)}
                </div>
                <div className=" text-lg font-bold bg-green-600 px-1 text-white rounded-md">
                  ₹{product.originalPrice.toFixed(2)}
                </div>
              </div>
              <h3 className="text-sm font-medium mt-2 line-clamp-2">
                {product.name}
              </h3>
              <div
                className={`${
                  viewMode === "grid" ? "h-[25px]" : "mt-2 h-[25px]"
                } overflow-hidden relative`}
              >
                <div
                  className={`absolute flex flex-col gap-2 bottom-0 group-hover:-bottom-7 transform transition-all duration-500`}
                >
                  <div className="text-[12px]">
                    <span className="text-gray-400">Store:</span> Groci
                  </div>
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex items-center">
                      <FaStar className="text-yellow-300" />
                    </div>
                    <div className="text-sm text-gray-500">
                      {product.rating} ({product.reviews} reviews)
                    </div>
                  </div>
                </div>
              </div>
              <button className="mt-auto px-3 py-2 bg-[#004798] text-white text-sm font-medium rounded-md hover:bg-[#004798]/80">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-4 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-2 border rounded-md ${
                  currentPage === index + 1
                    ? "bg-[#004798] text-white"
                    : "hover:bg-gray-50"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {isPopupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-4xl rounded-lg shadow-lg">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={handleClosePopup}
            >
              <span className="text-2xl md:text-4xl font-bold">&times;</span>
            </button>

            {/* Product Detail Component */}
            <ProductDetail />
          </div>
        </div>
      )}
    </div>
  );
}
