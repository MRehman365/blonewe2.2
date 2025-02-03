"use client";

import { searchProducts } from "@/store/reducer/productReducer";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Search = () => {
  const { filteredProducts, loading, error } = useSelector((state) => state.products);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

const handleSearch = (e) => {
  const value = e.target.value;
  setQuery(value);

  if (value) {
    dispatch(searchProducts(value));
  } else {
    dispatch({ type: "products/clearFilteredProducts" }); 
  }
};

    


  return (
    <div className="flex-1 max-w-4xl mx-0 md:mx-8 w-full mb-4 md:mb-0 relative min-h-[100vh] mt-[80px]">
    <div className="relative p-2">
      <input
        type="search"
        placeholder="Search for products..."
        className="w-full mx-auto bg-white text-black focus:ring-1 border-1 border-gray-400 focus:ring-primary outline-none pl-4 pr-10 py-2 rounded-sm"
        value={query}
        onChange={handleSearch}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-3 top-[18px] h-5 w-5 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>

    {/* Search Results */}
    {query && (
      <div
        className="absolute w-full mt-2 bg-white text-black rounded-md shadow-lg z-[9999] max-h-[500px] overflow-y-auto"
     
      >
        {loading ? (
          <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
        ) : error ? (
          <div className="px-4 py-2 text-sm text-red-500">{error}</div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link
              key={product._id}
              href={`/product/${product._id}`}
              className="block px-4 py-2 text-sm hover:bg-gray-100"
            >
              {product.name}
            </Link>
          ))
        ) : (
          <div className="px-4 py-2 text-sm text-gray-500">No results found.</div>
        )}
      </div>
    )}
  </div>

  );
};
export default Search
