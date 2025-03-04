"use client"; // Client component

import { useState } from "react";
import { Menu, X, Home, ShoppingCart } from "lucide-react"; // Import Lucide icons
import useProductStore from "@/store/useProductStore";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { products, setSelectedCategory } = useProductStore();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-[120px] left-4 p-2 bg-zinc-500 text-white rounded-lg shadow-lg z-300 hover:bg-zinc-600 transition-colors"
      >
        <Menu size={20} /> {/* Use Lucide icon */}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-[120px] left-0 h-[calc(100vh-120px)] w-64 bg-[#111] shadow-lg transform transition-transform duration-300 z-500 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Close Button for Mobile */}
        <button
          onClick={toggleSidebar}
          className="md:hidden absolute top-2 right-2 p-2 text-white border-2 rounded-lg shadow-lg z-300 hover:bg-zinc-600 transition-colors"
        >
          <X size={20} /> {/* Use Lucide icon */}
        </button>

        {/* Sidebar Content */}
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4 flex items-center text-white">
            <Home size={20} className="mr-2" /> Dashboard
          </h2>
          <ul>
            <li className="mb-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center w-full text-left text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded-lg transition-colors"
              >
                <ShoppingCart size={18} className="mr-2" /> All Products
              </button>
            </li>
            {categories.map((category, index) => (
              <li key={index} className="mb-2">
                <button
                  onClick={() => setSelectedCategory(category)}
                  className="flex items-center w-full text-left text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded-lg transition-colors"
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
