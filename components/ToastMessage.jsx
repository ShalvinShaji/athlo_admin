"use client";

const ToastMessage = ({ type, message, onClose }) => {
  if (!message) return null;

  return (
    <div
      className={`fixed top-15 right-25 px-4 py-2 rounded-md shadow-lg text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
      <button className="ml-3 font-bold" onClick={onClose}>
        ✖
      </button>
    </div>
  );
};

export default ToastMessage;
