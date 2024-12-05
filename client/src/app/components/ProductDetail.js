'use client'

import { useState } from "react"
import Image from "next/image";
import { FaHeart, FaMinus, FaPlus, FaFacebookF, FaTwitter, FaLinkedinIn, FaRedditAlien, FaWhatsapp } from "react-icons/fa";
import { FaStar, FaStarHalf, FaShare, FaTimes } from 'react-icons/fa';

import img1 from '../assets/image-1-15-450x450.png'
import { useTheme } from "../layout";

export default function ProductDetail({handleview, handleClosePopup}) {
  const [quantity, setQuantity] = useState(1)
  const { theme } = useTheme(); 

  if (!handleview) return null;

  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1)

  return (
    <div className="w-full max-w-4xl mx-auto shadow-lg rounded-lg  z-50 max-h-[90vh] overflow-auto" 
         style={{
        backgroundColor: theme === "light" ? "rgba(255, 255, 255, 1)" : "rgba(26, 32, 44, 1)",
        color: theme === "light" ? "#000" : "#fff",
      }}
      >
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold ">BY WIRTH — SCALA SKAMMEL — FLERE VARIANTER</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
                <FaStar className="text-gray-300" />
              </div>
              <span className="text-gray-500">3 reviews</span>
              <span className="text-gray-500">Store: machic</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative aspect-square">
            <Image
              src={img1}
              alt="Wooden stool"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-baseline gap-4">
            <span className="text-xl text-gray-500 line-through">₹28.90</span>
              <span className="text-3xl font-[600] text-red-600">₹18.90</span>
            </div>

            <p className="text-gray-500">
              Fusce sapien urna, tristique non sapien nec, rutrum fringilla eros. Etiam accumsan odio eget tempus consectetur. Aliquam et sapien nulla. Suspendisse lobortis leo ante, imperdiet tristique magna tristique eu. Nullam ultrices vulputate odio, eu iaculis nulla congue quis.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <button 
                  className="p-2 hover:bg-gray-100"
                  onClick={decrementQuantity}
                >
                  <FaMinus className="h-4 w-4 text-gray-500" />
                </button>
                <span className="w-12 text-center ">{quantity}</span>
                <button 
                  className="p-2 hover:bg-gray-100"
                  onClick={incrementQuantity}
                >
                  <FaPlus className="h-4 w-4 text-gray-500" />
                </button>
              </div>
              <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
                Add to cart
              </button>
            </div>

            <button className="w-full  py-2 px-4 rounded flex  justify-start items-center gap-2">
              <FaHeart className="h-4 w-4" />
              Add to wishlist
            </button>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-500">SKU: F7S6G8T9S1</p>
              <p className="text-sm text-gray-500">Categories: Furniture, Table</p>
              <p className="text-sm text-gray-500">Tags: chair, table</p>
            </div>

            <div className="flex gap-2">
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaRedditAlien, FaWhatsapp].map((Icon, index) => (
              <button key={index} className="p-2 border  border-gray-300 rounded-full hover:text-blue-700 hover:border-blue-700 transition duration-200">
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

