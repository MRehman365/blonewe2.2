"use client";
import React from "react";
import { FaShippingFast, FaHeadset, FaMoneyCheckAlt, FaPercent } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      id: 1,
      icon: <FaShippingFast size={40} className="text-[#004798]" />,
      title: "Free Delivery",
      description: "Free shipping on all orders",
    },
    {
      id: 2,
      icon: <FaHeadset size={40} className="text-[#004798]" />,
      title: "Online Support 24/7",
      description: "Support online 24 hours a day",
    },
    {
      id: 3,
      icon: <FaMoneyCheckAlt size={40} className="text-[#004798]" />,
      title: "Money Return",
      description: "Back guarantee under 7 days",
    },
    {
      id: 4,
      icon: <FaPercent size={40} className="text-[#004798]" />,
      title: "Member Discount",
      description: "On every order over $120.00",
    },
  ];
  

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex flex-wrap justify-between gap-6 md:gap-10">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex items-center gap-4 w-full sm:w-auto"
          >
            <div className="p-4 rounded-full">{feature.icon}</div>
            <div>
              <h3 className="font-medium text-base">{feature.title}</h3>
              <p className="text-gray-500 text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
