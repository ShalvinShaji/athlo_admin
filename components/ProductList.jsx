"use client";

import { useFetchProducts } from "@/store/useProductStore";
import useProductStore from "@/store/useProductStore";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "./Sidebar";
import Loading from "@/app/loading";

export default function ProductList() {
  const { data: products = [], isLoading, error } = useFetchProducts();
  const { selectedCategory } = useProductStore();

  const handleDelete = (id) => {
    console.log(`Deleting product with ID: ${id}`);
    // Add delete logic here
  };

  const handleUpdate = (id) => {
    console.log(`Updating product with ID: ${id}`);
    // Add update logic here
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
      {/* Sidebar */}
      <Sidebar />

      {/* Product List */}
      <div className="flex-1 p-5 pt-[120px] ml-0 md:ml-64">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">
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

                <div className="flex justify-between items-center mt-auto text-gray-300">
                  <p className="text-lg font-bold text-green-400">
                    {product.price ? `₹${product.price}` : "Price Unavailable"}
                  </p>
                  <span className="text-sm text-yellow-400">
                    ⭐ {product.rating?.rate || "N/A"} (
                    {product.rating?.count || 0})
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleUpdate(product.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
