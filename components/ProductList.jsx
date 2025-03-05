import { useState, useEffect } from "react";
import { useFetchProducts, useDeleteProduct } from "@/store/useProductStore";
import useProductStore from "@/store/useProductStore";
import Sidebar from "./Sidebar";
import Loading from "@/app/loading";
import Cookies from "js-cookie";
import ToastMessage from "@/components/ToastMessage";
import CustomModal from "@/components/CustomModal"; // Import Generic Modal
import Image from "next/image";

export default function ProductList() {
  const { data: products = [], isLoading, error } = useFetchProducts();
  const { selectedCategory } = useProductStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [modal, setModal] = useState({ isOpen: false, action: null }); // Track modal state
  const deleteProductMutation = useDeleteProduct();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = Cookies.get("adminToken");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: "", message: "" }), 3000);
  };

  const handleDelete = (id) => {
    setSelectedProduct(id);
    setModal({ isOpen: true, action: "delete" });
  };

  const confirmDelete = async () => {
    setModal({ isOpen: false, action: null });

    try {
      deleteProductMutation.mutate(selectedProduct, {
        onSuccess: () => showAlert("success", "Product deleted successfully!"),
        onError: (error) => showAlert("error", `Error: ${error.message}`),
      });
    } catch (error) {
      console.error("Failed to delete product:", error);
      showAlert("error", "Error deleting product.");
    }
  };

  const handleUpdate = (id) => {
    setSelectedProduct(id);
    setModal({ isOpen: true, action: "update" });
  };

  const confirmUpdate = () => {
    console.log(`Updating product with ID: ${selectedProduct}`);
    setModal({ isOpen: false, action: null });
    showAlert("success", "Product updated successfully!");
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
      <Sidebar />

      <div className="flex-1 p-5 pt-[120px] ml-0 md:ml-64">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-[#222] shadow-lg rounded-xl overflow-hidden p-4 flex flex-col min-h-[450px] text-white"
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

      <CustomModal
        isOpen={modal.isOpen}
        onClose={() => setModal({ isOpen: false, action: null })}
        onConfirm={modal.action === "delete" ? confirmDelete : confirmUpdate}
        title={
          modal.action === "delete" ? "Confirm Deletion" : "Confirm Update"
        }
        message={
          modal.action === "delete"
            ? "Are you sure you want to delete this product?"
            : "Are you sure you want to update this product?"
        }
        confirmText={modal.action === "delete" ? "Yes, Delete" : "Yes, Update"}
      />
    </div>
  );
}
