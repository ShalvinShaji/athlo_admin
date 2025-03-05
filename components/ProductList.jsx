"use client";

import { useFetchProducts, useDeleteProduct } from "@/store/useProductStore";
import useProductStore from "@/store/useProductStore";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "./Sidebar";
import Loading from "@/app/loading";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ToastMessage from "@/components/ToastMessage";

export default function ProductList() {
  const { data: products = [], isLoading, error } = useFetchProducts();
  const { selectedCategory } = useProductStore();
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const deleteProductMutation = useDeleteProduct();

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert({ type: "", message: "" });
    }, 3000);
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = Cookies.get("adminToken");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      deleteProductMutation.mutate(id, {
        onSuccess: () => {
          showAlert("success", "Product deleted successfully!");
        },
        onError: (error) => {
          showAlert("error", `Error: ${error.message}`);
        },
      });
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Error deleting product.");
    }
  };

  const handleUpdate = (id) => {
    console.log(`Updating product with ID: ${id}`);
    // Implement update logic here (e.g., open a modal for editing)
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  if (isLoading) return <Loading />;
  if (error)
    return (
      <p className="text-center mt-5 text-red-500">Failed to load products.</p>
    );

  return (
    <div className="flex bg-[#111] min-h-screen">
      <ToastMessage
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ type: "", message: "" })}
      />
      {/* Sidebar */}
      <Sidebar />

      {/* Product List */}
      <div className="flex-1 p-5 pt-[120px] ml-0 md:ml-64">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="bg-[#222] shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl p-4 flex flex-col min-h-[450px] text-white"
            >
              <div className="flex justify-center items-center h-50 bg-[#333] rounded-lg">
                {product.image && (
                  <Image
                    src={product.image}
                    width={100}
                    height={100}
                    alt={product.name || "Product Image"}
                    className="object-contain h-full w-full"
                  />
                )}
              </div>

              <div className="flex flex-col flex-grow p-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-200 text-center">
                  {product.name}
                </h2>

                <p className="text-gray-400 text-sm text-center">
                  {product.description || "No description available."}
                </p>

                <div className="flex justify-between items-center mt-10 text-gray-300">
                  <p className="text-lg font-bold text-green-400">
                    {product.price ? `₹${product.price}` : "Price Unavailable"}
                  </p>
                  <span className="text-sm text-yellow-400">
                    ⭐ {product.rating?.rate || "N/A"} (
                    {product.rating?.count || 0})
                  </span>
                </div>

                {/* Buttons */}
                {isLoggedIn && (
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleUpdate(product._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
                      disabled={deleteProductMutation.isLoading}
                    >
                      {deleteProductMutation.isLoading
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
