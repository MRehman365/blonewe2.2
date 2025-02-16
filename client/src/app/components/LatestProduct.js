import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegHeart, FaStar, FaShoppingCart } from "react-icons/fa";
import { MdOutlineZoomOutMap } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Link from "next/link";
import { toast } from "react-toast";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@/store/reducer/productReducer";
import { addToWishlist, getWishlist } from "@/store/reducer/wishlistReducer";
import { addToCart, getCart } from "@/store/reducer/cartReducer";

const LatestProduct = ({ handleview }) => {
  const { products, loading, error } = useSelector((state) => state.products);
  const { cartlist } = useSelector((state) => state.cart)
  const dispatch = useDispatch();

     const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userid");
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if(!userId) {
      return;
    }
    dispatch(getCart(userId))
  },[dispatch, userId])

  const [cartLoadingStates, setCartLoadingStates] = useState({});
  const [inCartStates, setInCartStates] = useState({});

  const handlecart = async (productId) => {
    setCartLoadingStates((prev) => ({ ...prev, [productId]: true }));

    await dispatch(addToCart({ userId, productId })).then((res) => {
      setCartLoadingStates((prev) => ({ ...prev, [productId]: false }));

      if (res?.payload?.success) {
        toast.success(res.payload.message);
        setInCartStates((prev) => ({ ...prev, [productId]: true }));
      } else {
        toast.error(res.payload.message);
      }
    });
    dispatch(getCart(userId))
  };

  const product = Array.isArray(products) ? products : products?.menu || [];

  const initialTime = 1 * 24 * 60 * 60 + 14 * 60 * 60 + 20 * 60 + 10;

  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

  const days = Math.floor(timeRemaining / (24 * 60 * 60));
  const hours = Math.floor((timeRemaining % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeRemaining % (60 * 60)) / 60);
  const seconds = timeRemaining % 60;

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
    <div className="max-w-7xl mx-auto p-2 overflow-hidden">
      <div className="flex justify-between py-2">
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <p className="text-base md:text-lg">Latest Products</p>
          <p>
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
          </p>
        </div>

        <Link href="/shop" className="text-sm md:text-base hover:text-[#004798]">View all</Link>
      </div>
      <Slider
        {...settings}
        className="grid gap-0 border-[3px] border-red-500 rounded-lg overflow-hidden min-h-full"
      >
        {product.map((item, i) => (
          <div key={i} className="h-full">
            <div className="group relative overflow-hidden w-full transition-all duration-300 h-[376px] flex flex-col border border-gray-200 mx-auto">
              <div className="relative aspect-square">
                <Link href={`/product/${item._id}`} className="overflow-hidden">
                  <Image
                    src={item?.image[0] || "https://i.ibb.co/PZbkQjRb/image-not-found.jpg"}
                    alt={item?.name}
                    loading="lazy"
                    fill
                    className="object-contain h-[400px] w-auto overflow-hidden transition-transform duration-300 group-hover:scale-105"
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
                    onClick={() => handleview(item._id)}
                  >
                    <MdOutlineZoomOutMap className="h-4 w-4 text-gray-600" />
                  </button> */}
                  <button onClick={() => handlewish(item._id)} className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                    <FaRegHeart
                      className="h-4 w-4 text-gray-600"
                    />
                  </button>
                </div>
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <div className="flex gap-2 items-center">
                  <div className="text-[10px] md:text-sm text-gray-500 line-through">
                    ₹{item?.price.toFixed(2)}
                  </div>
                  <div className="text-base md:text-lg font-bold bg-green-600 px-1 text-white rounded-md">
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
                    disabled={cartLoadingStates[item._id] || inCartStates[item._id]}
                  >
                    {cartLoadingStates[item._id] ? (
                      "Adding..."
                    ) : inCartStates[item._id] ? (
                      <>
                        <FaShoppingCart className="mr-2" />
                        Product in Cart
                      </>
                    ) : (
                      "Add to cart"
                    )}
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

export default LatestProduct;