import React, { useState } from "react";
import { Card, ProgressBar, Button, Collapse } from "react-bootstrap";
import { motion } from "framer-motion";

const TrackOrderItem = ({ order, onCancel, onReorder }) => {
  const [open, setOpen] = useState(false);

  const statusPercent = {
    Pending: 25,
    Approved: 50,
    Shipped: 75,
    Delivered: 100,
    Cancelled: 0,
  };

  const statusColor = {
    Pending: "warning",
    Approved: "info",
    Shipped: "primary",
    Delivered: "success",
    Cancelled: "danger",
  };

  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
    >
      <Card className="shadow-sm border-0 rounded-4 p-3 hover-shadow">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="fw-semibold mb-0">{order.productName}</h5>
          <span
            className={`badge bg-${statusColor[order.status]}`}
            style={{ cursor: "pointer" }}
            onClick={() => setOpen(!open)}
          >
            {order.status}
          </span>
        </div>
        <p className="text-muted mb-1">Order ID: {order.id}</p>
        <p className="text-muted mb-1">Quantity: {order.quantity}</p>
        <p className="text-muted mb-2">ETA: {order.eta}</p>

        <ProgressBar
          now={statusPercent[order.status]}
          variant={statusColor[order.status]}
          animated={order.status !== "Cancelled"}
        />

        <Collapse in={open}>
          <div className="mt-3">
            <p className="mb-1"><strong>Shipping Address:</strong> {order.address}</p>
            <p className="mb-1"><strong>Payment Method:</strong> {order.payment}</p>
            <p className="mb-1"><strong>Items:</strong> {order.items.join(", ")}</p>
            <div className="d-flex mt-2">
              {order.status === "Pending" && (
                <Button variant="outline-danger" size="sm" className="me-2" onClick={() => onCancel(order.id)}>
                  Cancel Order
                </Button>
              )}
              {order.status === "Delivered" && (
                <Button variant="outline-primary" size="sm" onClick={() => onReorder(order.id)}>
                  Reorder
                </Button>
              )}
            </div>
          </div>
        </Collapse>
      </Card>
    </motion.div>
  );
};

export default TrackOrderItem;
