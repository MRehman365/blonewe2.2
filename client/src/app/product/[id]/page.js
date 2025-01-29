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
import img1 from "../../assets/image-1-13-450x450.png";
import img2 from "../../assets/image-1-15-450x450.png";
import { MdOutlineZoomOutMap } from "react-icons/md";
import Magnifier from "react-magnifier";
import SingleProductDiscription from "@/app/components/SingleProductDiscription";
import RelatedProduct from "@/app/components/RelatedProduct";
import SubNewsLatter from "@/app/components/SubNewsLatter";
import ProductDetail from "@/app/components/ProductDetail";
import prodcut1 from "../../assets/image-1-1-1-450x450.png";
import prodcut2 from "../../assets/image-1-10-450x450.png";
import prodcut3 from "../../assets/image-1-11-450x450.png";
import prodcut4 from "../../assets/image-1-13-450x450.png";
import prodcut5 from "../../assets/image-1-14-450x450.png";
import prodcut6 from "../../assets/image-1-15-450x450.png";
import prodcut7 from "../../assets/image-1-16-450x450.png";
import prodcut8 from "../../assets/image-1-17-450x450.png";
import prodcut9 from "../../assets/image-1-7-450x450.png";
import prodcut10 from "../../assets/image-1-17-450x450.png";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "@/store/reducer/productReducer";

export default function ProductInfo({ params }) {
  const { singleproduct } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const data = use(params);
  const myid = data;
  const id = myid.id;

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleOpenPopup = () => setIsPopupVisible(true);
  const handleClosePopup = () => setIsPopupVisible(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(img1);
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");
  const imageRef = useRef(null);
  // const [product, setProduct] = useState(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100; 
    setBackgroundPosition(`${x}% ${y}%`);
  };

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch]);

  const product = Array.isArray(singleproduct)
    ? singleproduct
    : singleproduct?.menu || [];

  const thumbnails = [img1, img2, img1];

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // const singleproduct = products.find((p) => p.id === id);

  return (
    <div className="max-w-7xl mx-auto px-2 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Images */}
        <div className="relative">
          <span className="absolute left-4 top-4 bg-red-500 text-white text-sm font-bold rounded-full flex justify-center items-center h-[50px] w-[50px]">
            {product?.discount}%
          </span>
          <button
            className="absolute right-4 top-4 bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-100"
            aria-label="Expand image"
          >
            <MdOutlineZoomOutMap className="h-4 w-4" />
          </button>
          <div
            className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] overflow-hidden mx-auto"
            onMouseMove={handleMouseMove}
          >
            {/* Main Image */}
            <Image
              ref={imageRef}
              src={selectedImage} // Update this to your image path
              alt="Hover to magnify"
              className="object-cover w-full h-full rounded-lg"
            />

            {/* Magnified Overlay */}
            <div
              className="absolute inset-0 pointer-events-none rounded-lg bg-cover bg-center"
              style={{
                backgroundImage: selectedImage
                  ? `url(${selectedImage})`
                  : "none",
                backgroundSize: "200%",
                backgroundPosition: backgroundPosition,
                backgroundRepeat: "no-repeat",
              }}
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
              <span className="text-gray-400">14 reviews</span>
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
              <button className="flex-1 bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-200">
                Add to cart
              </button>
            </div>
          </div>

          <button className="w-full py-2 px-4  transition duration-200 flex items-center justify-start">
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
