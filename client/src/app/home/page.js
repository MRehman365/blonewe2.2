"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img1 from "../assets/slider-04.jpg";
import img2 from "../assets/slider-05.jpg";
import img3 from "../assets/slider-06.jpg";
import dis1 from "../assets/banner-05.jpg";
import dis2 from "../assets/banner-06.webp";
import dis3 from "../assets/banner-07.webp";
import banner1 from "../assets/banner-04.jpg";
import banner2 from "../assets/apple-watch.png";
import FeauredProduct from "../components/Feaured-Product";
import ProductDetail from "../components/ProductDetail";
import LatestProduct from "../components/LatestProduct";
import ElectronicHome from "../components/ElectronicHome";
import FernitureHome from "../components/FernitureHome";
import Features from "../components/Features";
import SubNewsLatter from "../components/SubNewsLatter";

const sliderImages = [img1, img2, img3];

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleOpenPopup = () => setIsPopupVisible(true);
  const handleClosePopup = () => setIsPopupVisible(false);



  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    autoplaySpeed: 2000,
    dots: true, // Added dots for navigation
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto p-2 overflow-hidden">
        <div className="flex gap-0">
          {/* Categories Dropdown */}
          <div className="w-[330px] relative hidden md:block">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-between w-full px-4 py-2 text-left  border shadow-sm  focus:outline-none focus:ring-none "
              aria-expanded={isOpen}
            >
              <span className="font-medium">Browse Categories</span>
              <BsChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`absolute top-[50px] left-0 w-64  border border-gray-300 overflow-hidden transition-all duration-200 ease-in-out ${
                isOpen
                  ? "opacity-100 translate-y-0 visible"
                  : "opacity-0 -translate-y-2 invisible"
              }`}
            >
              <nav className="py-2">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#004798] hover:text-white transition-colors text-sm"
                  >
                    <span>{category.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Image Slider */}
          <div className="overflow-hidden rounded-lg">
            <div className="p-2 w-full">
              <Slider {...settings} className="rounded-lg max-w-7xl overflow-hidden">
                {sliderImages.map((image, index) => (
                  <div key={index} className="">
                    <Image
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-[400px] md:h-[500px] object-cover rounded-lg"
                      priority // Optimize image loading
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      <FeauredProduct handleview={handleOpenPopup} />

      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 gap-4 max-w-7xl mx-auto p-2">
        <div className="rounded-md overflow-hidden">
          <Image
            src={dis2}
            alt="banner"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="rounded-md overflow-hidden">
          <Image
            src={dis3}
            alt="banner"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <LatestProduct handleview={handleOpenPopup} />
      <div className="max-w-7xl mx-auto overflow-hidden rounded-md my-2">
        <Image
          src={banner1}
          alt="banner"
          className="w-full h-[300px] object-cover rounded-md"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-1 gap-4 max-w-7xl mx-auto p-2 my-2">
        <div className="rounded-md overflow-hidden">
          <Image
            src={dis1}
            alt="banner"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="rounded-md overflow-hidden">
          <Image
            src={dis2}
            alt="banner"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="rounded-md overflow-hidden">
          <Image
            src={dis3}
            alt="banner"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto overflow-hidden rounded-md my-2">
        <Image
          src={banner1}
          alt="banner"
          className="w-full h-[200px] object-cover rounded-md"
        />
      </div>

      <ElectronicHome />
      <div className="max-w-7xl mx-auto overflow-hidden rounded-md my-2">
        <Image
          src={banner1}
          alt="banner"
          className="w-full h-[300px] object-cover rounded-md"
        />
      </div>
      <FernitureHome />
      <Features />
      <SubNewsLatter />

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
};

export default Page;
