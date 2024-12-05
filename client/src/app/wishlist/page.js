import React from 'react';
import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaPinterestP } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { IoCloseOutline } from 'react-icons/io5';
import img1 from '../assets/image-1-1-1-450x450.png'

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

const Wishlist = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6 mt-8">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Product</th>
            <th className="text-left py-2 hidden md:table-cell">Price</th>
            <th className="text-left py-2 hidden md:table-cell">Date Added</th>
            <th className="text-left py-2 hidden md:table-cell">Stock</th>
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
                  width={60}
                  height={60}
                  className="rounded"
                />
                <span>{product.name}</span>
              </td>

              {/* Price */}
              <td className="py-4 hidden md:table-cell">
                <div>
                  <span className="line-through text-gray-500 mr-2">₹{product.originalPrice.toFixed(2)}</span>
                  <span className="font-medium">₹{product.salePrice.toFixed(2)}</span>
                </div>
              </td>

              {/* Date Added */}
              <td className="py-4 hidden md:table-cell">{product.dateAdded}</td>

              {/* Stock */}
              <td className="py-4 hidden md:table-cell">
                <span className={product.inStock ? "text-green-600" : "text-red-600"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </td>

              {/* Add to Cart */}
              <td className="py-4">
                <button className="px-2 py-2 bg-green-500 text-sm text-white rounded-md">
                  Add to Cart
                </button>
              </td>

              {/* Remove button */}
              <td className="py-4 hidden md:table-cell">
                <button className="text-white bg-red-500 rounded-full">
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
            <FaPinterestP />
          </button>
          <button className="p-2 border rounded-full hover:bg-[#004798] hover:text-white">
            <MdEmail />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
