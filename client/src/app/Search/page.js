"use client";

import React, { useState } from "react";

const Search = () => {
    const products = [
        "Apple iPhone",
        "Samsung Galaxy",
        "Google Pixel",
        "OnePlus Nord",
        "Sony Xperia",
        "LG Velvet",
        "Nokia Lumia",
        "Huawei P40",
      ];
    
  const [query, setQuery] = useState(""); // State to store search query
  const [filteredResults, setFilteredResults] = useState([]); // State to store filtered search results

  // Handle search input change
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      // Filter products based on the query
      const results = products.filter((product) =>
        product.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  };

  return (
    <div className="flex justify-center min-h-screen max-w-7xl mx-0 md:mx-8 w-full mb-4 md:mb-0 mt-[70px] px-4">
      <div className="relative w-full">
        <input
          type="search"
          placeholder="Search for products..."
          className="w-full bg-white text-black focus:ring-1 focus:ring-primary border max-w-7xl outline-none pl-4 pr-10 py-2 rounded-md"
          value={query}
          onChange={handleSearch}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-3 top-2.5 h-5 w-5 text-gray-500"
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
      {filteredResults.length > 0 && (
        <ul className="absolute bg-white  rounded-md w-[96%] mx-auto mt-1 z-10 max-h-60 overflow-y-auto top-[120px] px-4">
          {filteredResults.map((result, index) => (
            <li
              key={index}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer border-b"
              onClick={() => {
                alert(`Selected: ${result}`); // Handle click on a search result
                setQuery(result); // Update input field with selected result
                setFilteredResults([]); // Clear results
              }}
            >
              {result}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Search
