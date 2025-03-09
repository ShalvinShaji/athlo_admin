"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Package,
  User,
  DollarSign,
  CheckCircle,
  XCircle,
  Trash2,
  Ban,
} from "lucide-react";

export default function OrderDetailsPage() {
  const [filter, setFilter] = useState("all");

  const orders = [
    {
      _id: "64f1b2c8e4b0d8a8d8f8e8f8",
      user: "JohnDoe123",
      totalAmount: 1250,
      delivered: true,
      cancelled: false,
      deleted: false,
    },
    {
      _id: "64f1b2c8e4b0d8a8d8f8e8f2",
      user: "Shalvin",
      totalAmount: 900,
      delivered: false,
      cancelled: false,
      deleted: false,
    },
    {
      _id: "64f1b2c8e4b0d8a8d8f8e8f10",
      user: "Bob789",
      totalAmount: 450,
      delivered: false,
      cancelled: true,
      deleted: false,
    },
    {
      _id: "64f1b2c8e4b0d8a8d8f8e8f11",
      user: "Charlie123",
      totalAmount: 300,
      delivered: false,
      cancelled: false,
      deleted: true,
    },
  ];

  // Filtered Orders
  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    if (filter === "delivered") return order.delivered;
    if (filter === "undelivered")
      return !order.delivered && !order.cancelled && !order.deleted;
    if (filter === "cancelled") return order.cancelled;
    if (filter === "deleted") return order.deleted;
    return false;
  });

  return (
    <div className="min-h-screen bg-[#111] text-white pt-28 px-6">
      <h1 className="text-3xl font-bold text-center mb-4">All Orders</h1>

      <div className="flex justify-end mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-[#222] text-white px-4 py-2 rounded-lg border border-gray-600"
        >
          <option value="all">All Orders</option>
          <option value="delivered">Delivered Orders</option>
          <option value="undelivered">Undelivered Orders</option>
          <option value="cancelled">Cancelled Orders</option>
          <option value="deleted">Deleted Orders</option>
        </select>
      </div>

      <div className="flex flex-col gap-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <Link key={order._id} href={`/orders/${order._id}`}>
              <div
                className={`shadow-lg rounded-lg p-6 border cursor-pointer ${
                  order.delivered
                    ? "bg-[#222] border-gray-500 opacity-70"
                    : order.cancelled
                    ? "bg-red-900 border-red-500 opacity-70"
                    : order.deleted
                    ? "bg-gray-900 border-gray-500 opacity-70"
                    : "bg-[#222] border-gray-600 hover:bg-[#333]"
                }`}
              >
                <h2
                  className={`text-lg font-semibold flex items-center gap-2 ${
                    order.delivered || order.cancelled || order.deleted
                      ? "line-through text-gray-400"
                      : ""
                  }`}
                >
                  <Package size={20} /> Order ID: {order._id}
                </h2>
                <p className="text-gray-300 flex items-center gap-2 mt-1">
                  <User size={18} /> <strong>User:</strong> {order.user}
                </p>
                <p className="text-gray-300 flex items-center gap-2 mt-1">
                  <DollarSign size={18} /> <strong>Total:</strong> ${" "}
                  {order.totalAmount}
                </p>
                <p className="flex items-center gap-2 mt-1">
                  {order.delivered ? (
                    <CheckCircle size={18} className="text-green-400" />
                  ) : order.cancelled ? (
                    <Ban size={18} className="text-yellow-400" />
                  ) : order.deleted ? (
                    <Trash2 size={18} className="text-gray-400" />
                  ) : (
                    <XCircle size={18} className="text-red-400" />
                  )}
                  <strong>Status:</strong>{" "}
                  {order.delivered
                    ? "Delivered"
                    : order.cancelled
                    ? "Cancelled"
                    : order.deleted
                    ? "Deleted"
                    : "Undelivered"}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-400 text-center mt-4">No orders found.</p>
        )}
      </div>
    </div>
  );
}
