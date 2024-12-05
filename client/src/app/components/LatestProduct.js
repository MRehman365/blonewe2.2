import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { MdOutlineZoomOutMap } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import prodcut1 from "../assets/image-1-1-1-450x450.png";
import prodcut2 from "../assets/image-1-10-450x450.png";
import prodcut3 from "../assets/image-1-11-450x450.png";
import prodcut4 from "../assets/image-1-13-450x450.png";
import prodcut5 from "../assets/image-1-14-450x450.png";
import prodcut6 from "../assets/image-1-15-450x450.png";
import prodcut7 from "../assets/image-1-16-450x450.png";
import prodcut8 from "../assets/image-1-17-450x450.png";
import prodcut9 from "../assets/image-1-7-450x450.png";
import prodcut10 from "../assets/image-1-17-450x450.png";
import Link from "next/link";
import { toast } from 'react-toast'

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
const LatestProduct = ({ handleview }) => {
    const initialTime = 1 * 24 * 60 * 60 + 14 * 60 * 60 + 20 * 60 + 10;

    const [timeRemaining, setTimeRemaining] = useState(initialTime);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000); 
  
      return () => clearInterval(interval);
    }, []);
  
  
    const days = Math.floor(timeRemaining / (24 * 60 * 60));
    const hours = Math.floor((timeRemaining % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((timeRemaining % (60 * 60)) / 60);
    const seconds = timeRemaining % 60;

  const settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    navigator: true,
    autoplay: true,
    arrows: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  const wave = () => toast.success('Product Added to Wishlist')
  const addCart = () => toast('Product Added to Cart')
  return (
    <div className="max-w-7xl mx-auto p-2 overflow-hidden">
      <div className="flex justify-between py-2">
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <p className="text-base md:text-lg">Latest Products</p>
          <p>
            {" "}
            <span className="bg-red-500 text-white px-2 py-1 text-base rounded-md ml-4">
              {days} <span className="text-white text-[12px]">d</span>
            </span>
            <span className="bg-red-500 text-white px-2 py-1 text-base rounded-md ml-1">
              {hours} <span className="text-white text-[12px]">h</span>
            </span>
            <span className="bg-red-500 text-white px-2 py-1 text-base rounded-md ml-1">
              {minutes} <span className="text-white text-[12px]">m</span>
            </span>
            <span className="ml-1 text-white">:</span>
            <span className="bg-red-500 text-white px-2 py-1 text-base rounded-md ml-1">
              {seconds} <span className="text-white text-[12px]">s</span>
            </span>
          </p>
        </div>

        <p className="text-sm md:text-base hover:text-[#1d1d72]">View all</p>
      </div>
      <Slider
        {...settings}
        className="grid gap-0 border-[3px] border-red-500 rounded-lg overflow-hidden"
      >
        {products.map((product, i) => (
          <div key={i}>
            <div className="group relative overflow-hidden w-full transition-all duration-300 h-full flex flex-col border border-gray-200 mx-auto">
              <div className="relative aspect-square">
              <Link href={`/product/${product.id}`} >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover h-[400px] w-auto overflow-hidden transition-transform duration-300 group-hover:scale-105"
                />
                </Link>
                {product.discount > 0 && (
                  <div className="absolute left-2 bottom-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {product.discount}%
                  </div>
                )}
                <div
                  className={`absolute right-2 top-2 flex-col gap-2 transition-opacity duration-300 hidden group-hover:flex`}
                >
                  <button
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                    onClick={handleview}
                  >
                    <MdOutlineZoomOutMap className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                    <FaRegHeart className="h-4 w-4 text-gray-600" onClick={wave} />
                  </button>
                </div>
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <div className="flex gap-2 items-center">
                  <div className="text-sm text-gray-500 line-through">
                    ₹{product.price.toFixed(2)}
                  </div>
                  {product.originalPrice > product.price && (
                    <div className=" text-lg font-bold bg-green-600 px-1 text-white rounded-md">
                      ₹{product.originalPrice.toFixed(2)}
                    </div>
                  )}
                </div>
                <h3 className="mb-2 text-sm font-medium line-clamp-2">
                  {product.name}
                </h3>
                <div className="h-[25px] overflow-hidden relative">
                  <div className="absolute flex flex-col gap-2 bottom-0 group-hover:-bottom-7 transform transition-all duration-500">
                    <div className="text-[12px] ">
                      <span className="text-gray-400">Store:</span> Groci
                    </div>
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex items-center">
                        <FaStar className="text-yellow-300" />
                      </div>
                      <div className="text-sm text-gray-500">
                        {product.rating} ({product.reviews} reviews)
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-auto">
                    <button className="px-3 py-2 w-full bg-[#004798] text-white text-sm font-medium rounded-md hover:bg-[#004798]/80" onClick={addCart}>
                      Add to cart
                    </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default LatestProduct;
