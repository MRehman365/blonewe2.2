"use client";

import Image from "next/image";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { FaStar, FaRegStar, FaRegHeart } from "react-icons/fa";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { customer_review, get_reviews, getProductById, getProducts } from "@/store/reducer/productReducer";
import { addToWishlist, getWishlist } from "@/store/reducer/wishlistReducer";
import { addToCart, getCart } from "@/store/reducer/cartReducer";
import { toast } from "react-toast";
import RatingTemp from "./RatingTemp";
// import Ratings from "./Rating";
import RatingReact from "react-rating";
import { CiStar } from "react-icons/ci";
import { AiFillStar } from "react-icons/ai";
import { getUserById } from "@/store/reducer/authReducer";

export default function SingleProductDiscription({ handleview, id }) {
  const { singleuser } = useSelector((state) => state.auth);
  const { singleproduct, products, successMessage, reviews, totalReview, rating_review  } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserinfo] = useState(null);

useEffect(() => {
  setUserId(localStorage.getItem("userid"));
}, []);
useEffect(() => {
  setUserinfo(localStorage.getItem("userid"));
}, []);

useEffect(() => {
  if(!userId) {
    return;
  }
  dispatch(getUserById(userId));
}, [dispatch]);

const me = Array.isArray(singleuser) ? singleuser : singleuser?.user || [];

// console.log(me)


  const [activeTab, setActiveTab] = useState("reviews");


  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch]);
  const product = Array.isArray(singleproduct)
    ? singleproduct
    : singleproduct?.menu || [];
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const recent = Array.isArray(products) ? products : products?.menu || [];

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
  // rating function


  const [rat, setRat] = useState("");
  const [re, setRe] = useState("");

  const review_submit = async(e) => {
    e.preventDefault();
    const obj = {
      name: me?.name,
      review: re,
      rating: rat,
      productId: id,
    };
   await dispatch(customer_review(obj));
   dispatch(get_reviews({ productId: id }));
   setRat("");
   setRe("");
  };



  useEffect(() => {
    if (id) {
      dispatch(get_reviews({ productId: id }));
    }
  }, [dispatch, id]);

  const myreview = Array.isArray(reviews) ? reviews : reviews.getAll || [];


  const StarRating = ({ rating, onRatingChange }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => onRatingChange(star)}
            className="cursor-pointer"
          >
            {star <= rating ? (
              <AiFillStar className="text-[#EDBB0E] text-4xl" />
            ) : (
              <CiStar className="text-slate-600 text-4xl" />
            )}
          </span>
        ))}
      </div>
    );
  };



  return (
    <div className="w-full max-w-7xl mx-auto p-2">
      {/* Tabs */}
      <div className="border-b">
        <div className="flex gap-8">
          {["description", "reviews", "more-products"].map((tab) => (
            <button
              key={tab}
              className={`relative h-9 rounded-none md:px-4 font-medium text-sm md:text-base ${
                activeTab === tab
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "reviews"
                ? `Reviews (${myreview.length})`
                : tab.charAt(0).toUpperCase() + tab.slice(1).replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "description" && (
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">Product Description</h2>
            <p className="flex items-center gap-2">{product?.description}</p>
          </div>
        )}
        {activeTab === "reviews" && (
          <div className="mt-8 p-5">
      <div>
      {userInfo ? (
                <div className="flex flex-col gap-3">
                  <StarRating rating={rat} onRatingChange={setRat} />
                  <form onSubmit={review_submit}>
                    <textarea
                      value={re}
                      required
                      onChange={(e) => setRe(e.target.value)}
                      className="border outline-0 p-3 w-full"
                      name=""
                      id=""
                      cols="30"
                      rows="5"
                    ></textarea>
                    <div className="mt-2">
                      <button className="py-1 px-5 bg-indigo-500 text-white rounded-sm">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div>
                  <Link
                    className="py-1 px-5 bg-indigo-500 text-white rounded-sm"
                    href="/login"
                  >
                    Login
                  </Link>
                </div>
              )}
      </div>
      <h2 className="text-slate-600 text-xl font-bold py-5">
        Product Reviews {totalReview}
      </h2>
      <div className="flex flex-col gap-8 pb-10 pt-4">
        {myreview.map((r, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <div className="flex gap-1 text-xl">
                <RatingTemp rating={r.rating} />
              </div>
              <span className="text-slate-600">{r.date}</span>
            </div>
            <span className="text-slate-600 text-md">{r.name}</span>
            <p className="text-slate-600 text-sm">{r.review}</p>
          </div>
        ))}
      </div>
   
    </div>
        )}

        {activeTab === "more-products" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
            {recent.slice(0, 5).map((item, i) => (
              <div key={i} className="h-full">
                <div className="group relative overflow-hidden w-full transition-all duration-300 h-[386px] flex flex-col border border-gray-200 mx-auto">
                  <div className="relative aspect-square">
                    <Link
                      href={`/product/${item._id}`}
                      className="overflow-hidden"
                    >
                      <Image
                        src={item?.image[0] }
                        alt={item?.name}
                        loading="lazy"
                        fill
                        className="object-contain  h-[400px] w-auto overflow-hidden transition-transform duration-300 group-hover:scale-105"
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
                        <div className="text-[12px] ">
                          <span className="text-gray-400">Store:</span>{" "}
                          {item.store}
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
                        className="px-3 py-2 w-full bg-[#004798] text-white text-sm font-medium rounded-md hover:bg-[#004798]/80"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
