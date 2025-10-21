import React, { useState } from "react";
import { Card, Button, Modal, Badge, Form, Row, Col } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import ReturnRequestForm from "./ReturnRequestForm";

function ReturnsRefundsDashboard() {
  const [returns, setReturns] = useState([
    { id: 101, product: "Wireless Headphones", status: "Pending", orderId: "ORD123" },
    { id: 102, product: "Smart Watch", status: "Approved", orderId: "ORD124" },
    { id: 103, product: "Bluetooth Speaker", status: "Refunded", orderId: "ORD125" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleAddReturn = (newReturn) => {
    setReturns([{ id: Date.now(), status: "Pending", ...newReturn }, ...returns]);
    setShowModal(false);
  };

  const filteredReturns = returns.filter(
    (r) =>
      r.product.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter ? r.status === statusFilter : true)
  );

  const getBadgeVariant = (status) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Approved":
        return "primary";
      case "Rejected":
        return "danger";
      case "Refunded":
        return "success";
      default:
        return "secondary";
    }
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Returns & Refunds</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          + New Return
        </Button>
      </div>

      {/* Filters */}
      <Row className="mb-3">
        <Col md={6} className="mb-2">
          <Form.Control
            placeholder="Search by product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={6}>
          <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Refunded">Refunded</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Returns List */}
      <AnimatePresence>
        {filteredReturns.length > 0 ? (
          filteredReturns.map((ret) => (
            <motion.div
              key={ret.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              layout
              className="mb-3"
            >
              <Card className="shadow-sm rounded-4 hover-shadow p-3 d-flex justify-content-between flex-row align-items-center">
                <div>
                  <h5 className="fw-semibold mb-1">{ret.product}</h5>
                  <p className="mb-0 text-muted">Order ID: {ret.orderId}</p>
                </div>
                <Badge bg={getBadgeVariant(ret.status)} className="py-2 px-3 fs-6">
                  {ret.status}
                </Badge>
              </Card>
            </motion.div>
          ))
        ) : (
          <motion.div
            className="text-center py-5 bg-light rounded-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h5 className="fw-semibold">No returns found</h5>
            <p className="text-muted">Create a return request to see it listed here.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Request a Return</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReturnRequestForm
            orders={returns}
            onSubmit={handleAddReturn}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ReturnsRefundsDashboard;
