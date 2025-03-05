import { useEffect } from "react";

export default function CustomModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
}) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-start pt-10 z-999">
      {/* ✅ Transparent dark overlay with blur effect */}
      <div className="absolute inset-0  bg-opacity-10 backdrop-blur-lg"></div>

      {/* ✅ Modal Box */}
      <div className="relative bg-[#222] text-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-300 mt-2">{message}</p>

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition cursor-pointer"
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
