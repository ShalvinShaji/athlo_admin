import React from 'react';
import Image from 'next/image';

const ProductCard = ({ productName, productPrice, productImage }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white transform transition-transform duration-300 hover:scale-105">
      <div className="relative h-48 w-full">
        <Image
          src={productImage}
          alt={productName}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{productName}</div>
        <p className="text-gray-700 text-base">
          ${productPrice}
        </p>
      </div>
      <div className="px-6 pt-4 pb-6 flex justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Update
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;