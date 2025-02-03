'use client'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { fetchCheckouts, deleteCheckout, updateCheckout } from '@/store/reducers/checkoutReducer';
import { AppDispatch, RootState } from '@/store/store';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Page = () => {
  const { checkouts } = useSelector((state: RootState) => state.checkout);
  const dispatch = useDispatch<AppDispatch>();

  const [editableOrderId, setEditableOrderId] = useState<string | null>(null);
  const [payment_status, setPaymentStatus] = useState<string>('');
  const [delivery_status, setDeliveryStatus] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch checkouts on component mount
  useEffect(() => {
    dispatch(fetchCheckouts());
  }, [dispatch]);

  const datacheck = Array.isArray(checkouts) ? checkouts : checkouts?.data || [];


  const handleUpdate = (orderId: string) => {
    setEditableOrderId(orderId);
    const order = datacheck.find((checkout) => checkout._id === orderId);
    if (order) {
      setPaymentStatus(order.payment_status);
      setDeliveryStatus(order.delivery_status);
    }
  };

  const handleSave = async(id: string) => {
    if (!payment_status && !delivery_status) {
      alert('Please update at least one field (Payment Status or Delivery Status).');
      return;
    }

    // Dispatch the update action
   await dispatch(updateCheckout({ id, payment_status, delivery_status }));
    setEditableOrderId(null);
    window.location.reload();
  };

  const handleDelete = async(orderId: string) => {
   await dispatch(deleteCheckout(orderId));
   dispatch(fetchCheckouts());

  };


  const handleView = (order) => {
    setSelectedOrder(order);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Orders" />
      <div className="min-h-screen bg-gray-100 dark:bg-boxdark p-6">
        <div className="max-w-6xl mx-auto bg-white dark:bg-boxdark p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Order List</h1>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 dark:bg-boxdark">
                <th className="border border-gray-200 px-4 py-2">Order ID</th>
                <th className="border border-gray-200 px-4 py-2">Name</th>
                <th className="border border-gray-200 px-4 py-2">Price</th>
                <th className="border border-gray-200 px-4 py-2">Payment Status</th>
                <th className="border border-gray-200 px-4 py-2">Delivery Status</th>
                <th className="border border-gray-200 px-4 py-2">Date</th>
                <th className="border border-gray-200 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {datacheck.length > 0 &&
              datacheck?.map((checkout, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:bg-boxdark">
                  <td className="border border-gray-200 px-4 py-2 text-sm">{checkout._id}</td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">{checkout.shippingInfo.name}</td>
                  <td className="border border-gray-200 px-4 py-2">
                  ₹ {checkout.price}</td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">
                    {editableOrderId === checkout._id ? (
                      <select
                        value={payment_status}
                        onChange={(e) => setPaymentStatus(e.target.value)}
                        className="border border-gray-200 px-2 py-1 text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                      </select>
                    ) : (
                      <span className={`${checkout.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {checkout.payment_status}
                      </span>
                    )}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">
                    {editableOrderId === checkout._id ? (
                      <select
                        value={delivery_status}
                        onChange={(e) => setDeliveryStatus(e.target.value)}
                        className="border border-gray-200 px-2 py-1 text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    ) : (
                      <span className={`${checkout.delivery_status === 'delivered' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {checkout.delivery_status}
                      </span>
                    )}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">{new Date(checkout.createdAt).toLocaleDateString()}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    {editableOrderId === checkout._id ? (
                      <button
                        onClick={() => handleSave(checkout._id)}
                        className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpdate(checkout._id)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded-md text-sm"
                      >
                        Update
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(checkout._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md text-sm ml-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleView(checkout)}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm ml-2"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <p className="mb-2"><strong>Name:</strong> {selectedOrder.shippingInfo.name}</p>
            <p className="mb-2"><strong>Address:</strong> {selectedOrder.shippingInfo.address}, {selectedOrder.shippingInfo.city}</p>
            <h3 className="text-lg font-semibold mt-4">Products:</h3>
            <ul>
              {selectedOrder.products.map((product, index) => (
                <li key={index} className="mb-1">
                  {product.productId.name} - Quantity: {product.quantity}
                </li>
              ))}
            </ul>
            <div className="flex justify-end mt-4">
              <button onClick={handlePrint} className="bg-green-500 text-white px-4 py-2 rounded-md mr-2">Print</button>
              <button onClick={() => setSelectedOrder(null)} className="bg-red-500 text-white px-4 py-2 rounded-md">Close</button>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default Page;