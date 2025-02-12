"use client";

import React, { useState, useEffect } from "react";
import {
  BsBoxSeam,
  BsChevronDown,
  BsHeart,
  BsMailbox,
  BsPhone,
} from "react-icons/bs";
import {
  IoCarSportOutline,
  IoStorefrontOutline,
  IoSunnyOutline,
} from "react-icons/io5";
import { BsMoon } from "react-icons/bs";
import { useTheme } from "../layout";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/logo-marketplace-light.png";
import logo2 from "../assets/logo-marketplace-light.webp";
import { FaRegCircleUser, FaRegHeart, FaScaleBalanced } from "react-icons/fa6";
import { TbArmchair, TbMoodKid } from "react-icons/tb";
import { ImMobile2 } from "react-icons/im";
import { PiDress } from "react-icons/pi";
import { CiDiscount1, CiShop, CiUser } from "react-icons/ci";
import { MdMenu, MdOutlineMenu, MdOutlineSportsTennis } from "react-icons/md";
import { GiCrystalEarrings, GiLipstick } from "react-icons/gi";
import {
  FiChevronDown,
  FiMessageSquare,
  FiShoppingBag,
  FiX,
} from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import DiscountedProduct from "./DiscountedProduct";
import ProductDetail from "./ProductDetail";

import img1 from "../assets/image-1-1-1-450x450.png";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "@/store/reducer/authReducer";
import { getWishlist } from "@/store/reducer/wishlistReducer";
import { getCart } from "@/store/reducer/cartReducer";
import { searchProducts } from "@/store/reducer/productReducer";
import { fetchCategories } from "@/store/reducer/categoryReducer";



const Navbar = () => {
const { singleuser } = useSelector((state) => state.auth)
const { wishlistproduct } = useSelector((state) => state.wishlist);
const { categories } = useSelector((state) => state.category);
const { cartlist } = useSelector((state) => state.cart)
const { filteredProducts, loading, error } = useSelector((state) => state.products);
const [query, setQuery] = useState("");

// Handle search input changes
const handleSearch = (e) => {
  const value = e.target.value;
  setQuery(value);

  if (value) {
    // Dispatch the searchProducts action with the query
    dispatch(searchProducts(value));
  } else {
    // Clear results if the query is empty
    dispatch({ type: "products/clearFilteredProducts" }); // Clear filtered products
  }
};


  const initialTime = 1 * 24 * 60 * 60 + 14 * 60 * 60 + 20 * 60 + 10;
  const [isOpen, setIsOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [openNavbar, setOpenNav] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();

  const [shopOpen, setShopOpen] = useState(false);
  const toggleShop = () => setShopOpen(!shopOpen);

  const id = localStorage.getItem('userid');
  const userId = localStorage.getItem('userid');
  

  useEffect(() => {
dispatch(getUserById(id))
  },[dispatch])

  // console.log('user', singleuser)

  useEffect(() => {
    
    dispatch(getWishlist(userId));
  },[dispatch, wishlistproduct?.length])
  const wish = Array.isArray(wishlistproduct) ? wishlistproduct : wishlistproduct?.wishlist || [];

  useEffect(() => {
    
    dispatch(getCart(userId))
  },[dispatch, cartlist?.length])
  
  const cartno = Array.isArray(cartlist) ? cartlist : cartlist?.cart || [];


  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(timeRemaining / (24 * 60 * 60));
  const hours = Math.floor((timeRemaining % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeRemaining % (60 * 60)) / 60);
  const seconds = timeRemaining % 60;

  const handleOpenPopup = () => setIsPopupVisible(true);
  const handleClosePopup = () => setIsPopupVisible(false);

  useEffect(() => {
    dispatch(fetchCategories()) 
  },[dispatch])

  const categorydata = Array.isArray(categories) ? categories : categories?.category || [];



  return (
    <div className="">
      <div className="bg-[#004798] hidden md:block">
        <p className="text-center p-2 text-[15px] text-white hidden md:block">
          <span className="font-[600]">FREE delivery & 40% Discount</span> for
          next 3 orders! Place your 1st order in.
          <span className="bg-[#4075b2] px-2 py-1 text-base rounded-md ml-4">
            {days} <span className="text-gray-400 text-[12px]">d</span>
          </span>
          <span className="bg-[#4075b2] px-2 py-1 text-base rounded-md ml-1">
            {hours} <span className="text-gray-400 text-[12px]">h</span>
          </span>
          <span className="bg-[#4075b2] px-2 py-1 text-base rounded-md ml-1">
            {minutes} <span className="text-gray-400 text-[12px]">m</span>
          </span>
          <span className="ml-1 text-gray-400">:</span>
          <span className="bg-[#4075b2] px-2 py-1 text-base rounded-md ml-1">
            {seconds} <span className="text-gray-400 text-[12px]">s</span>
          </span>
        </p>
        <div className="border-b border-[#ffffff4b] px-2">
          <div className="hidden md:flex justify-between w-full text-white py-2  max-w-7xl mx-auto">
            <div className="text-sm flex gap-4 items-center">
              <Link href="/tracking" className="flex items-center gap-1">
                <span>
                  <BsBoxSeam />
                </span>
                Track Record
              </Link>
              <Link href="/about">About us</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/myaccount">Vendor Dashboard</Link>
            </div>
            <div className="text-sm flex gap-4 items-center">
              <p>English</p>
              <p>INR</p>
              <button
                onClick={toggleTheme} // Toggle the theme on button click
                className="flex items-center gap-1 p-2 bg-[#4075b2] rounded-md text-white"
              >
                {theme === "light" ? (
                  <IoSunnyOutline className="text-xl" /> // Light theme icon
                ) : (
                  <BsMoon className="text-xl" /> // Dark theme icon
                )}
                {theme === "light" ? "Light Theme" : "Dark Theme"}
              </button>
            </div>
          </div>
        </div>
        <div className="bg-primary text-white p-4 max-w-7xl mx-auto sticky top-0">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 mb-4 md:mb-0">
              <Image
                src={logo}
                alt="Blonwe Logo "
                className="max-w-[200px] h-auto"
              />
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-4xl mx-0 md:mx-8 w-full mb-4 md:mb-0 relative">
          <div className="relative">
            <input
              type="search"
              placeholder="Search for products..."
              className="w-full bg-white text-black focus:ring-1 focus:ring-primary outline-none pl-4 pr-10 py-2 rounded-md"
              value={query}
              onChange={handleSearch}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Search Results */}
          {query && (
            <div
              className="absolute w-full mt-2 bg-white text-black rounded-md shadow-lg z-[9999] max-h-[500px] overflow-y-auto"
              style={{
                backgroundColor: theme === "light" ? "#fff" : "#1a202c",
                color: theme === "light" ? "#000" : "#fff",
              }}
            >
              {loading ? (
                <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
              ) : error ? (
                <div className="px-4 py-2 text-sm text-red-500">{error}</div>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Link
                    key={product._id}
                    href={`/product/${product._id}`}
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {product.name}
                  </Link>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-gray-500">No results found.</div>
              )}
            </div>
          )}
        </div>


            {/* Account Actions */}
            <div className="flex items-center space-x-6">
              <Link
             href={id ? "/myaccount" : "/authentication"}
                className="flex flex-col items-center"
              >
                <FaRegCircleUser className="h-6 w-6 mb-1" />
                <span className="text-[13px]">My Account</span>
              </Link>
              <Link
                href="/wishlist"
                className="flex flex-col items-center relative"
              >
                <FaRegHeart className="h-6 w-6 mb-1" />
                <span className="text-[13px]">Wishlist</span>
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                 {wish.length}
                </span>
              </Link>
              <Link
                href="/mycart"
                className="flex flex-col items-center relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="text-[13px]">My Cart</span>
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartno.length}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="border-b bg-bgInput hidden md:block">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between py-4">
            <div className="flex flex-wrap items-center space-x-4 md:space-x-8">
              {/*  */}
              <div className="w-[330px] relative hidden md:block ">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center -z-[1] justify-between text-gray-500 w-full px-4 py-2 text-left  border border-gray-300 rounded-t-[8px] focus:outline-none focus:ring-none "
                  aria-expanded={isOpen}
                >
                  <MdOutlineMenu className="h-5 w-5 transition-transform duration-200" />
                  <span className="font-medium ">Browse Categories</span>
                  <BsChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`absolute top-[50px] w-full z-50  rounded-b-[8px] bg-blur-[10px] left-0  border border-gray-300 overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen
                      ? "opacity-100 translate-y-0 visible"
                      : "opacity-0 -translate-y-2 invisible"
                  }`}
                  style={{
                    backgroundColor:
                      theme === "light"
                        ? "rgba(255, 255, 255, 1)"
                        : "rgba(26, 32, 44, 1)",
                    color: theme === "light" ? "#000" : "#fff",
                  }}
                >
                  <nav className="py-2  relative text-gray-500">
                    {categorydata?.slice(0, 7).map((category, index) => (
                      <Link
                        key={index}
                        href={`/shop/${category.name}`}
                        className="flex items-center gap-3 group px-4 py-2 hover:bg-[#004798] hover:text-white transition-colors text-[14px]"
                      >
                        {/* <span className="text-primary group-hover:text-white">
                          {category.icon}
                        </span> */}
                        <span>{category.name}</span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
              {/*  */}
              <Link href="/" className="text-gray-500 hover:text-[#003B95]">
                Home
              </Link>

              <div className=" group">
                <Link
                  href="/shop"
                  className="flex items-center gap-1 text-gray-500 hover:text-[#003B95]"
                >
               <span><CiShop size={20} /></span>   Shop
                </Link>
              </div>

              <Link
                        href={`/shop/${categorydata[0]?.name}`}
                className="flex items-center text-gray-500 hover:text-[#003B95]"
              >
                <span className="mr-2">
                  {/* <TbArmchair /> */}
                </span>{" "}
                {categorydata[0]?.name}
              </Link>

              <Link
                        href={`/shop/${categorydata[1]?.name}`}
                className="flex items-center text-gray-500 hover:text-[#003B95]"
              >
                <span className="mr-2">
                  {/* <ImMobile2 /> */}
                </span>{" "}
                {categorydata[1]?.name}
              </Link>

              <Link
                        href={`/shop/${categorydata[2]?.name}`}
                className="flex items-center text-gray-500 hover:text-[#003B95]"
              >
                <span className="mr-2">
                  {/* <PiDress /> */}
                </span>{" "}
                {categorydata[2]?.name}
              </Link>

              <a href="/blog" className="text-gray-500 hover:text-[#003B95]">
                Blog
              </a>

              <div className=" group">
                <a
                  href="#"
                  className="flex items-center text-gray-500 hover:text-[#003B95]"
                >
                  <span className="mr-2">
                    <CiDiscount1 />
                  </span>{" "}
                  Best Discounts
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </a>
                <div
                  className="absolute z-10 hidden group-hover:block rounded-md py-2 w-full left-0"
                  style={{
                    backgroundColor:
                      theme === "light"
                        ? "rgba(255, 255, 255, 1)"
                        : "rgba(26, 32, 44, 1)",
                    color: theme === "light" ? "#000" : "#fff",
                  }}
                >
                  <DiscountedProduct handleview={handleOpenPopup} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View Navbar */}
      <div>
        <div className="flex justify-between items-center text-white p-2 px-4 md:hidden bg-primary fixed top-0 w-full z-[99]">
          <div>
            <MdOutlineMenu
              className="h-6 w-6 transition-all"
              onClick={() => setOpenNav(!openNavbar)}
            />
          </div>
          <Link href="/" className="flex items-center space-x-2 mb-4 md:mb-0">
            <Image src={logo} alt="Blonwe Logo" className="w-[100px] h-auto" />
          </Link>
          <Link href="/mycart" className="flex flex-col items-center relative">
            <FiShoppingBag className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartno.length}
            </span>
          </Link>
        </div>

        <div
         style={{
        backgroundColor: theme === "light" ? "rgba(255, 255, 255, 1)" : "rgba(26, 32, 44, 1)",
        color: theme === "light" ? "#000" : "#fff",
      }}
          className={`w-[80%] fixed h-[100vh] overflow-y-auto  top-0 z-[100] transform ${
            openNavbar ? "translate-x-[0%]" : "-translate-x-[100%]"
          }  z-50 p-2 transition-transform duration-300 ease-in-out`}
        >
          <div className="overflow-auto">
            <div className="flex justify-between items-start h-[50px] px-2">
              <Link
                href="/"
                className="flex items-center space-x-2 mb-4 md:mb-0 filter brightness-50"
              >
                <Image
                  src={logo2}
                  alt="Blonwe Logo"
                  className="w-auto h-[33px]"
                />
              </Link>
              <div>
                <IoMdClose
                  onClick={() => setOpenNav(!openNavbar)}
                  className="text-2xl text-gray-500"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="border-b p-4">
                <div className="text-sm font-semibold text-gray-500">
                  MAIN MENU
                </div>
                <nav className="mt-2 flex flex-col space-y-2">
                  <Link href="/" className="text-[15px]">
                    Home
                  </Link>
                  <Link href="/shop" className="text-[15px]">
                    Shop
                  </Link>
                  {[
                    {
                      id: "electronics",
                      name: "Electronics",
                      icon: <ImMobile2 className="h-5 w-5" />,
                    },
                    {
                      id: "fashion",
                      name: "Fashion",
                      icon: <PiDress className="h-5 w-5" />,
                    },
                    {
                      id: "furniture",
                      name: "Furniture",
                      icon: <TbArmchair className="h-5 w-5" />,
                    },
                  ].map((menu, index) => (
                    <Link
                      key={index}
                      href="/shop"
                      className="flex items-center gap-3 py-2 hover:bg-[#004798] hover:text-white transition-colors text-[14px]"
                    >
                      <span className="text-gray-500">{menu.icon}</span>
                      <span>{menu.name}</span>
                    </Link>
                  ))}
                  <Link href="/blog" className="text-[15px]">
                    Blog
                  </Link>
                </nav>
              </div>
              <div className="p-4">
                <div className="text-xs font-semibold text-gray-500">
                  BROWSE CATEGORIES
                </div>
                <nav className="py-2  relative text-gray-500">
                  {categorydata?.map((category, index) => (
                    <Link
                      key={index}
                      href={`/shop/${category.name}`}
                      className="flex items-center gap-3 py-2 hover:bg-[#004798] hover:text-white transition-colors text-[14px]"
                    >
                      {/* <span className="text-primary">{category.icon}</span> */}
                      <span>{category.name}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Shopper Helps */}
              <div className="p-4">
                <h2 className="text-[15px] font-semibold text-muted-foreground mb-3 text-gray-500">
                  SHOPPER HELPS
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/wishlist"
                      className="text-sm hover:text-primary flex items-center gap-2 py-1"
                    >
                      <BsHeart className="w-4 h-4" />
                      Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/myaccount"
                      className="text-sm hover:text-primary flex items-center gap-2 py-1"
                    >
                      <CiUser className="w-4 h-4" />
                      My Account
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-sm hover:text-primary flex items-center gap-2 py-1"
                    >
                      <FiMessageSquare className="w-4 h-4" />
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Details */}
              <div className="p-4">
                <h2 className="text-[15px] font-semibold text-gray-500 mb-3">
                  CONTACT DETAILS
                </h2>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2 text-[15px]">
                      <BsPhone className="w-5 h-5" />
                      <a
                        href="tel:555-555-5555"
                        className="hover:text-primary font-semibold"
                      >
                        555-555-5555
                      </a>
                    </div>
                    <div className="text-[10px] text-gray-500">
                      You can call anytime from 9 am to 6 pm.
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[15px]">
                      <BsMailbox className="w-5 h-5" />
                      <a
                        href="mailto:example@example.com"
                        className="hover:text-primary font-semibold"
                      >
                        example@example.com
                      </a>
                    </div>
                    <div className="text-[10px] text-gray-500">
                      We will quickly answer you in the short time.
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-sm text-gray-500 pt-4 border-t">
                <p>
                  Copyright ©2024{" "}
                  <Link href="/" className="hover:text-primary text-gray-500">
                    iHome WordPress Theme
                  </Link>
                  . All right reserved. Powered by{" "}
                  <Link href="/" className="hover:text-primary text-gray-500">
                    iUTheme
                  </Link>
                  .
                </p>
              </div>
            </div>
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
};

export default Navbar;
