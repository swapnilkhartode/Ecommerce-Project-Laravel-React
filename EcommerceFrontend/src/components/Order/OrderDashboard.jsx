import React, { useEffect, useState } from "react";
// import API from "../api/api"; // axios instance

function OrdersDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await API.get("/orders"); // backend must return all orders
//         setOrders(response.data.orders);
//       } catch (error) {
//         console.error("Failed to fetch orders", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

  // Filter orders by status
  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((order) => order.status === activeTab);

//   if (loading) {
//     return <div className="text-center my-5">Loading your orders...</div>;
//   }

  return (
    <div className="container my-4" style={{height: "55.1vh"}}>
      <h2 className="fw-bold mb-4">My Orders</h2>

      {/* Tabs for filtering */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "pending" ? "active" : ""}`}
            onClick={() => setActiveTab("pending")}
          >
            Pending
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "approved" ? "active" : ""}`}
            onClick={() => setActiveTab("approved")}
          >
            Approved
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "shipped" ? "active" : ""}`}
            onClick={() => setActiveTab("shipped")}
          >
            Shipped
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "cancelled" ? "active" : ""}`}
            onClick={() => setActiveTab("cancelled")}
          >
            Cancelled
          </button>
        </li>
      </ul>

      {/* Orders Table */}
      {filteredOrders.length === 0 ? (
        <p className="text-muted">No {activeTab} orders found.</p>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Order ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr key={order.id}>
                  <td>{index + 1}</td>
                  <td>{order.order_number}</td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        order.status === "delivered"
                          ? "bg-success"
                          : order.status === "pending"
                          ? "bg-warning text-dark"
                          : order.status === "approved"
                          ? "bg-info text-dark"
                          : order.status === "shipped"
                          ? "bg-primary"
                          : order.status === "cancelled"
                          ? "bg-danger"
                          : "bg-secondary"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>₹{order.total_amount}</td>
                  <td>
                    <a
                      href={`/orders/${order.id}`}
                      className="btn btn-sm btn-outline-dark"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default OrdersDashboard;
