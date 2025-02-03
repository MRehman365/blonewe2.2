"use client";

import { FiMinus, FiPlus, FiX } from "react-icons/fi";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import Image from "next/image";
import { useEffect, useState } from "react";
import img1 from "../assets/image-1-1-1-450x450.png";
import { MdMenu } from "react-icons/md";
import Link from "next/link";
import { decreaseQuantity, deleteCart, fetchCouponByCode, getCart, increaseQuantity } from "@/store/reducer/cartReducer";
import { useDispatch, useSelector } from "react-redux";
import { getAddressById } from "@/store/reducer/authReducer";
import { createCheckout, getCheckoutById } from "@/store/reducer/checkoutReducer";
import { toast } from "react-toast";

export default function ShoppingCart() {
  
  const { cartlist, loading, error, coupon } = useSelector((state) => state.cart);
  const { useraddress } = useSelector((state) => state.auth);
  const { checkout } = useSelector((state) => state.checkout);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userid");

  const [code, setCode] = useState("")

  useEffect(() => {
    dispatch(getCart(userId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAddressById(userId));
  }, [dispatch]);
  console.log(useraddress, 'address')

  const cartno = Array.isArray(cartlist) ? cartlist : cartlist?.cart || [];
  const getaddress = Array.isArray(useraddress)
    ? useraddress
    : useraddress?.data || [];

  const addQuantity = async (id) => {
    await dispatch(increaseQuantity(id));
    dispatch(getCart(userId));
  };

  const minusQuantity = async (id) => {
    await dispatch(decreaseQuantity(id));
    dispatch(getCart(userId));
  };

  const deleteproduct = async (id) => {
    await dispatch(deleteCart(id));
    dispatch(getCart(userId));
  };

  const calculateTotalPrice = () => {
    const totalPrice = cartno.reduce((total, product) => {
      const priceAfterDiscount = product.productId?.price * (1 - product.productId?.discount / 100);
      return total + priceAfterDiscount * product.quantity;
    }, 0);

    if (coupon && coupon.discount) {
      const discountAmount = (totalPrice * (coupon.discount / 100)).toFixed(2);
      return (totalPrice - discountAmount).toFixed(2);
    }

    return totalPrice.toFixed(2);
  };

  const totalPrice = calculateTotalPrice();

  const handleCheckout = async () => {
    const checkoutData = {
      userid: userId,
      payment_status: "pending",
      shippingInfo: getaddress[0],
      price: calculateTotalPrice(),
      coupon: coupon ? coupon.code : null,
      products: cartno.map((product) => ({
        productId: product.productId._id,
        quantity: product.quantity,
        price: product.productId.price * (1 - product.productId.discount / 100),
      })),
    };

    await dispatch(createCheckout(checkoutData)).then((res) => {
      if (res?.payload?.success) {
        toast.success(res.payload.message);
      } else {
        toast.error(res.payload.message);
      }
    });

    dispatch(getCheckoutById({ id: userId }));
  };

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    await dispatch(fetchCouponByCode(code));
    console.log(coupon, 'couponsdata');
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-[#18ff3b1e] p-4 mb-6 rounded flex items-center gap-2">
        <FaRegBookmark className="text-green-600" />
        <span className="">Your order qualifies for free shipping!</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4 text-sm font-medium text-gray-600 mb-4">
              <div className="col-span-2">Product</div>
              <div className="hidden md:block">Price</div>
              <div className="hidden md:block">Subtotal</div>
              <div>Quantity</div>
              <div className="block">Remove</div>
            </div>

            <div className="space-y-4">
  {cartno.length > 0 ? (
    cartno.map((product, i) => (
      <div
        key={i}
        className="grid grid-cols-4 md:grid-cols-6 gap-4 items-center border-b pb-4"
      >
        <div className="col-span-2 flex gap-4">
          <Image
            src={product.productId.image[0]}
            alt="img"
            width={50}
            height={50}
            className="object-cover"
          />
          <div>
            <h3 className="font-medium text-[15px]">
              {product.productId.name.slice(0, 30)}..
            </h3>
          </div>
        </div>
        <div className="hidden md:block">
          ₹{(product.productId?.price * (1 - product.productId?.discount / 100)).toFixed(2)}
        </div>
        <div className="hidden md:flex items-center justify-between">
          <div>
            ₹{(product.productId?.price * (1 - product.productId?.discount / 100)) * product.quantity}
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
        <div className="block">
          <button
            className="p-1 bg-red-500 rounded-full ml-2"
            onClick={() => deleteproduct(product._id)}
          >
            <FiX className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    ))
  ) : (
    <div className="text-center text-gray-500 py-6">
      No products in cart.
    </div>
  )}
</div>

            <div className="mt-6 flex flex-col md:flex-row justify-between gap-4">
              <form onSubmit={handleApplyCoupon} className="flex items-center gap-2">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Coupon code"
                  className="px-4 py-2 border rounded  bg-bgInput outline-none"
                />
                <button type="submit" className="px-4 py-2 bg-[#00b4d8] text-white rounded hover:bg-[#0096c7] transition-colors">
                  Apply coupon
                </button>
              </form>
              {/* <button className="px-4 py-2 border rounded hover:bg-gray-50 transition-colors">
                Clear All
              </button> */}
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
                <span>₹{totalPrice}</span>
              </div>

              {/* Shipping Section 1 */}
              <div className="border-b pb-4 flex justify-between">
                <div className=" flex item-center">
                  <span className="font-medium">Shipping Info: </span>
                </div>
                <div className="flex flex-col gap-1 justify-center items-end text-right">
                  <p className="text-sm text-gray-500">
                    {" "}
                    <span>
                    {getaddress[0]?.name}</span>
                  </p>
                  <div>
                      {getaddress?.map((item, index) => (
                        <p key={index} className="text-gray-700 mt-2">
                          {item.address} {item.city} {item.state}  {item.country}
                        </p>
                      ))}
                    </div>
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
                    <Link href='/myaccount' className="text-blue-500 underline">
                      Change address
                    </Link>
                  </div>
                </div>
              </div>

              {coupon && coupon.discount && (
                <div className="flex justify-between py-3 border-b">
                  <span>Discount ({coupon.discount}%)</span>
                  <span>-₹{(totalPrice * (coupon.discount / 100)).toFixed(2)}</span>
                </div>
              )}

              <div className="py-3">
                <div className="flex justify-between">
                  <span className="text-xl font-medium">Total</span>
                  <span className="text-xl font-medium text-red-500">₹{calculateTotalPrice()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button onClick={handleCheckout} className="w-full px-2 py-3 bg-[#004b93] text-white rounded hover:bg-[#003d7a] transition-colors">
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}