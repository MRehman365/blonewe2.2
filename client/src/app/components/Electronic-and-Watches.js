'use client'

import Image from "next/image"
import { useState } from "react"
import { MdOutlineZoomOutMap } from "react-icons/md"
import { FaRegHeart, FaStar } from "react-icons/fa"
import prodcut1 from '../assets/image-1-1-1-450x450.png'
import prodcut2 from '../assets/image-1-10-450x450.png'
import prodcut3 from '../assets/image-1-11-450x450.png'
import prodcut4 from '../assets/image-1-13-450x450.png'
import prodcut5 from '../assets/image-1-14-450x450.png'
import prodcut6 from '../assets/image-1-15-450x450.png'
import prodcut7 from '../assets/image-1-16-450x450.png'
import prodcut8 from '../assets/image-1-17-450x450.png'
import prodcut9 from '../assets/image-1-7-450x450.png'
import prodcut10 from '../assets/image-1-17-450x450.png'
import Link from "next/link"
import { toast } from "react-toast"

export default function Electronics({handleview}) {
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
  ]
  const wave = () => toast.success('Product Added to Wishlist')
  const addCart = () => toast('Product Added to Cart')
  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex justify-between py-2">
        <p className="text-base md:text-lg">Electronics & Watches</p>
        <p className="text-sm md:text-base ">View all</p>
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
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative overflow-hidden w-full border border-gray-300 flex flex-col"
              >
                <div
                  className="relative aspect-square"
                  onMouseEnter={(e) => e.currentTarget.classList.add('hovered')}
                  onMouseLeave={(e) => e.currentTarget.classList.remove('hovered')}
                >
                <Link href='/product'>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  </Link>
                  {product.discount > 0 && (
                    <div className="absolute left-2 bottom-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {product.discount}%
                    </div>
                  )}
                  <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100" >
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100" onClick={handleview} >
                      <MdOutlineZoomOutMap className="h-4 w-4 text-gray-600" />
                    </button>
                    <button  onClick={wave} className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                      <FaRegHeart className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="p-4 flex-grow flex flex-col">
                <div className="flex gap-2 items-center">
            <div className="text-sm text-gray-500 line-through">₹{product.price.toFixed(2)}</div>
              <div className=" text-lg font-bold bg-green-600 px-1 text-white rounded-md">
                ₹{product.originalPrice.toFixed(2)}
              </div>
          </div>
                  <h3 className="text-sm font-medium mt-2 line-clamp-2">{product.name}</h3>
                      <div className="h-[25px] overflow-hidden relative">
        <div className="absolute flex flex-col gap-2 bottom-0 group-hover:-bottom-7 transform transition-all duration-500">
        <div className="text-[12px] "><span className="text-gray-400">Store:</span> Groci</div>
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
                  <button onClick={addCart} className="mt-auto px-3 py-2 bg-[#004798] text-white text-sm font-medium rounded-md hover:bg-[#004798]/80">
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
