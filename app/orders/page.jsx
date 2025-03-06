export default async function OrderDetailsPage() {
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
    {
      _id: "64f1b2c8e4b0d8a8d8f8e8fa",
      user: "Bob789",
      items: [
        { product: "Tablet", quantity: 1, price: 600 },
        { product: "Keyboard", quantity: 1, price: 50 },
      ],
      totalAmount: 650,
      createdAt: "2023-09-03T14:34:56.789Z",
    },
  ];

  return (
    <div className="pt-28 px-6">
      <h1 className="text-3xl font-bold text-center mb-6">All Orders</h1>
      <div className="flex flex-grow gap-6 items-center justify-around">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-lg p-6 max-w-md w-full border border-gray-200"
          >
            <h2 className="text-lg font-semibold text-gray-700">
              Order ID: {order._id}
            </h2>
            <p className="text-gray-600">
              <strong>User:</strong> {order.user}
            </p>
            <p className="text-gray-600">
              <strong>Total Amount:</strong> ${order.totalAmount}
            </p>
            <h3 className="text-md font-semibold mt-4">Items:</h3>
            <ul className="list-disc list-inside mt-2 space-y-1">
              {order.items.map((item, index) => (
                <li key={index} className="text-zinc-700">
                  <strong>Product:</strong> {item.product} |{" "}
                  <strong>Quantity:</strong> {item.quantity} |{" "}
                  <strong>Price:</strong> ${item.price}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <a
        href="/orders"
        className="block text-center text-blue-600 font-medium mt-6 hover:underline"
      >
        Back to Orders
      </a>
    </div>
  );
}
