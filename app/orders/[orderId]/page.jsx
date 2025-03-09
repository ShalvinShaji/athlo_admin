"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  Package,
  User,
  DollarSign,
  List,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Trash2,
  X,
} from "lucide-react";
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
    delivered: true,
    cancelled: false,
    deleted: false,
  },
  {
    _id: "64f1b2c8e4b0d8a8d8f8e8f2",
    user: "Shalvin",
    items: [
      { product: "Phone", quantity: 1, price: 800 },
      { product: "Headphones", quantity: 1, price: 100 },
    ],
    totalAmount: 900,
    createdAt: "2023-09-03T13:34:56.789Z",
    delivered: false,
    cancelled: false,
    deleted: false,
  },
  {
    _id: "64f1b2c8e4b0d8a8d8f8e8f10",
    user: "King",
    items: [
      { product: "Phone", quantity: 1, price: 800 },
      { product: "Headphones", quantity: 1, price: 100 },
    ],
    totalAmount: 900,
    createdAt: "2023-09-03T13:34:56.789Z",
    delivered: false,
    cancelled: true,
    deleted: false,
  },
  {
    _id: "64f1b2c8e4b0d8a8d8f8e8f10",
    user: "King",
    items: [
      { product: "Phone", quantity: 1, price: 800 },
      { product: "Headphones", quantity: 1, price: 100 },
    ],
    totalAmount: 900,
    createdAt: "2023-09-03T13:34:56.789Z",
    delivered: false,
    cancelled: false,
    deleted: true,
  },
];

export default function OrderDetailPage() {
  const params = useParams();
  const { orderId } = params;

  const [order, setOrder] = useState(
    orders.find((order) => order._id === orderId)
  );

  if (!order) {
    return <div className="text-white text-center mt-20">Order not found!</div>;
  }

  const markAsDelivered = () => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      delivered: true,
      cancelled: false,
      deleted: false,
    }));
  };

  // Function to cancel order
  const cancelOrder = () => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      delivered: false,
      cancelled: true,
      deleted: false,
    }));
  };

  // Function to delete order
  const deleteOrder = () => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      deleted: true,
    }));
  };

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
        <p className="text-gray-300 flex items-center gap-2 mt-2">
          <DollarSign size={18} /> <strong>Total Amount:</strong> $
          {order.totalAmount}
        </p>

        {/* Status Section */}
        <p className="flex items-center gap-2 mt-2">
          {order.delivered ? (
            <CheckCircle size={18} className="text-green-400" />
          ) : order.cancelled ? (
            <X size={18} className="text-yellow-400" />
          ) : order.deleted ? (
            <Trash2 size={18} className="text-red-500" />
          ) : (
            <XCircle size={18} className="text-red-400" />
          )}
          <strong>Status:</strong>{" "}
          {order.deleted
            ? "Deleted"
            : order.cancelled
            ? "Cancelled"
            : order.delivered
            ? "Delivered"
            : "Undelivered"}
        </p>

        {/* Items Section */}
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

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mt-6">
        {!order.delivered && !order.cancelled && !order.deleted && (
          <button
            onClick={markAsDelivered}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition cursor-pointer"
          >
            Mark as Delivered
          </button>
        )}
        {!order.delivered && !order.cancelled && !order.deleted && (
          <button
            onClick={cancelOrder}
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition cursor-pointer"
          >
            Cancel Order
          </button>
        )}
        {!order.deleted && !order.delivered && !order.cancelled && (
          <button
            onClick={deleteOrder}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition cursor-pointer"
          >
            Delete Order
          </button>
        )}
      </div>

      <Link
        href="/orders"
        className="text-center text-blue-400 font-medium mt-6 hover:underline flex items-center justify-center gap-2"
      >
        <ArrowLeft size={18} /> Back to All Orders
      </Link>
    </div>
  );
}
