"use client"; // Client component

import useProductStore from "@/store/useProductStore";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ProductList({ initialProducts }) {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, [products, fetchProducts]);

  const productList = products.length > 0 ? products : initialProducts;

  return (
    <div className="p-5 pt-[120px]">
      <h1 className="text-3xl font-bold text-center mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productList.map((product, index) => (
          <Link
            key={index}
            // href={`/products/${product.id || index}`}
            href="/"
            className="block"
          >
            <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg p-4 flex flex-col min-h-[400px]">
              <div className="flex justify-center items-center h-50 bg-zinc-900">
                {product.image && (
                  <Image
                    src={product.image}
                    width={20}
                    height={50}
                    alt={product.name || "Product Image"}
                    className="object-contain h-full"
                  />
                )}
              </div>

              <div className="flex flex-col flex-grow p-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-800 text-center">
                  {product.name}
                </h2>
                <p className="text-gray-500 text-sm text-center">
                  {product.category || "Unknown Category"}
                </p>

                <p className="text-gray-700 text-sm text-center">
                  {product.description || "No description available."}
                </p>

                <div className="flex justify-between items-center mt-auto">
                  <p className="text-lg font-bold text-blue-600">
                    {product.price ? `₹${product.price}` : "Price Unavailable"}
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
  );
}
