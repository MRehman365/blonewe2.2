"use client";

import Image from "next/image";
import { useState } from "react";
import { FaFacebookF, FaPinterest, FaTwitter } from "react-icons/fa";
import {
  FiLayout,
  FiPackage,
  FiDownload,
  FiMapPin,
  FiUser,
  FiHeart,
  FiLogOut,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import img1 from "../assets/image-1-1-1-450x450.png";

const products = [
  {
    id: "1",
    name: "ELECTROLUX EW6S226SUI",
    image: img1,
    originalPrice: 250.0,
    salePrice: 190.0,
    dateAdded: "November 27, 2024",
    inStock: true,
  },
  {
    id: "2",
    name: "Huawei Watch GT 2 Pro Titanium 47mm",
    image: img1,
    originalPrice: 99.99,
    salePrice: 79.99,
    dateAdded: "November 27, 2024",
    inStock: true,
  },
  {
    id: "3",
    name: "HomePod mini - Space Gray",
    image: img1,
    originalPrice: 359.99,
    salePrice: 249.99,
    dateAdded: "November 27, 2024",
    inStock: true,
  },
];

const navigation = [
  { name: "Dashboard", href: "#dashboard", icon: FiLayout },
  { name: "Orders", href: "#orders", icon: FiPackage },
  { name: "Downloads", href: "#downloads", icon: FiDownload },
  { name: "Addresses", href: "#addresses", icon: FiMapPin },
  { name: "Account details", href: "#account-details", icon: FiUser },
  { name: "Wishlist", href: "#wishlist", icon: FiHeart },
  { name: "Log out", href: "#logout", icon: FiLogOut },
];

export default function AccountPage() {
  const [currentSection, setCurrentSection] = useState("#dashboard");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(null); 

  const handleEditClick = (type) => {
    setIsEditing(type);
  };

  const closeForm = () => {
    setIsEditing(null);
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="grid grid-cols-1 p-2 md:grid-cols-4 gap-10">
        <aside className="col-span-1">
          <h1 className="text-2xl font-semibold mb-8">My Account</h1>
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              RN
            </div>
            <div>
              <p className="text-sm text-gray-500">Welcome back</p>
              <p className="font-medium">rehman</p>
            </div>
          </div>
          <nav className="space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentSection(item.href);
                }}
                className={`flex items-center gap-3 p-3 text-[15px] transition-colors border-b border-gray-300 text-gray-500 ${
                  currentSection === item.href
                    ? "bg-[#ffffff0f] font-medium"
                    : "hover:bg-[#ffffff0f]"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </a>
            ))}
          </nav>
        </aside>
        <main className="col-span-3">
          {currentSection === "#dashboard" && (
            <div className="max-w-4xl mx-auto p-6">
              {/* Greeting Section */}
              <div className="mb-6">
                <p className="text-base">
                  Hello <span className="font-bold">rehman</span> (not rehman?{" "}
                  <a href="#" className="text-blue-400 hover:underline">
                    Log out
                  </a>
                  )
                </p>
                <p className="text-gray-500 mt-2">
                  From your account dashboard you can view your{" "}
                  <a href="#" className="text-blue-400 hover:underline">
                    recent orders
                  </a>
                  , manage your{" "}
                  <a href="#" className="text-blue-400 hover:underline">
                    shipping and billing addresses
                  </a>
                  , and{" "}
                  <a href="#" className="text-blue-400 hover:underline">
                    edit your password and account details
                  </a>
                  .
                </p>
              </div>

              {/* Vendor Section */}
              <div className="border p-4 rounded-md shadow-sm flex flex-col items-center md:flex-row justify-between">
              <div>
                <h3 className="text-base font-semibold mb-2">Become a Vendor</h3>
                <p className="text-gray-500 mb-4 text-sm">
                  Vendors can sell products and manage a store with a vendor
                  dashboard.
                </p>
                </div>
                <div>
                <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
                  Become a Vendor
                </button>
                </div>
              </div>
            </div>
          )}

          {currentSection === "#orders" && (
            <div>
              <h1 className="text-2xl font-semibold mb-8">Orders</h1>
              <table className="w-full shadow rounded-lg">
                <thead>
                  <tr className="text-left bg-[#ffffff0d]">
                    <th className="p-3">Order</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={5} className="p-3 text-center text-gray-500">
                      No order has been made yet.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {currentSection === "#account-details" && (
            <div>
              <form className="space-y-6 max-w-2xl">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-500"
                    >
                      First name *
                    </label>
                    <input
                      id="firstName"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 border shadow-sm p-2 bg-[#ffffff03] focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-500"
                    >
                      Last name *
                    </label>
                    <input
                      id="lastName"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 border shadow-sm p-2 bg-[#ffffff03] focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="displayName"
                    className="block text-sm font-medium text-gray-500"
                  >
                    Display name *
                  </label>
                  <input
                    id="displayName"
                    defaultValue="rehman"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 border shadow-sm p-2 bg-[#ffffff03] focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <p className="text-sm text-gray-500">
                    This will be how your name will be displayed in the account
                    section and in reviews
                  </p>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-500"
                  >
                    Email address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    defaultValue="rehmanmuhammd704@gmail.com"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 border shadow-sm p-2 bg-[#ffffff03] focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>

                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Password change</h2>
                  <div className="space-y-2">
                    <label
                      htmlFor="currentPassword"
                      className="block text-sm font-medium text-gray-500"
                    >
                      Current password (leave blank to leave unchanged)
                    </label>
                    <div className="relative">
                      <input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        className="mt-1 block w-full rounded-md border-gray-300 border shadow-sm p-2 bg-[#ffffff03] focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      >
                        {showCurrentPassword ? (
                          <FiEyeOff className="h-5 w-5 text-gray-500" />
                        ) : (
                          <FiEye className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-gray-500"
                    >
                      New password (leave blank to leave unchanged)
                    </label>
                    <div className="relative">
                      <input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        className="mt-1 block w-full rounded-md border-gray-300 border shadow-sm p-2 bg-[#ffffff03] focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <FiEyeOff className="h-5 w-5 text-gray-500" />
                        ) : (
                          <FiEye className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-500"
                    >
                      Confirm new password
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        className="mt-1 block w-full rounded-md border-gray-300 border shadow-sm p-2 bg-[#ffffff03] focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <FiEyeOff className="h-5 w-5 text-gray-500" />
                        ) : (
                          <FiEye className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save changes
                </button>
              </form>
            </div>
          )}

          {(currentSection === "#downloads" ) && (
            <div>
              <h1 className="text-2xl font-semibold mb-8">
                {navigation.find((item) => item.href === currentSection).name}
              </h1>
              <p>No download available yet.</p>
            </div>
          )}

          {currentSection === "#addresses" && (
            <div className="w-full mx-auto p-6">
      <p className="text-gray-700 mb-6">
        The following addresses will be used on the checkout page by default.
      </p>

      <div className="grid grid-cols-2 gap-6">
        {/* Billing Address */}
        <div>
          <h3 className="font-semibold mb-2">Billing address</h3>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => handleEditClick("billing")}
          >
            Edit Billing address
          </button>
          {!isEditing || isEditing !== "billing" ? (
            <p className="text-gray-700 mt-2">
              M Rehman
              <br />
              Near DHQ
              <br />
              Lodhran
              <br />
              Punjab
              <br />
              59320
              <br />
              Pakistan
            </p>
          ) : (
            <div className="mt-4">
              <h4 className="font-semibold">Edit Billing Address</h4>
              <form>
                <input
                  className="border p-2 w-full mb-2 rounded"
                  placeholder="Name"
                />
                <input
                  className="border p-2 w-full mb-2 rounded"
                  placeholder="Address"
                />
                <input
                  className="border p-2 w-full mb-2 rounded"
                  placeholder="City"
                />
                <input
                  className="border p-2 w-full mb-2 rounded"
                  placeholder="State"
                />
                <input
                  className="border p-2 w-full mb-2 rounded"
                  placeholder="Zip Code"
                />
                <input
                  className="border p-2 w-full mb-2 rounded"
                  placeholder="Country"
                />
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={closeForm}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Shipping Address */}
        <div>
          <h3 className="font-semibold mb-2">Shipping address</h3>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => handleEditClick("shipping")}
          >
            Edit Shipping address
          </button>
          {!isEditing || isEditing !== "shipping" ? (
            <p className="text-gray-700 mt-2">
              M Rehman
              <br />
              Near DHQ
              <br />
              Lodhran
              <br />
              Punjab
              <br />
              59320
              <br />
              Pakistan
            </p>
          ) : (
            <div className="mt-4">
              <h4 className="font-semibold">Edit Shipping Address</h4>
              <form>
                <input
                  className="border p-2 w-full mb-2 rounded"
                  placeholder="Name"
                />
                <input
                  className="border p-2 w-full mb-2 rounded"
                  placeholder="Address"
                />
                <input
                  className="border p-2 w-full mb-2 rounded"
                  placeholder="City"
                />
                <input
                  className="border p-2 w-full mb-2 rounded"
                  placeholder="State"
                />
                <input
                  className="border p-2 w-full mb-2 rounded"
                  placeholder="Zip Code"
                />
                <input
                  className="border p-2 w-full mb-2 rounded"
                  placeholder="Country"
                />
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={closeForm}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
          )}

          {currentSection === "#wishlist" && (
            <div className="max-w-7xl mx-auto p-4 space-y-6 mt-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b text-sm">
                    <th className="text-left py-2">Product</th>
                    <th className="text-left py-2 hidden md:table-cell">
                      Price
                    </th>
                    <th className="text-left py-2 hidden md:table-cell">
                      Date Added
                    </th>
                    <th className="text-left py-2 hidden md:table-cell">
                      Stock
                    </th>
                    <th className="text-left py-2">Add to Cart</th>
                    <th className="w-[50px] hidden md:table-cell">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b">
                      {/* Product name with image */}
                      <td className="py-4 flex items-center gap-3">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded"
                        />
                        <span className="text-sm">{product.name}</span>
                      </td>

                      {/* Price */}
                      <td className="py-4 hidden md:table-cell text-sm">
                        <div>
                          <span className="line-through text-gray-500 mr-2">
                          ₹{product.originalPrice.toFixed(2)}
                          </span>
                          <span className="font-medium">
                          ₹{product.salePrice.toFixed(2)}
                          </span>
                        </div>
                      </td>

                      {/* Date Added */}
                      <td className="py-4 hidden md:table-cell text-sm">
                        {product.dateAdded}
                      </td>

                      {/* Stock */}
                      <td className="py-4 hidden md:table-cell text-sm">
                        <span
                          className={
                            product.inStock ? "text-green-600" : "text-red-600"
                          }
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>

                      {/* Add to Cart */}
                      <td className="py-4">
                        <button className="px-2 py-2 bg-green-500 text-[12px] text-white rounded-md">
                          Add to Cart
                        </button>
                      </td>

                      {/* Remove button */}
                      <td className="py-4 hidden md:table-cell">
                        <button className="text-white bg-red-500 rounded-full text-sm">
                          <IoCloseOutline size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex items-center gap-2">
                <span>Share on:</span>
                <div className="flex gap-2">
                  <button className="p-2 border rounded-full hover:bg-[#004798] hover:text-white">
                    <FaFacebookF />
                  </button>
                  <button className="p-2 border rounded-full hover:bg-[#004798] hover:text-white">
                    <FaTwitter />
                  </button>
                  <button className="p-2 border rounded-full hover:bg-[#004798] hover:text-white">
                    <FaPinterest />
                  </button>
                  <button className="p-2 border rounded-full hover:bg-[#004798] hover:text-white">
                    <MdEmail />
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentSection === "#logout" && (
            <div>
              <h1 className="text-2xl font-semibold mb-8">Log out</h1>
              <p>Are you sure you want to log out?</p>
              <button className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Log out
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
