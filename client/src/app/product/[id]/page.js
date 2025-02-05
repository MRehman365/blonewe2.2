"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  FaExpandArrowsAlt,
  FaHeart,
  FaMinus,
  FaPlus,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaRedditAlien,
  FaWhatsapp,
} from "react-icons/fa";
import { use } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdOutlineZoomOutMap } from "react-icons/md";
import Magnifier from "react-magnifier"; // Import the Magnifier component
import SingleProductDiscription from "@/app/components/SingleProductDiscription";
import RelatedProduct from "@/app/components/RelatedProduct";
import SubNewsLatter from "@/app/components/SubNewsLatter";
import ProductDetail from "@/app/components/ProductDetail";
import { useDispatch, useSelector } from "react-redux";
import { get_reviews, getProductById } from "@/store/reducer/productReducer";
import { addToCart, getCart } from "@/store/reducer/cartReducer";
import { addToWishlist, getWishlist } from "@/store/reducer/wishlistReducer";
import { toast } from "react-toast";

export default function ProductInfo({ params }) {
  const { singleproduct, reviews, } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const data = use(params);
  const myid = data;
  const id = myid.id;
  const userId = localStorage.getItem("userid");

  const product = Array.isArray(singleproduct)
    ? singleproduct
    : singleproduct?.menu || [];
  const pImages = Array.isArray(product) ? product : product.image || [];

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const handleOpenPopup = () => setIsPopupVisible(true);
  const handleClosePopup = () => setIsPopupVisible(false);
  const [quantity, setQuantity] = useState(1);

  // Set the default image (index 0) as the selected image
  const [selectedImage, setSelectedImage] = useState(
    pImages.length > 0 ? pImages[0] : "https://i.ibb.co/qCqX44B/image-1-16-450x450.png"
  );

  // Reset selectedImage when product changes
  useEffect(() => {
    if (pImages.length > 0) {
      setSelectedImage(pImages[0]); // Set the first image as the selected image
    } else {
      setSelectedImage("https://i.ibb.co/qCqX44B/image-1-16-450x450.png"); // Fallback to a placeholder image
    }
  }, [product]); // Watch for changes in the product data

  const thumbnails = pImages.length > 0 ? pImages.slice(0, 3) : [];

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handlewish = async (productId) => {
    await dispatch(addToWishlist({ userId, productId })).then((res) => {
      if (res?.payload?.success) {
        toast.success(res.payload.message);
      } else {
        toast.error(res.payload.message);
      }
    });
    dispatch(getWishlist(userId));
  };

  const handlecart = async (productId) => {
    await dispatch(addToCart({ userId, productId, quantity })).then((res) => {
      if (res?.payload?.success) {
        toast.success(res.payload.message);
      } else {
        toast.error(res.payload.message);
      }
    });
    dispatch(getCart(userId));
  };

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]); 

  useEffect(() => {
    if (id) {
      dispatch(get_reviews({ productId: id }));
    }
  }, [dispatch, id]);

  const myreview = Array.isArray(reviews) ? reviews : reviews.getAll || [];

  return (
    <div className="max-w-7xl mx-auto px-2 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Images */}
        <div className="relative">
          <span className="absolute left-4 z-20 top-4 bg-red-500 text-white text-sm font-bold rounded-full flex justify-center items-center h-[50px] w-[50px]">
            {product?.discount}%
          </span>
          <button
            className="absolute right-4 top-4 bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-100"
            aria-label="Expand image"
          >
            <MdOutlineZoomOutMap className="h-4 w-4" />
          </button>
          <div className="relative w-full h-[400px] md:w-[600px] md:h-[600px] overflow-hidden mx-auto">
            {/* Main Image with Magnifier */}
            <Magnifier
              src={selectedImage}
              width={600}
              height={600}
              mgWidth={200}
              mgHeight={200}
              zoomFactor={1.5}
              className="rounded-lg"
            />
          </div>
          <div className="mt-4 flex gap-4">
            {thumbnails.map((thumb, idx) => (
              <Image
                key={idx}
                src={thumb}
                alt={`Thumbnail ${idx + 1}`}
                width={100}
                height={100}
                className="cursor-pointer rounded-md border hover:border-gray-400"
                onClick={() => setSelectedImage(thumb)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold">{product?.name}</h1>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex">
                {[1, 2, 3, 4].map((star) => (
                  <AiFillStar key={star} className="text-yellow-400 w-5 h-5" />
                ))}
                <AiOutlineStar className="text-gray-300 w-5 h-5" />
              </div>
              <span className="text-gray-400">{myreview.length} reviews</span>
              <span className="">
                <span className="text-gray-400">Store:</span> groci
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-lg text-gray-500 line-through">
              ₹{product?.price}
            </span>
            <span className="text-3xl font-bold text-red-500">
              ₹{product?.price - (product?.price * product?.discount) / 100}
            </span>
          </div>

          <div className="inline-block rounded-md bg-green-100 px-3 py-1 text-sm text-green-600">
            In Stock
          </div>

          <p className="text-gray-500 text-sm">
            {/* {product?.description[0]} */}
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-md border">
              <button
                className="px-3 py-3"
                onClick={decrementQuantity}
                aria-label="Decrease quantity"
              >
                <FaMinus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                className="px-3 py-3"
                onClick={incrementQuantity}
                aria-label="Increase quantity"
              >
                <FaPlus className="h-4 w-4" />
              </button>
            </div>
            <div>
              <button
                onClick={() => handlecart(product._id)}
                className="flex-1 bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-200"
              >
                Add to cart
              </button>
            </div>
          </div>

          <button
            onClick={() => handlewish(product._id)}
            className="w-full py-2 px-4  transition duration-200 flex items-center justify-start"
          >
            <FaHeart className="mr-2 h-4 w-4" />
            Add to wishlist
            <span className="ml-2 text-gray-400">
              33 people favorited this product
            </span>
          </button>

          <div className=" border-t border-gray-200 rounded-lg p-4 shadow-sm">
            <ul className="space-y-3">
              {Array.isArray(product?.points) ? (
                product.points.map((point, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {point}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No points available</li>
              )}
            </ul>
          </div>

          <div className="space-y-2 text-sm">
            <div>
              <span className="font-semibold">SKU:</span> {product?.sku}
            </div>
            <div>
              <span className="font-semibold">Categories:</span>{" "}
              <span className="text-gray-500">{product?.category}</span>
            </div>
            <div>
              <span className="font-semibold">Tags:</span>{" "}
              <span className="text-gray-500">{product?.tags}</span>
            </div>
          </div>

          <div className="flex gap-2">
            {[
              FaFacebookF,
              FaTwitter,
              FaLinkedinIn,
              FaRedditAlien,
              FaWhatsapp,
            ].map((Icon, index) => (
              <button
                key={index}
                className="p-2 border border-gray-300 rounded-full hover:text-blue-700 hover:border-blue-700 transition duration-200"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>
      </div>
      <SingleProductDiscription handleview={handleOpenPopup} id={id} />
      <RelatedProduct handleview={handleOpenPopup} />
      <SubNewsLatter />

      {isPopupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-4xl rounded-lg shadow-lg">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={handleClosePopup}
            >
              <span className="text-2xl md:text-4xl font-bold">&times;</span>
            </button>

            <ProductDetail />
          </div>
        </div>
      )}
    </div>
  );
}