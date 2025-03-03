"use client"; // Client component

import { useState } from "react";
import {
  Menu,
  X,
  Home,
  ShoppingCart,
  Settings,
  User,
  LogOut,
} from "lucide-react"; // Import Lucide icons

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="absolute top-0 left-0 h-full">
      {/* Sidebar */}
      <div
        className={`fixed top-[120px] left-0 h-full w-64 bg-zinc-700 shadow-lg transform transition-transform duration-300 z-500 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Toggle Button inside the Sidebar */}
        <button
          onClick={toggleSidebar}
          className="absolute top-2 right-2 p-2 borer-1 text-white border-2 rounded-lg shadow-lg z-300 hover:bg-zinc-600 transition-colors"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}{" "}
          {/* Use Lucide icons */}
        </button>

        {/* Sidebar Content */}
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Home size={20} className="mr-2" /> Dashboard
          </h2>
          <ul>
            <li className="mb-2">
              <a
                href="#"
                className="flex items-center  hover:text-blue-500 transition-colors"
              >
                <ShoppingCart size={18} className="mr-2" /> Orders
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="flex items-center  hover:text-blue-500 transition-colors"
              >
                <User size={18} className="mr-2" /> Profile
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="flex items-center  hover:text-blue-500 transition-colors"
              >
                <Settings size={18} className="mr-2" /> Settings
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="flex items-center  hover:text-blue-500 transition-colors"
              >
                <LogOut size={18} className="mr-2" /> Logout
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Toggle Button outside the Sidebar (when closed) */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-[110px] left-4 p-2 bg-zinc-500 text-white rounded-lg shadow-lg z-300 hover:bg-zinc-600 transition-colors"
        >
          <Menu size={20} /> {/* Use Lucide icon */}
        </button>
      )}
    </div>
  );
}
