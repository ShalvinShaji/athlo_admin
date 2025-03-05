"use client";

import { useState } from "react";
import { Menu, X, Home, ShoppingCart } from "lucide-react";
import useProductStore from "@/store/useProductStore";
import { useFetchProducts } from "@/store/useProductStore";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { setSelectedCategory } = useProductStore();
  const { data: products = [] } = useFetchProducts();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Extract unique categories from fetched products
  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-[120px] left-4 p-2 bg-zinc-500 text-white rounded-lg shadow-lg z-300 hover:bg-zinc-600 transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed border-r-1 border-t-1 border-[#333] rounded-tr-xl top-[80px] left-0 h-[calc(100vh-80px)] w-64 bg-[#111] shadow-lg transform transition-transform duration-300 z-500 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 "
        }`}
      >
        {/* Close Button for Mobile */}
        <button
          onClick={toggleSidebar}
          className="md:hidden absolute top-2 right-2 p-2 text-white border-2 rounded-lg shadow-lg z-300 hover:bg-zinc-600 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Sidebar Content */}
        <div className="p-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center text-white">
            <Home size={20} className="mr-2" /> Dashboard
          </h2>
          <ul>
            <li className="mb-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex cursor-pointer items-center w-full text-left text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded-lg transition-colors"
              >
                <ShoppingCart size={18} className="mr-2" /> All Products
              </button>
            </li>
            {categories.map((category, index) => (
              <li key={index} className="mb-2">
                <button
                  onClick={() => setSelectedCategory(category)}
                  className="flex cursor-pointer items-center w-full text-left text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded-lg transition-colors"
                >
                  <ShoppingCart size={18} className="mr-2" /> {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
