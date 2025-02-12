"use client";

import { CiDollar } from "react-icons/ci";
import { BsBox } from "react-icons/bs";
import { BsTruck } from "react-icons/bs";
import { PiMapPinThin } from "react-icons/pi";
import { AiOutlineLike } from "react-icons/ai";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import img1 from "./assets/slider-04.jpg";
import img2 from "./assets/slider-05.jpg";
import img3 from "./assets/slider-06.jpg";
import Image from "next/image";
import cat1 from "./assets/beauty.png";
import cat2 from "./assets/fashion.png";
import cat3 from "./assets/sport.png";
import cat4 from "./assets/furniture-category.png";
import cat5 from "./assets/beauty.png";
import cat6 from "./assets/beauty.png";
import dis1 from "./assets/banner-13.jpg";
import dis2 from "./assets/banner-14.jpg";
import dis3 from "./assets/banner-15.jpg";
import banner1 from "./assets/banner-16.jpg";
import banner2 from "./assets/banner-17.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Link from "next/link";
import Electronics from "./components/Electronic-and-Watches";
import AllStore from "./components/All-Store";
import FeauredProduct from "./components/Feaured-Product";
import ModernFerniture from "./components/Modern-Ferniture";
import NewLatter from "./components/NewLatter";
import { useEffect, useState } from "react";
import ProductDetail from "./components/ProductDetail";
import LatestProduct from "./components/LatestProduct";
import SubNewsLatter from "./components/SubNewsLatter";
import Features from "./components/Features";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanners, fetchCategories } from "@/store/reducer/categoryReducer";

const services = [
  {
    icon: CiDollar,
    text: "Installments Without Card",
  },
  {
    icon: BsBox,
    text: "Free pickup in stores",
  },
  {
    icon: BsTruck,
    text: "Free delivery from 2000",
  },
  {
    icon: PiMapPinThin,
    text: "Track your order",
  },
  {
    icon: AiOutlineLike,
    text: "100% Customer satisfaction rate",
  },
];

// const sliderImages = [img1, img2, img3];

export default function Home() {
  const { categories, banners } = useSelector((state) => state.category);

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleOpenPopup = () => setIsPopupVisible(true);
  const handleClosePopup = () => setIsPopupVisible(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const category = Array.isArray(categories)
    ? categories
    : categories.category || [];

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  const bannerdata = Array.isArray(banners)
    ? banners
    : banners.banners[0] || [];
  const sliderImages = Array.isArray(bannerdata)
    ? bannerdata
    : bannerdata?.mainbanner || [];
  const secondImages = Array.isArray(bannerdata)
    ? bannerdata
    : bannerdata?.secondbanner || [];
  const forthImages = Array.isArray(bannerdata)
    ? bannerdata
    : bannerdata?.fourthbanner || [];
  // const secondImages = bannerdata.secondbanner;


  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slidesPerView: 1,
    autoplay: true,
  });
  const handlePrev = () => {
    if (instanceRef.current) {
      instanceRef.current.prev();
    }
  };

  const handleNext = () => {
    if (instanceRef.current) {
      instanceRef.current.next();
    }
  };

  const CustomPrevArrow = ({ onClick }) => (
    <button
      className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/10 hover:bg-black/50 transition-all text-white px-2 py-4 rounded-md z-10"
      onClick={onClick}
    >
      <FaChevronLeft />
    </button>
  );

  // Custom Right Arrow
  const CustomNextArrow = ({ onClick }) => (
    <button
      className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/10 hover:bg-black/50 transition-all text-white px-2 py-4 rounded-md"
      onClick={onClick}
    >
      <FaChevronRight />
    </button>
  );

  const settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    navigator: true,
    autoplay: true,
    arrows: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="">
      {/* Services Section */}
      <div className="w-full py-3 max-w-5xl mx-auto p-2">
        <div>
          <div className="flex justify-between items-center gap-4 sm:overflow-x-auto md:overflow-visible ">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-center gap-2 min-w-fit text-sm text-muted-foreground"
              >
                <service.icon className="text-sm md:text-lg text-sky-500" />
                <span className="text-sm md:text-base text-gray-400 font-[300]">
                  {service.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slider Section */}
      <div className="p-2 relative overflow-hidden">
        <div
          className="keen-slider max-w-7xl mx-auto rounded-lg overflow-hidden relative"
          ref={sliderRef}
        >
          {sliderImages.map((image, index) =>
            image ? (
              <div key={index} className="keen-slider__slide">
                <Image
                  src={image}
                  alt={`Slide ${index + 1}`}
                  height={1000}
                  width={1000}
                  className="w-full h-[400px] md:h-[500px] object-cover rounded-lg"
                />
              </div>
            ) : null
          )}

          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/10 hover:bg-black/50 transition-all text-white px-2 py-4 rounded-md"
            onClick={handlePrev}
          >
            <FaChevronLeft />
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/10 hover:bg-black/50 transition-all  text-white px-2 py-4 rounded-md"
            onClick={handleNext}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div className="p-2 max-w-7xl mx-auto rounded-lg overflow-hidden">
        <Slider {...settings} className="grid grid-cols-6">
          {category?.map((item, index) => (
            <Link
              href={`/shop/${item?.name}`}
              key={index}
              className="flex justify-center overflow-hidden group"
            >
              <Image
                src={item?.image}
                alt={`Slide ${index + 1}`}
                width={100}
                height={100}
                loading="lazy"
                className="object-contain rounded-md h-[100px] w-[100px] transition-all md:h-[150px] md:w-[150px] bg-[#eceef0] mx-auto"
              />
              <p className="text-center p-2 font-[500] text-gray-500 transition-all group-hover:text-primary">
                {item?.name}
              </p>
            </Link>
          ))}
        </Slider>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-1 gap-4 max-w-7xl mx-auto p-2">
        <div className="rounded-md overflow-hidden">
          <Image
            src={secondImages[0] || "https://i.ibb.co/WvmRYQZz/slider-06.jpg"}
            height={1000}
            width={1000}
            alt="banner"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="rounded-md overflow-hidden">
          <Image
            src={secondImages[1] || "https://i.ibb.co/WvmRYQZz/slider-06.jpg"}
            height={1000}
            width={1000}
            alt="banner"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="rounded-md overflow-hidden">
          <Image
            src={secondImages[2] || "https://i.ibb.co/WvmRYQZz/slider-06.jpg"}
            height={1000}
            width={1000}
            alt="banner"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <LatestProduct handleview={handleOpenPopup} />

      <div className="w-full p-2 mt-3 max-w-7xl mx-auto rounded-md font-mono">
        <div className="p-4 rounded-md mx-auto flex flex-wrap items-center justify-center gap-2 text-lg font-semibold text-center w-full bg-red-50 text-red-500 sm:gap-4">
          <span>Super discount for your</span>
          <Link href="#" className="underline">
            first purchase
          </Link>
          <code className="rounded-md border border-dashed border-red-200 bg-white px-2 py-1 font-mono font-[400]">
            FREE25CAD
          </code>
          <span className=" font-mono font-[400]">
            Use discount code in the checkout!
          </span>
        </div>
      </div>
      <Electronics handleview={handleOpenPopup} />
      <div className="max-w-7xl mx-auto overflow-hidden rounded-md">
        <Image
          src={bannerdata?.thirdbanner || "https://i.ibb.co/zHbbBGJX/banner-16.jpg"}
          height={1000}
          width={1000}
          alt="banner"
          className="w-full h-auto object-cover rounded-md"
        />
      </div>

      <FeauredProduct handleview={handleOpenPopup} />

      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 gap-4 max-w-7xl mx-auto p-2">
        <div className="rounded-md overflow-hidden">
          <Image
            src={forthImages[0] || "https://i.ibb.co/vCX3Xt9m/banner-15.jpg"}
            height={1000}
            width={1000}
            alt="banner"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="rounded-md overflow-hidden">
          <Image
            src={forthImages[1] || "https://i.ibb.co/vCX3Xt9m/banner-15.jpg"}
            height={1000}
            width={1000}
            alt="banner"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <ModernFerniture handleview={handleOpenPopup} />
      <div className="max-w-7xl mx-auto overflow-hidden rounded-md">
        <Image
          src={bannerdata?.fifthbanner || "https://i.ibb.co/zHbbBGJX/banner-16.jpg"}
          height={1000}
          width={1000}
          alt="banner"
          className="w-full h-[400px] md:h-auto object-cover rounded-md"
        />
      </div>
      <NewLatter />
      <Features />
      <SubNewsLatter />

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
            <ProductDetail handleview={handleOpenPopup} />
          </div>
        </div>
      )}
    </div>
  );
}
