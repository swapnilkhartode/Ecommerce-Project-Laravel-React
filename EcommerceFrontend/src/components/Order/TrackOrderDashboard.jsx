import React, { useState } from "react";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import TrackOrderItem from "./TrackOrderItem";

function TrackOrderDashboard() {
  const [orders, setOrders] = useState([
    {
      id: "ORD12345",
      productName: "Wireless Headphones",
      quantity: 1,
      status: "Pending",
      eta: "3-5 days",
      address: "123 Main St, City, Country",
      payment: "Credit Card",
      items: ["Wireless Headphones"],
    },
    {
      id: "ORD12346",
      productName: "Smart Watch",
      quantity: 2,
      status: "Shipped",
      eta: "1-2 days",
      address: "123 Main St, City, Country",
      payment: "UPI",
      items: ["Smart Watch", "Extra Band"],
    },
    {
      id: "ORD12347",
      productName: "Laptop Stand",
      quantity: 1,
      status: "Delivered",
      eta: "Delivered on 18 Sept",
      address: "123 Main St, City, Country",
      payment: "Credit Card",
      items: ["Laptop Stand"],
    },
  ]);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const handleCancel = (id) => {
    setOrders(
      orders.map((o) => (o.id === id ? { ...o, status: "Cancelled" } : o))
    );
  };

  const handleReorder = (id) => {
    alert(`Order ${id} has been added to cart for reorder!`);
  };

  const filteredOrders = orders
    .filter((order) =>
      filter === "All" ? true : order.status === filter
    )
    .filter((order) =>
      order.id.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <Container className="my-5">
      <h2 className="fw-bold mb-4">📦 Track My Orders</h2>

      {/* Filters */}
      <div className="mb-3 d-flex flex-wrap gap-2">
        {["All", "Pending", "Approved", "Shipped", "Delivered", "Cancelled"].map((f) => (
          <Button
            key={f}
            variant={filter === f ? "primary" : "outline-primary"}
            onClick={() => setFilter(f)}
          >
            {f}
          </Button>
        ))}
      </div>

      {/* Search */}
      <InputGroup className="mb-4" style={{ maxWidth: "300px" }}>
        <Form.Control
          placeholder="Search by Order ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <Row>
          <Col lg={12}>
            <AnimatePresence>
              {filteredOrders.map((order) => (
                <TrackOrderItem
                  key={order.id}
                  order={order}
                  onCancel={handleCancel}
                  onReorder={handleReorder}
                />
              ))}
            </AnimatePresence>
          </Col>
        </Row>
      ) : (
        <motion.div
          className="text-center py-5 bg-light rounded-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h5 className="fw-semibold">No orders found</h5>
          <p className="text-muted">Place an order to track it here.</p>
          <Button variant="primary">Shop Now</Button>
        </motion.div>
      )}
    </Container>
  );
}

export default TrackOrderDashboard;
