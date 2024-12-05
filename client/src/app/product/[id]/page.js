"use client";

import { useState, useRef } from "react";
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

export default function ProductInfo({params}) {
  const data = use(params)
  const { id } = data;

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleOpenPopup = () => setIsPopupVisible(true);
  const handleClosePopup = () => setIsPopupVisible(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(img1);
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");
  const imageRef = useRef(null);
  const [product, setProduct] = useState(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100; // Calculate horizontal position
    const y = ((e.clientY - top) / height) * 100; // Calculate vertical position
    setBackgroundPosition(`${x}% ${y}%`);
  };

  const thumbnails = [img1, img2, img1];

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const products = [
    {
      id: "1",
      name: "Huawei Watch GT 2 Pro Titanium 47mm",
      discription: [
        "Fusce sapien urna, tristique non sapien nec, rutrum fringilla eros. Etiam accumsan odio eget tempus consectetur. Aliquam et sapien nulla. Suspendisse lobortis leo ante, imperdiet tristique magna tristique eu. Nullam ultrices vulputate odio, eu iaculis nulla congue quis.",
        "Morbi ut sapien vitae odio accumsan gravida. Morbi vitae erat auctor, eleifend nunc a, lobortis neque. Praesent aliquam dignissim viverra. Maecenas lacus odio, feugiat eu nunc sit amet, maximus sagittis dolor. Vivamus nisi sapien, elementum sit amet eros sit amet, ultricies cursus ipsum. Sed consequat luctus ligula. Curabitur laoreet rhoncus blandit. Aenean vel diam ut arcu pharetra dignissim ut sed leo. Vivamus faucibus, ipsum in vestibulum vulputate, lorem orci convallis quam, sit amet consequat nulla felis pharetra lacus. Duis semper erat mauris, sed egestas purus commodo vel.",
      ],
      points: [
        "Delivered today (order Mon-Fri before 12:00, delivery between 17:00 and 22:00)",
        "Including shipping costs, sent by klbtheme.com",
        "Pick up at a klbtheme.com collection point is possible",
        "30 days to change your mind and free returns",
        "Day and night customer service"
      ],
      category: "Electronics, Watches",
      tags: "Huawei, watches",
      sku: "K1G7W3Q412",
      price: 79.99,
      originalPrice: 99.99,
      discount: 21,
      rating: 4.33,
      reviews: 3,
      image: prodcut1,
      store: "graci",
    },
    {
      id: "2",
      name: "HomePod mini — Space Gray",
      price: 249.99,
      originalPrice: 359.99,
      discount: 31,
      rating: 4.33,
      reviews: 3,
      image: prodcut2,
      discription: [
        "Fusce sapien urna, tristique non sapien nec, rutrum fringilla eros. Etiam accumsan odio eget tempus consectetur. Aliquam et sapien nulla. Suspendisse lobortis leo ante, imperdiet tristique magna tristique eu. Nullam ultrices vulputate odio, eu iaculis nulla congue quis.",
        "Morbi ut sapien vitae odio accumsan gravida. Morbi vitae erat auctor, eleifend nunc a, lobortis neque. Praesent aliquam dignissim viverra. Maecenas lacus odio, feugiat eu nunc sit amet, maximus sagittis dolor. Vivamus nisi sapien, elementum sit amet eros sit amet, ultricies cursus ipsum. Sed consequat luctus ligula. Curabitur laoreet rhoncus blandit. Aenean vel diam ut arcu pharetra dignissim ut sed leo. Vivamus faucibus, ipsum in vestibulum vulputate, lorem orci convallis quam, sit amet consequat nulla felis pharetra lacus. Duis semper erat mauris, sed egestas purus commodo vel.",
      ],
      points: [
        "Delivered today (order Mon-Fri before 12:00, delivery between 17:00 and 22:00)",
        "Including shipping costs, sent by klbtheme.com",
        "Pick up at a klbtheme.com collection point is possible",
        "30 days to change your mind and free returns",
        "Day and night customer service"
      ],
      category: "Electronics, Watches",
      tags: "Huawei, watches",
      sku: "K1G7W3Q412",
    },
    {
      id: "3",
      name: "ELECTROLUX EW6S226SUI",
      price: 190.0,
      originalPrice: 250.0,
      discount: 24,
      rating: 3.33,
      reviews: 3,
      image: prodcut3,
      discription: [
        "Fusce sapien urna, tristique non sapien nec, rutrum fringilla eros. Etiam accumsan odio eget tempus consectetur. Aliquam et sapien nulla. Suspendisse lobortis leo ante, imperdiet tristique magna tristique eu. Nullam ultrices vulputate odio, eu iaculis nulla congue quis.",
        "Morbi ut sapien vitae odio accumsan gravida. Morbi vitae erat auctor, eleifend nunc a, lobortis neque. Praesent aliquam dignissim viverra. Maecenas lacus odio, feugiat eu nunc sit amet, maximus sagittis dolor. Vivamus nisi sapien, elementum sit amet eros sit amet, ultricies cursus ipsum. Sed consequat luctus ligula. Curabitur laoreet rhoncus blandit. Aenean vel diam ut arcu pharetra dignissim ut sed leo. Vivamus faucibus, ipsum in vestibulum vulputate, lorem orci convallis quam, sit amet consequat nulla felis pharetra lacus. Duis semper erat mauris, sed egestas purus commodo vel.",
      ],
      points: [
        "Delivered today (order Mon-Fri before 12:00, delivery between 17:00 and 22:00)",
        "Including shipping costs, sent by klbtheme.com",
        "Pick up at a klbtheme.com collection point is possible",
        "30 days to change your mind and free returns",
        "Day and night customer service"
      ],
      category: "Electronics, Watches",
      tags: "Huawei, watches",
      sku: "K1G7W3Q412",
    },
    {
      id: "4",
      name: "ecobee 3 Lite Smart Thermostat 2.0, No Hub Required",
      price: 130.0,
      originalPrice: 142.0,
      discount: 9,
      rating: 3.67,
      reviews: 3,
      image: prodcut4,
      discription: [
        "Fusce sapien urna, tristique non sapien nec, rutrum fringilla eros. Etiam accumsan odio eget tempus consectetur. Aliquam et sapien nulla. Suspendisse lobortis leo ante, imperdiet tristique magna tristique eu. Nullam ultrices vulputate odio, eu iaculis nulla congue quis.",
        "Morbi ut sapien vitae odio accumsan gravida. Morbi vitae erat auctor, eleifend nunc a, lobortis neque. Praesent aliquam dignissim viverra. Maecenas lacus odio, feugiat eu nunc sit amet, maximus sagittis dolor. Vivamus nisi sapien, elementum sit amet eros sit amet, ultricies cursus ipsum. Sed consequat luctus ligula. Curabitur laoreet rhoncus blandit. Aenean vel diam ut arcu pharetra dignissim ut sed leo. Vivamus faucibus, ipsum in vestibulum vulputate, lorem orci convallis quam, sit amet consequat nulla felis pharetra lacus. Duis semper erat mauris, sed egestas purus commodo vel.",
      ],
      points: [
        "Delivered today (order Mon-Fri before 12:00, delivery between 17:00 and 22:00)",
        "Including shipping costs, sent by klbtheme.com",
        "Pick up at a klbtheme.com collection point is possible",
        "30 days to change your mind and free returns",
        "Day and night customer service"
      ],
      category: "Electronics, Watches",
      tags: "Huawei, watches",
      sku: "K1G7W3Q412",
    },
    {
      id: "5",
      name: "Canon EOS R10 RF-S 18-45 IS STM",
      price: 850.0,
      originalPrice: 1099.0,
      discount: 23,
      rating: 4.0,
      reviews: 3,
      image: prodcut5,
      discription: [
        "Fusce sapien urna, tristique non sapien nec, rutrum fringilla eros. Etiam accumsan odio eget tempus consectetur. Aliquam et sapien nulla. Suspendisse lobortis leo ante, imperdiet tristique magna tristique eu. Nullam ultrices vulputate odio, eu iaculis nulla congue quis.",
        "Morbi ut sapien vitae odio accumsan gravida. Morbi vitae erat auctor, eleifend nunc a, lobortis neque. Praesent aliquam dignissim viverra. Maecenas lacus odio, feugiat eu nunc sit amet, maximus sagittis dolor. Vivamus nisi sapien, elementum sit amet eros sit amet, ultricies cursus ipsum. Sed consequat luctus ligula. Curabitur laoreet rhoncus blandit. Aenean vel diam ut arcu pharetra dignissim ut sed leo. Vivamus faucibus, ipsum in vestibulum vulputate, lorem orci convallis quam, sit amet consequat nulla felis pharetra lacus. Duis semper erat mauris, sed egestas purus commodo vel.",
      ],
      points: [
        "Delivered today (order Mon-Fri before 12:00, delivery between 17:00 and 22:00)",
        "Including shipping costs, sent by klbtheme.com",
        "Pick up at a klbtheme.com collection point is possible",
        "30 days to change your mind and free returns",
        "Day and night customer service"
      ],
      category: "Electronics, Watches",
      tags: "Huawei, watches",
      sku: "K1G7W3Q412",
    },
    {
      id: "6",
      name: "Huawei Watch GT 2 Pro Titanium 47mm",
      price: 79.99,
      originalPrice: 99.99,
      discount: 21,
      rating: 4.33,
      reviews: 3,
      image: prodcut6,
      store: "graci",
      discription: [
        "Fusce sapien urna, tristique non sapien nec, rutrum fringilla eros. Etiam accumsan odio eget tempus consectetur. Aliquam et sapien nulla. Suspendisse lobortis leo ante, imperdiet tristique magna tristique eu. Nullam ultrices vulputate odio, eu iaculis nulla congue quis.",
        "Morbi ut sapien vitae odio accumsan gravida. Morbi vitae erat auctor, eleifend nunc a, lobortis neque. Praesent aliquam dignissim viverra. Maecenas lacus odio, feugiat eu nunc sit amet, maximus sagittis dolor. Vivamus nisi sapien, elementum sit amet eros sit amet, ultricies cursus ipsum. Sed consequat luctus ligula. Curabitur laoreet rhoncus blandit. Aenean vel diam ut arcu pharetra dignissim ut sed leo. Vivamus faucibus, ipsum in vestibulum vulputate, lorem orci convallis quam, sit amet consequat nulla felis pharetra lacus. Duis semper erat mauris, sed egestas purus commodo vel.",
      ],
      points: [
        "Delivered today (order Mon-Fri before 12:00, delivery between 17:00 and 22:00)",
        "Including shipping costs, sent by klbtheme.com",
        "Pick up at a klbtheme.com collection point is possible",
        "30 days to change your mind and free returns",
        "Day and night customer service"
      ],
      category: "Electronics, Watches",
      tags: "Huawei, watches",
      sku: "K1G7W3Q412",
    },
    {
      id: "7",
      name: "HomePod mini — Space Gray",
      price: 249.99,
      originalPrice: 359.99,
      discount: 31,
      rating: 4.33,
      reviews: 3,
      image: prodcut7,
      discription: [
        "Fusce sapien urna, tristique non sapien nec, rutrum fringilla eros. Etiam accumsan odio eget tempus consectetur. Aliquam et sapien nulla. Suspendisse lobortis leo ante, imperdiet tristique magna tristique eu. Nullam ultrices vulputate odio, eu iaculis nulla congue quis.",
        "Morbi ut sapien vitae odio accumsan gravida. Morbi vitae erat auctor, eleifend nunc a, lobortis neque. Praesent aliquam dignissim viverra. Maecenas lacus odio, feugiat eu nunc sit amet, maximus sagittis dolor. Vivamus nisi sapien, elementum sit amet eros sit amet, ultricies cursus ipsum. Sed consequat luctus ligula. Curabitur laoreet rhoncus blandit. Aenean vel diam ut arcu pharetra dignissim ut sed leo. Vivamus faucibus, ipsum in vestibulum vulputate, lorem orci convallis quam, sit amet consequat nulla felis pharetra lacus. Duis semper erat mauris, sed egestas purus commodo vel.",
      ],
      points: [
        "Delivered today (order Mon-Fri before 12:00, delivery between 17:00 and 22:00)",
        "Including shipping costs, sent by klbtheme.com",
        "Pick up at a klbtheme.com collection point is possible",
        "30 days to change your mind and free returns",
        "Day and night customer service"
      ],
      category: "Electronics, Watches",
      tags: "Huawei, watches",
      sku: "K1G7W3Q412",
    },
    {
      id: "8",
      name: "ELECTROLUX EW6S226SUI",
      price: 190.0,
      originalPrice: 250.0,
      discount: 24,
      rating: 3.33,
      reviews: 3,
      image: prodcut8,
      discription: [
        "Fusce sapien urna, tristique non sapien nec, rutrum fringilla eros. Etiam accumsan odio eget tempus consectetur. Aliquam et sapien nulla. Suspendisse lobortis leo ante, imperdiet tristique magna tristique eu. Nullam ultrices vulputate odio, eu iaculis nulla congue quis.",
        "Morbi ut sapien vitae odio accumsan gravida. Morbi vitae erat auctor, eleifend nunc a, lobortis neque. Praesent aliquam dignissim viverra. Maecenas lacus odio, feugiat eu nunc sit amet, maximus sagittis dolor. Vivamus nisi sapien, elementum sit amet eros sit amet, ultricies cursus ipsum. Sed consequat luctus ligula. Curabitur laoreet rhoncus blandit. Aenean vel diam ut arcu pharetra dignissim ut sed leo. Vivamus faucibus, ipsum in vestibulum vulputate, lorem orci convallis quam, sit amet consequat nulla felis pharetra lacus. Duis semper erat mauris, sed egestas purus commodo vel.",
      ],
      points: [
        "Delivered today (order Mon-Fri before 12:00, delivery between 17:00 and 22:00)",
        "Including shipping costs, sent by klbtheme.com",
        "Pick up at a klbtheme.com collection point is possible",
        "30 days to change your mind and free returns",
        "Day and night customer service"
      ],
      category: "Electronics, Watches",
      tags: "Huawei, watches",
      sku: "K1G7W3Q412",
    },
    {
      id: "9",
      name: "ecobee 3 Lite Smart Thermostat 2.0, No Hub Required",
      price: 130.0,
      originalPrice: 142.0,
      discount: 9,
      rating: 3.67,
      reviews: 3,
      image: prodcut9,
      discription: [
        "Fusce sapien urna, tristique non sapien nec, rutrum fringilla eros. Etiam accumsan odio eget tempus consectetur. Aliquam et sapien nulla. Suspendisse lobortis leo ante, imperdiet tristique magna tristique eu. Nullam ultrices vulputate odio, eu iaculis nulla congue quis.",
        "Morbi ut sapien vitae odio accumsan gravida. Morbi vitae erat auctor, eleifend nunc a, lobortis neque. Praesent aliquam dignissim viverra. Maecenas lacus odio, feugiat eu nunc sit amet, maximus sagittis dolor. Vivamus nisi sapien, elementum sit amet eros sit amet, ultricies cursus ipsum. Sed consequat luctus ligula. Curabitur laoreet rhoncus blandit. Aenean vel diam ut arcu pharetra dignissim ut sed leo. Vivamus faucibus, ipsum in vestibulum vulputate, lorem orci convallis quam, sit amet consequat nulla felis pharetra lacus. Duis semper erat mauris, sed egestas purus commodo vel.",
      ],
      points: [
        "Delivered today (order Mon-Fri before 12:00, delivery between 17:00 and 22:00)",
        "Including shipping costs, sent by klbtheme.com",
        "Pick up at a klbtheme.com collection point is possible",
        "30 days to change your mind and free returns",
        "Day and night customer service"
      ],
      category: "Electronics, Watches",
      tags: "Huawei, watches",
      sku: "K1G7W3Q412",
    },
    {
      id: "10",
      name: "Canon EOS R10 RF-S 18-45 IS STM",
      price: 850.0,
      originalPrice: 1099.0,
      discount: 23,
      rating: 4.0,
      reviews: 3,
      image: prodcut10,
      discription: [
        "Fusce sapien urna, tristique non sapien nec, rutrum fringilla eros. Etiam accumsan odio eget tempus consectetur. Aliquam et sapien nulla. Suspendisse lobortis leo ante, imperdiet tristique magna tristique eu. Nullam ultrices vulputate odio, eu iaculis nulla congue quis.",
        "Morbi ut sapien vitae odio accumsan gravida. Morbi vitae erat auctor, eleifend nunc a, lobortis neque. Praesent aliquam dignissim viverra. Maecenas lacus odio, feugiat eu nunc sit amet, maximus sagittis dolor. Vivamus nisi sapien, elementum sit amet eros sit amet, ultricies cursus ipsum. Sed consequat luctus ligula. Curabitur laoreet rhoncus blandit. Aenean vel diam ut arcu pharetra dignissim ut sed leo. Vivamus faucibus, ipsum in vestibulum vulputate, lorem orci convallis quam, sit amet consequat nulla felis pharetra lacus. Duis semper erat mauris, sed egestas purus commodo vel.",
      ],
      points: [
        "Delivered today (order Mon-Fri before 12:00, delivery between 17:00 and 22:00)",
        "Including shipping costs, sent by klbtheme.com",
        "Pick up at a klbtheme.com collection point is possible",
        "30 days to change your mind and free returns",
        "Day and night customer service"
      ],
      category: "Electronics, Watches",
      tags: "Huawei, watches",
      sku: "K1G7W3Q412",
    },
  ];

  const singleproduct = products.find((p) => p.id === id);


  return (
    <div className="max-w-7xl mx-auto px-2 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Images */}
        <div className="relative">
          <span className="absolute left-4 top-4 bg-red-500 text-white text-sm font-bold rounded-full flex justify-center items-center h-[50px] w-[50px]">
            {singleproduct.discount}%
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
          backgroundImage: selectedImage ? `url(${selectedImage})` : "none",
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
            <h1 className="text-3xl font-semibold">
        {singleproduct.name}
            </h1>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex">
                {[1, 2, 3, 4].map((star) => (
                  <AiFillStar key={star} className="text-yellow-400 w-5 h-5" />
                ))}
                <AiOutlineStar className="text-gray-300 w-5 h-5" />
              </div>
              <span className="text-gray-400">{singleproduct.reviews} reviews</span>
              <span className="">
                <span className="text-gray-400">Store:</span> groci
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-lg text-gray-500 line-through">₹{singleproduct.price.toFixed(2)}</span>
            <span className="text-3xl font-bold text-red-500">₹{(singleproduct.price - (singleproduct.price * singleproduct.discount) / 100).toFixed(2)}</span>
          </div>

          <div className="inline-block rounded-md bg-green-100 px-3 py-1 text-sm text-green-600">
            In Stock
          </div>

          <p className="text-gray-500 text-sm">
        {singleproduct.discription[0]}
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
          
            <ul  className="space-y-3">
            {singleproduct.points.map((point, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {point}
              </li>
              
          ))}
            </ul>
          </div>

          <div className="space-y-2 text-sm">
            <div>
              <span className="font-semibold">SKU:</span> {singleproduct.sku}
            </div>
            <div>
              <span className="font-semibold">Categories:</span>{" "}
              <span className="text-gray-500">{singleproduct.category}</span>
            </div>
            <div>
              <span className="font-semibold">Tags:</span>{" "}
              <span className="text-gray-500">{singleproduct.tags}</span>
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
      <SingleProductDiscription handleview={handleOpenPopup} />
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
