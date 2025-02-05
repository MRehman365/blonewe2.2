'use client';
import React, { useEffect, useState } from 'react';
import SubNewsLatter from '../components/SubNewsLatter';
import { useDispatch, useSelector } from 'react-redux';
import { getCheckoutById } from '@/store/reducer/checkoutReducer';

const Page = () => {
  const { checkout } = useSelector((state) => state.checkout);
  const dispatch = useDispatch();
  const [orderId, setOrderId] = useState('');
  const [shippingStatus, setShippingStatus] = useState(null);
  const [error, setError] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  const id = localStorage.getItem('userid');

  useEffect(() => {
    dispatch(getCheckoutById(id));
  }, [dispatch]);

  const history = Array.isArray(checkout) ? checkout : checkout?.data || [];

  const handleTrackOrder = (e) => {
    e.preventDefault();

    if (!orderId) {
      setError('Please enter an Order ID.');
      return;
    }

    const order = history.find((item) => item._id === orderId);

    if (order) {
      setShippingStatus(order.delivery_status);
      setOrderDetails(order); // Set the order details
      setError(null);
    } else {
      setError('Order not found. Please check your Order ID.');
      setShippingStatus(null);
      setOrderDetails(null); // Clear order details if not found
    }
  };

  return (
    <div>
      <div className="mx-auto px-4 py-12 max-w-2xl">
        <div className="p-2">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold mb-4">Track your order.</h1>
            <p className="text-gray-500">
              To track your order please enter your Order ID in the box below and press the
              "Track" button. This was given to you on your receipt and in the confirmation
              email you should have received.
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleTrackOrder}>
            <div>
              <label htmlFor="orderId" className="block text-sm font-medium text-gray-500 text-center mb-1">
                Order ID
              </label>
              <input
                type="text"
                id="orderId"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 bg-[#ffffff0c] rounded-md shadow-sm text-center focus:outline-none focus:ring-1 focus:ring-[#004798] focus:border-[#004798]"
                placeholder="Found in your order confirmation email."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#004798] text-white py-2 px-4 rounded-md"
            >
              Track
            </button>
          </form>

          {shippingStatus && (
            <div className="mt-4 text-center">
              <p className="text-green-600 font-semibold">
                Shipping Status: {shippingStatus}
              </p>
            </div>
          )}

          {error && (
            <div className="mt-4 text-center">
              <p className="text-red-600 font-semibold">{error}</p>
            </div>
          )}

          {orderDetails && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
              <div className="space-y-4">
                {orderDetails.products.map((product, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.productId.image[0]}
                        alt={product.productId.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold">{product.productId.name}</p>
                        <p className="text-gray-500">Quantity: {product.quantity}</p>
                        <p className="text-gray-500">Price: ₹{product.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-8 mt-16 text-center">
          <div>
            <h3 className="text-3xl md:text-4xl font-semibold mb-2">2500+</h3>
            <p className="text-gray-500">
              Aenean condimentum cursus aliquet. Aliquam eget pulvinar lorem.
            </p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-semibold mb-2">35K</h3>
            <p className="text-gray-500">
              Aenean condimentum cursus aliquet. Aliquam eget pulvinar lorem.
            </p>
          </div>
        </div>
      </div>
      <SubNewsLatter />
    </div>
  );
};

export default Page;