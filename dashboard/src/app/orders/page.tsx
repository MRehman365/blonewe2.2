import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React from 'react'

const orders = [
  {
    id: "ORD001",
    name: "Product A",
    price: "$20",
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    date: "2025-01-18",
  },
  {
    id: "ORD002",
    name: "Product B",
    price: "$15",
    paymentStatus: "Pending",
    orderStatus: "Processing",
    date: "2025-01-17",
  },
  // Add more orders as needed
];

const Page = () => {
  return (
    <DefaultLayout>
           <Breadcrumb pageName="Orders" />
           <div className="min-h-screen bg-gray-100 dark:bg-boxdark p-6">
      <div className="max-w-6xl mx-auto bg-white dark:bg-boxdark  p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Order List</h1>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 dark:bg-boxdark">
              <th className="border border-gray-200 px-4 py-2">Order ID</th>
              <th className="border border-gray-200 px-4 py-2">Name</th>
              <th className="border border-gray-200 px-4 py-2">Price</th>
              <th className="border border-gray-200 px-4 py-2">Payment Status</th>
              <th className="border border-gray-200 px-4 py-2">Order Status</th>
              <th className="border border-gray-200 px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 dark:bg-boxdark">
                <td className="border border-gray-200 px-4 py-2">{order.id}</td>
                <td className="border border-gray-200 px-4 py-2">{order.name}</td>
                <td className="border border-gray-200 px-4 py-2">{order.price}</td>
                <td
                  className={`border border-gray-200 px-4 py-2 ${
                    order.paymentStatus === "Paid"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.paymentStatus}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {order.orderStatus}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {order.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </DefaultLayout>
  )
}

export default Page
