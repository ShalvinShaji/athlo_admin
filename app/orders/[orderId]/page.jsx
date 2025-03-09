"use client";
import { useParams } from "next/navigation";
import { Package, User, DollarSign, List, ArrowLeft } from "lucide-react";
import Link from "next/link";

const orders = [
  {
    _id: "64f1b2c8e4b0d8a8d8f8e8f8",
    user: "JohnDoe123",
    items: [
      { product: "Laptop", quantity: 1, price: 1200 },
      { product: "Mouse", quantity: 2, price: 25 },
    ],
    totalAmount: 1250,
    createdAt: "2023-09-03T12:34:56.789Z",
  },
  {
    _id: "64f1b2c8e4b0d8a8d8f8e8f9",
    user: "Alice456",
    items: [
      { product: "Phone", quantity: 1, price: 800 },
      { product: "Headphones", quantity: 1, price: 100 },
    ],
    totalAmount: 900,
    createdAt: "2023-09-03T13:34:56.789Z",
  },
];

export default function OrderDetailPage() {
  const params = useParams();
  const { orderId } = params;

  console.log(orderId);

  const order = orders.find((order) => order._id === orderId);

  if (!order) {
    return <div className="text-white text-center mt-20">Order not found!</div>;
  }

  return (
    <div className="min-h-screen bg-[#111] text-white pt-28 px-6">
      <h1 className="text-3xl font-bold text-center mb-6">Order Details</h1>
      <div className="bg-[#222] shadow-lg rounded-lg p-6 w-full border border-gray-600">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Package size={20} /> Order ID: {order._id}
        </h2>
        <p className="text-gray-300 flex items-center gap-2 mt-2">
          <User size={18} /> <strong>User:</strong> {order.user}
        </p>
        <p className="text-gray-300 flex items-center gap-2 mt-1">
          <DollarSign size={18} /> <strong>Total Amount:</strong> ${" "}
          {order.totalAmount}
        </p>
        <h3 className="text-md font-semibold mt-4 flex items-center gap-2">
          <List size={18} /> Items:
        </h3>
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
          {order.items.map((item, index) => (
            <li key={index}>
              <strong>Product:</strong> {item.product} |{" "}
              <strong>Quantity:</strong> {item.quantity} |{" "}
              <strong>Price:</strong> ${item.price}
            </li>
          ))}
        </ul>
      </div>
      <Link
        href="/orders"
        className=" text-center text-blue-400 font-medium mt-6 hover:underline flex items-center justify-center gap-2"
      >
        <ArrowLeft size={18} /> Back to All Orders
      </Link>
    </div>
  );
}
