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
import ToastMessage from "@/components/ToastMessage";
import Loading from "@/app/loading";
import CustomModal from "@/components/CustomModal";
import {
  useCancelOrder,
  useDeleteOrder,
  useDeliverOrder,
  useFetchOrderById,
} from "@/store/useProductStore";
import Image from "next/image";

export default function OrderDetailPage() {
  const params = useParams();
  const { orderId } = params;
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [modal, setModal] = useState({ isOpen: false, action: null });
  const OrderDeliveryMutation = useDeliverOrder();
  const OrderCancelMutation = useCancelOrder();
  const OrderDeleteMutation = useDeleteOrder();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { data: order, isLoading, error } = useFetchOrderById(orderId);

  if (isLoading) return <Loading />;
  if (error) return <p className="text-red-500">Error fetching order.</p>;

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: "", message: "" }), 3000);
  };

  const handleOrderDelivery = () => {
    setSelectedOrder(orderId);
    setModal({ isOpen: true, action: "deliver" });
  };

  const confirmOderDelivery = async () => {
    setModal({ isOpen: false, action: null });

    try {
      OrderDeliveryMutation.mutate(selectedOrder, {
        onSuccess: () =>
          showAlert("success", "Order marked as delivered successfully!"),
        onError: (error) => showAlert("error", `Error: ${error.message}`),
      });
    } catch (error) {
      console.error("Failed to mark order as delivered:", error);
      showAlert("error", "Error while marking order as delivered.");
    }
  };
  const handleOrderCancel = () => {
    setSelectedOrder(orderId);
    setModal({ isOpen: true, action: "cancel" });
  };

  const confirmOderCancel = async () => {
    setModal({ isOpen: false, action: null });

    try {
      OrderCancelMutation.mutate(selectedOrder, {
        onSuccess: () => showAlert("success", "Order cancelled successfully!"),
        onError: (error) => showAlert("error", `Error: ${error.message}`),
      });
    } catch (error) {
      console.error("Failed to mark order as cancelled:", error);
      showAlert("error", "Error while marking order as cancelled.");
    }
  };
  const handleOrderDelete = () => {
    setSelectedOrder(orderId);
    setModal({ isOpen: true, action: "delete" });
  };

  const confirmOderDelete = async () => {
    setModal({ isOpen: false, action: null });

    try {
      OrderDeleteMutation.mutate(selectedOrder, {
        onSuccess: () => showAlert("success", "Order deleted successfully!"),
        onError: (error) => showAlert("error", `Error: ${error.message}`),
      });
    } catch (error) {
      console.error("Failed to mark order as deleted:", error);
      showAlert("error", "Error while marking order as deleted.");
    }
  };

  // Function to delete order
  const deleteOrder = () => {
    console.log(`Deleting order ${orderId}`);
  };

  return (
    <div className="min-h-screen bg-[#111] text-white pt-28 px-6">
      <ToastMessage
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ type: "", message: "" })}
      />
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
        <div className="flex flex-wrap gap-4 mt-4">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="shadow-lg rounded-lg overflow-hidden border flex flex-col items-center justify-center h-[300px] w-[200px] p-4"
            >
              <div className="relative w-[150px] h-[150px]">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="text-center mt-4">
                <h2 className="text-lg ">{item.product.name}</h2>
                <p className="text-gray-300">Quantity: {item.quantity}</p>
                <p className="text-gray-300 font-bold">
                  Price: ${item.product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mt-6">
        {!order.delivered && !order.cancelled && !order.deleted && (
          <button
            onClick={() => handleOrderDelivery(order._id)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition cursor-pointer"
          >
            Mark as Delivered
          </button>
        )}
        {!order.delivered && !order.cancelled && !order.deleted && (
          <button
            onClick={handleOrderCancel}
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition cursor-pointer"
          >
            Cancel Order
          </button>
        )}
        {!order.deleted && !order.delivered && !order.cancelled && (
          <button
            onClick={handleOrderDelete}
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
      <CustomModal
        isOpen={modal.isOpen}
        onClose={() => setModal({ isOpen: false, action: null })}
        onConfirm={
          modal.action === "deliver"
            ? confirmOderDelivery
            : modal.action === "cancel"
            ? confirmOderCancel
            : modal.action === "delete"
            ? confirmOderDelete
            : null
        }
        title={
          modal.action === "deliver"
            ? "Confirm Order Delivery"
            : modal.action === "cancel"
            ? "Confirm Order Cancellation"
            : modal.action === "delete"
            ? "Confirm Order Deletion"
            : ""
        }
        message={
          modal.action === "deliver"
            ? "Are you sure you want to mark this order as delivered?"
            : modal.action === "cancel"
            ? "Are you sure you want to cancel this order?"
            : modal.action === "delete"
            ? "Are you sure you want to delete this order?"
            : ""
        }
        confirmText={
          modal.action === "deliver"
            ? "Yes, Deliver"
            : modal.action === "cancel"
            ? "Yes, Cancel"
            : modal.action === "delete"
            ? "Yes, Delete"
            : ""
        }
      />
    </div>
  );
}
