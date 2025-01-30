"use client";

import { FiMinus, FiPlus, FiX } from "react-icons/fi";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import Image from "next/image";
import { useEffect, useState } from "react";
import img1 from "../assets/image-1-1-1-450x450.png";
import { MdMenu } from "react-icons/md";
import Link from "next/link";
import { decreaseQuantity, deleteCart, getCart, increaseQuantity } from "@/store/reducer/cartReducer";
import { useDispatch, useSelector } from "react-redux";

export default function ShoppingCart() {
  
const { cartlist, loading, error } = useSelector((state) => state.cart)
const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    dispatch(getCart(userId))
  },[dispatch])
  
  const cartno = Array.isArray(cartlist) ? cartlist : cartlist?.cart || [];

  const addQuantity = (id) => {
    dispatch(increaseQuantity(id))
    console.log(id)
  }
  const minusQuantity = (id) => {
    dispatch(decreaseQuantity(id))
  }

  const deleteproduct = (id) => {
    dispatch(deleteCart(id))
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-[#18ff3b1e] p-4 mb-6 rounded flex items-center gap-2">
        <FaRegBookmark className="text-green-600" />
        <span className="">Your order qualifies for free shipping!</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-sm font-medium text-gray-600 mb-4">
              <div className="col-span-2">Product</div>
              <div className="hidden md:block">Price</div>
              <div className="hidden md:block">Subtotal</div>
              <div>Quantity</div>
              <div className="hidden md:block">Remove</div>
            </div>

            <div className="space-y-4">
              {cartno.map((product, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 md:grid-cols-6 gap-4 items-center border-b pb-4"
                >
                  <div className="col-span-2 flex gap-4">
                    <Image
                      src={product.productId.image[0]}
                      alt="img"
                      width={80}
                      height={80}
                      className=" object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-[15px]">
                        {product.productId.name}
                      </h3>
                    </div>
                  </div>
                  <div className="hidden md:block">
                  ₹{product.productId.price.toFixed(2)}
                  </div>
                  <div className=" hidden md:flex items-center justify-between">
                    <div>
                    ₹{(product.productId.price * product.quantity).toFixed(2)}
                    </div>
                  </div>
                  <div className="">
                    <div className="flex items-center justify-center rounded-md gap-2 border py-2">
                      <button
                        onClick={() => minusQuantity(product._id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <FiMinus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() => addQuantity(product._id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <FiPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <button className="p-1 bg-red-500 rounded-full ml-2" onClick={() => deleteproduct(product._id)}>
                      <FiX className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col md:flex-row justify-between gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Coupon code"
                  className="px-4 py-2 border rounded  bg-bgInput outline-none"
                />
                <button className="px-4 py-2 bg-[#00b4d8] text-white rounded hover:bg-[#0096c7] transition-colors">
                  Apply coupon
                </button>
              </div>
              <button className="px-4 py-2 border rounded hover:bg-gray-50 transition-colors">
                Clear All
              </button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-[#ffffff0b] border border-gray-200 p-6 rounded">
            <h2 className="text-xl font-medium mb-4">Cart totals</h2>
            <div className="space-y-6">
              {/* Subtotal */}
              <div className="flex justify-between py-3 border-b">
                <span>Subtotal</span>
                <span>₹999</span>
              </div>

              {/* Shipping Section 1 */}
              <div className="border-b pb-4 flex justify-between">
                <div className=" flex item-center">
                  <span className="font-medium">Shipping: </span>
                </div>
                <div className="flex flex-col gap-1 justify-center items-end text-right">
                  <p className="text-sm text-gray-500">
                    {" "}
                    <span>chakta</span>
                  </p>
                  <p className="text-[12px] text-gray-500">
                    GEORG JENSEN - ALFREDO - SALATBESTIK x1, Apple AirPods Max
                    Gets Firmware Update To 3C39 x1
                  </p>
                  <div className="mt-2 space-y-2 text-sm text-gray-500">
                    <div className="flex items-center justify-end gap-2">
                      <label htmlFor="machic-free-shipping">
                        Free shipping
                      </label>
                      <input
                        type="radio"
                        id="machic-free-shipping"
                        name="machic-shipping"
                        defaultChecked
                      />
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <label htmlFor="machic-local-pickup">Local pickup</label>
                      <input
                        type="radio"
                        id="machic-local-pickup"
                        name="machic-shipping"
                      />
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>
                      <span>Shipping to CA.</span>
                    </p>
                    <button className="text-blue-500 underline">
                      Change address
                    </button>
                  </div>
                </div>
              </div>

              {/* Shipping Section 2 */}
              <div className="border-b pb-4 flex">
                <div className="mb-2 flex items-center">
                  <span className="font-medium">Shipping: </span>
                </div>
                <div className="flex justify-end flex-col items-end text-right">
                  <p>
                    <span>machic</span>
                  </p>
                  <p className="text-[12px] text-gray-500 ">
                    BY WIRTH - SCALA SKAMMEL - FLERE VARIANTER x1, ELECTROLUX
                    EW6S226SUI x1, GEORG JENSEN - ALFREDO - SALATSKÅL - RUSTFRI
                    x1
                  </p>
                  <div className="mt-2 space-y-2 text-sm text-gray-500">
                    <div className="flex items-center justify-end gap-2">
                      <label htmlFor="machic-free-shipping">
                        Free shipping
                      </label>
                      <input
                        type="radio"
                        id="machic-free-shipping"
                        name="machic-shipping"
                        defaultChecked
                      />
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <label htmlFor="machic-local-pickup">Local pickup</label>
                      <input
                        type="radio"
                        id="machic-local-pickup"
                        name="machic-shipping"
                      />
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>
                      <span>Shipping to CA.</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="py-3">
                <div className="flex justify-between">
                  <span className="text-xl font-medium">Total</span>
                  <span className="text-xl font-medium text-red-500">
                  ₹9999
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link href='/checkout' >
              <button className="w-full px-2 py-3 bg-[#004b93] text-white rounded hover:bg-[#003d7a] transition-colors">
                Proceed to checkout
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
