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

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  if (isLoading) return <Loading />;
  if (error)
    return (
      <p className="text-center mt-5 text-red-500">Failed to load products.</p>
    );

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Product List */}
      <div className="flex-1 p-5 pt-[120px] ml-0 md:ml-64">
        {/* <h1 className="text-3xl font-bold text-center mb-6">Products</h1> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">
          {filteredProducts.map((product, index) => (
            <Link
              key={index}
              href={`/products/${product.id || index}`}
              className="block"
            >
              <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg p-4 flex flex-col min-h-[400px]">
                <div className="flex justify-center items-center h-50 bg-white">
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
                  <h2 className="text-lg font-semibold mb-2 text-gray-800 text-center">
                    {product.name}
                  </h2>

                  <p className="text-gray-700 text-sm text-center">
                    {product.description || "No description available."}
                  </p>

                  <div className="flex justify-between items-center mt-auto">
                    <p className="text-lg font-bold text-blue-600">
                      {product.price
                        ? `₹${product.price}`
                        : "Price Unavailable"}
                    </p>
                    <span className="text-sm text-gray-600">
                      ⭐ {product.rating?.rate || "N/A"} (
                      {product.rating?.count || 0})
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
