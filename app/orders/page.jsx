import Link from "next/link";
import { Package, User, DollarSign } from "lucide-react";

export default function OrderDetailsPage() {
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

  return (
    <div className="min-h-screen bg-[#111] text-white pt-28 px-6">
      <h1 className="text-3xl font-bold text-center mb-6">All Orders</h1>
      <div className="flex flex-col gap-3">
        {orders.map((order) => (
          <Link key={order._id} href={`/orders/${order._id}`}>
            <div className="bg-[#222] shadow-lg rounded-lg p-6 w-full border border-gray-600 hover:bg-[#333] transition cursor-pointer">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Package size={20} /> Order ID: {order._id}
              </h2>
              <p className="text-gray-300 flex items-center gap-2 mt-2">
                <User size={18} /> <strong>User:</strong> {order.user}
              </p>
              <p className="text-gray-300 flex items-center gap-2 mt-1">
                <DollarSign size={18} /> <strong>Total Amount:</strong> $
                {order.totalAmount}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
