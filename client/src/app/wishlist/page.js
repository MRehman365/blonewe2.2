'use client'
import React, { useEffect } from 'react';
import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaPinterestP } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { IoCloseOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWishlist, getWishlist } from '@/store/reducer/wishlistReducer';
import { toast } from 'react-toast';
import { addToCart } from '@/store/reducer/cartReducer';

const Wishlist = () => {
const { wishlistproduct } = useSelector((state) => state.wishlist);
const dispatch = useDispatch();

const userId = localStorage.getItem('userid');

useEffect(() => {
  dispatch(getWishlist(userId));
},[dispatch])

const wish = Array.isArray(wishlistproduct) ? wishlistproduct : wishlistproduct?.wishlist || [];

const deleteWish = async (id) => {
  await dispatch(deleteWishlist(id)).then((res) => {
    if (res?.payload?.success) {
      toast.success(res.payload.message);
    } else {
      toast.error(res.payload.message);
    }
  });
  dispatch(getWishlist(userId))
}

const handlecart = (productId) => {
  dispatch(addToCart({ userId, productId})).then((res) => {
    if (res?.payload?.success) {
      toast.success(res.payload.message);
    } else {
      toast.error(res.payload.message);
    }
  });
 } 


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
          {wish.map((product, i) => (
            <tr key={i} className="border-b">
              <td className="py-4 flex items-center gap-3">
                <Image
                  src={product.productId?.image[0]}
                  alt={product.productId?.name}
                  width={60}
                  height={60}
                  sizes='60'
                  className="rounded"
                />
                <span>{product.productId?.name}</span>
              </td>

              {/* Price */}
              <td className="py-4 hidden md:table-cell">
                <div>
                  <span className="line-through  mr-2 text-sm text-red-400">₹{product.productId?.price.toFixed(2)}</span>
                  <span className="font-medium">₹{(product.productId?.price * (1 - product.productId?.discount / 100)).toFixed(2)}</span>
                </div>
              </td>

              {/* Date Added */}
              <td className="py-4 hidden md:table-cell">{product.productId?.createdAt}</td>

              {/* Stock */}
              <td className="py-4 hidden md:table-cell">
                <span className={product.productId?.isAvailable ? "text-green-600" : "text-red-600"}>
                  {product.productId?.isAvailable ? "In Stock" : "Out of Stock"}
                </span>
              </td>

              {/* Add to Cart */}
              <td className="py-4">
                <button onClick={() => handlecart(product.productId?._id)} className="px-2 py-2 bg-green-500 text-sm text-white rounded-md">
                  Add to Cart
                </button>
              </td>

              {/* Remove button */}
              <td className="py-4 hidden md:table-cell">
                <button onClick={() => deleteWish(product._id)} className="text-white bg-red-500 rounded-full">
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
