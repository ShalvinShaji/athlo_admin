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
    <div style={{ padding: "20px" }}>
      <h1>All Orders</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
              maxWidth: "400px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h2>Order ID: {order._id}</h2>
            <p>
              <strong>User:</strong> {order.user}
            </p>
            <p>
              <strong>Total Amount:</strong> ${order.totalAmount}
            </p>
            <h3>Items:</h3>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  <strong>Product:</strong> {item.product} |{" "}
                  <strong>Quantity:</strong> {item.quantity} |{" "}
                  <strong>Price:</strong> ${item.price}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <a href="/orders" style={{ marginTop: "20px", display: "block" }}>
        Back to Orders
      </a>
    </div>
  );
}
