import Image from "next/image";
import React from "react";
import img1 from "../assets/image-1-10-450x450.jpg";
import img2 from "../assets/image-1-16-450x450.png";
import img3 from "../assets/image-1-30-450x450.png";
import { FaStar } from "react-icons/fa6";

const stores = [
  {
    name: "machic",
    rating: 3.94,
    images: [img1, img2, img3],
    extraItems: 6,
  },
  {
    name: "groci",
    rating: 4.11,
    images: [img1, img2, img3],
    extraItems: 19,
  },
  {
    name: "chakta",
    rating: 4.0,
   images: [img1, img2, img3],
    extraItems: 14,
  },
  {
    name: "medibazar",
    rating: 4.4,
  images: [img1, img2, img3],
    extraItems: 10,
  },
];

const AllStore = ({handleOpenPopup}) => {
  return (
    <section className="p-2 max-w-7xl mx-auto">
      <div className="flex justify-between items-center py-4">
        <h2 className="text-base md:text-lg">All Stores</h2>
        <a href="/stores" className="text-blue-500 hover:underline">
          View All →
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stores.map((store, index) => (
          <div
            key={index}
            className=" p-4 rounded-md border border-gray-200 group"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden"><Image src={img1} alt="" /></div>
              <div className="ml-4">
                <h3 className="text-sm font-medium mb-3">{store.name}</h3>
                <div className="flex items-center  text-[12px]  border border-gray-300 mb-3 rounded-full px-2">
                  <span className="text-yellow-300"><FaStar /></span>
                  <span className="ml-1">{store.rating} rating</span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              {store.images.map((image, i) => (
                <div key={i} className="relative" >
                <Image
                  src={image}
                  alt=""
                  className="w-12 h-12 object-cover mr-2 border"
                />
                <div className="absolute hidden group-hover:block transition-all duration-500 top-1/2 left-1/2 text-gray-800 text-center bg-[#ffffff4c] text-sm transform -translate-y-1/2 -translate-x-1/2">
                    <p>1500</p>
                    <p>900</p>
                </div>
                </div>
              ))}
              <span className=" text-sm">+{store.extraItems}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllStore;
