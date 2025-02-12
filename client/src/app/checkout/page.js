"use client";

import { useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa";
import SubNewsLatter from "../components/SubNewsLatter";
import { useDispatch, useSelector } from "react-redux";
import { fetchCouponByCode, getCart } from "@/store/reducer/cartReducer";
import { getAddressById } from "@/store/reducer/authReducer";
import {
  createCheckout,
  getCheckoutById,
} from "@/store/reducer/checkoutReducer";
import { toast } from "react-toast";

export default function CheckoutPage() {
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const { cartlist, loading, error, coupon } = useSelector(
    (state) => state.cart
  );
  const { useraddress } = useSelector((state) => state.auth);
  const { checkout } = useSelector((state) => state.checkout);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userid");

  const [code, setCode] = useState("");

  useEffect(() => {
    
    dispatch(getCart(userId));
  }, [dispatch]);

  useEffect(() => {
    
    dispatch(getAddressById(userId));
  }, [dispatch]);

  const cartno = Array.isArray(cartlist) ? cartlist : cartlist?.cart || [];
  const getaddress = Array.isArray(useraddress)
    ? useraddress
    : useraddress?.data || [];

  const calculateTotalPrice = () => {
    const totalPrice = cartno.reduce((total, product) => {
      const priceAfterDiscount =
        product.productId?.price * (1 - product.productId?.discount / 100);
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
      shippingInfo: shippingInfo,
      price: calculateTotalPrice(),
      coupon: coupon ? coupon.code : null,
      paymentMethod: paymentMethod, // Include payment method
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
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-8">
          {/* Coupon Banner */}
          <div className="border border-gray-400 p-4 rounded">
            <p className="text-sm text-gray-500">
              Have a coupon?{" "}
              <button className="text-[#004798] hover:text-blue-800">
                Click here
              </button>{" "}
              to enter your code
            </p>
          </div>

          {/* Free Shipping Banner */}
          <div className="bg-[#18ff3b1e] p-4 mb-6 rounded flex items-center gap-2">
            <FaRegBookmark className="text-green-600" />
            <span className="">Your order qualifies for free shipping!</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Billing Details Form */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-6">Billing details</h2>
              <form className="space-y-6">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={shippingInfo.fullName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                    required
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={shippingInfo.phone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={shippingInfo.address}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={shippingInfo.city}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                    required
                  />
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={shippingInfo.postalCode}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                    required
                  />
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={shippingInfo.country}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                    required
                  />
                  

                <div>
                  <label className="block text-sm text-gray-500">
                    Payment Method <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004798] focus:ring-1 bg-[#ffffff12] focus:border-[#004798]"
                  >
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="Pay Online">Pay Online</option>
                  </select>
                </div>
                </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#ffffff06] p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-6">Your order</h2>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Product</span>
                      <span>Subtotal</span>
                    </div>
                  </div>

                  {cartno.length > 0 ? (
                    cartno.map((product, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span>
                          {product.productId.name.slice(0, 20)}.. ×{" "}
                          {product.quantity}
                        </span>
                        <span>
                          {" "}
                          ₹
                          {product.productId?.price *
                            (1 - product.productId?.discount / 100) *
                            product.quantity}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-6">
                      No products in cart.
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <div className="flex justify-between font-medium">
                      <span>Subtotal</span>
                      <span>₹{totalPrice}</span>
                    </div>
                  </div>
                  <form
                    onSubmit={handleApplyCoupon}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Coupon code"
                      className="px-4 py-2 border rounded bg-bgInput outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm bg-[#00b4d8] text-white rounded hover:bg-[#0096c7] transition-colors"
                    >
                      Apply coupon
                    </button>
                  </form>

                  {coupon && coupon.discount && (
                    <div className="flex justify-between py-3 border-b">
                      <span>Discount ({coupon.discount}%)</span>
                      <span>
                        -₹{(totalPrice * (coupon.discount / 100)).toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-xl text-red-600">
                        ₹{totalPrice}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded mt-4">
                    <p className="text-sm text-gray-600 mb-4">
                      Sorry, it seems that there are no available payment
                      methods. Please contact us if you require assistance or
                      wish to make alternate arrangements.
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      Your personal data will be used to process your order,
                      support your experience throughout this website, and for
                      other purposes described in our privacy policy.
                    </p>
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        className="h-4 w-4 text-[#004798] focus:ring-[#004798] focus:ring-1 bg-[#ffffff12] border-gray-300 rounded"
                      />
                      <label
                        htmlFor="terms"
                        className="ml-2 text-sm text-gray-700"
                      >
                        I have read and agree to the website terms and
                        conditions *
                      </label>
                    </div>
                    <button
                      type="submit"
                      onClick={handleCheckout}
                      className="w-full text-white py-3 px-4 rounded-md bg-[#004798]"
                    >
                      Place order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SubNewsLatter />
    </div>
  );
}
