import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { MdOutlineZoomOutMap } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useTheme } from "../layout";
import { toast } from "react-toast";
import { getProducts } from "@/store/reducer/productReducer";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCart } from "@/store/reducer/cartReducer";
import { addToWishlist, getWishlist } from "@/store/reducer/wishlistReducer";
import Link from "next/link";

const DiscountedProduct = ({ handleview }) => {
  const { theme } = useTheme()
  const { products, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const userId = localStorage.getItem('userid');

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const product = Array.isArray(products) ? products : products.menu || [];

  const handlecart = async (productId) => {

    await dispatch(addToCart({ userId, productId })).then((res) => {

      if (res?.payload?.success) {
        toast.success(res.payload.message);
      } else {
        toast.error(res.payload.message);
      }
    });
    dispatch(getCart(userId))
  };

  const handlewish = async (productId) => {
    await dispatch(addToWishlist({ userId, productId })).then((res) => {
       if (res?.payload?.success) {
         toast.success(res.payload.message);
       } else {
         toast.error(res.payload.message);
       }
     });
     dispatch(getWishlist(userId))
   };
 
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
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 900,
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
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <div className="max-w-7xl mx-auto p-2 overflow-hidden" >
      <div className="flex justify-between py-2">
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <p className="text-base md:text-lg">The best discounts this week</p>
          {/* <p>
            {" "}
            <span className="bg-red-500 text-white px-2 py-1 text-base rounded-md ml-4">
              {days} <span className="text-white text-[12px]">d</span>
            </span>
            <span className="bg-red-500 text-white px-2 py-1 text-base rounded-md ml-1">
              {hours} <span className="text-white text-[12px]">h</span>
            </span>
            <span className="bg-red-500 text-white px-2 py-1 text-base rounded-md ml-1">
              {minutes} <span className="text-white text-[12px]">m</span>
            </span>
            <span className="ml-1 text-white">:</span>
            <span className="bg-red-500 text-white px-2 py-1 text-base rounded-md ml-1">
              {seconds} <span className="text-white text-[12px]">s</span>
            </span>
          </p> */}
        </div>

        <p className="text-sm md:text-base hover:text-[#1d1d72]"></p>
      </div>
      <Slider
        {...settings}
        className="grid gap-0  rounded-lg overflow-hidden"
      >
         {product.slice(5, 14).map((item, i) => (
          <div key={i} className="h-full">
            <div className="group relative overflow-hidden w-full transition-all duration-300 h-[376px] flex flex-col border border-gray-200 mx-auto">
              <div className="relative aspect-square">
                <Link href={`/product/${item._id}`} className="overflow-hidden">
                  <Image
                    src={item?.image[0]}
                    alt={item?.name}
                    loading="lazy"
                    fill
                    className="object-cover h-[400px] w-auto overflow-hidden transition-transform duration-300 group-hover:scale-105"
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
                  <button
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                    onClick={() => handleview(item._id)}
                  >
                    <MdOutlineZoomOutMap className="h-4 w-4 text-gray-600" />
                  </button>
                  <button onClick={() => handlewish(item._id)} className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                    <FaRegHeart
                      className="h-4 w-4 text-gray-600"
                    />
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
                    <div className="text-[12px] ">
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
      </Slider>
      
    </div>
  );
};

export default DiscountedProduct;
