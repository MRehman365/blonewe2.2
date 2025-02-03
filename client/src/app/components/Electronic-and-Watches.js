'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import { MdOutlineZoomOutMap } from "react-icons/md"
import { FaRegHeart, FaStar } from "react-icons/fa"
import Link from "next/link"
import { toast } from "react-toast"
import { useDispatch, useSelector } from "react-redux"
import { fetchCategories } from "@/store/reducer/categoryReducer"
import { getProducts } from "@/store/reducer/productReducer"
import { addToCart, getCart } from "@/store/reducer/cartReducer"
import { addToWishlist, getWishlist } from "@/store/reducer/wishlistReducer"

export default function Electronics({handleview}) {
  const { products } = useSelector((state) => state.products);
  const { categories} = useSelector((state) => state.category)
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userid');

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const product = Array.isArray(products) ? products : products.menu || [];


  useEffect(() => {
    dispatch(fetchCategories()) 
  },[dispatch])
  const category = Array.isArray(categories) ? categories : categories.category || [];

  const filteredByCategory = product.filter(product => product.category === category[0]?.name);

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

  const handlecart = async (productId) => {
   await dispatch(addToCart({ userId, productId})).then((res) => {
      if (res?.payload?.success) {
        toast.success(res.payload.message);
      } else {
        toast.error(res.payload.message);
      }
    });
    dispatch(getCart(userId))
   } 



  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex justify-between py-2">
        <p className="text-base md:text-lg">{category[0]?.name}</p>
        <Link href={`/shop/${category[0]?.name}`} className="text-sm md:text-base hover:text-[#004798]">View all</Link>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4 bg-black text-white p-6 rounded-lg">
          <div className="mb-6">
            <p className="text-sm font-medium text-green-400 mb-2">Weekend Discount</p>
            <h2 className="text-3xl font-bold mb-4">We can solve any computer problem</h2>
            <p>Only for this week...</p>
          </div>
          <div>
            <p className="text-2xl font-bold mb-4">from ₹249.99</p>
            <button className="px-4 py-2 border border-white text-white hover:bg-white hover:text-black transition-colors rounded-md">
              Shop Now
            </button>
          </div>
        </div>
        <div className="lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
            {filteredByCategory.slice(0, 10).map((item, i) => (
              <div key={i} className="h-full">
            <div className="group relative overflow-hidden w-full transition-all duration-300 h-[368px] flex flex-col border border-gray-200 mx-auto">
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
        </div>
      </div>
    </div>
  )
}
