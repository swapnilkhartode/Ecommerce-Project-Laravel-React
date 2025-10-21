import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const ReturnRequestForm = ({ orders, onSubmit }) => {
  const [form, setForm] = useState({
    orderId: "",
    product: "",
    reason: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.orderId || !form.product || !form.reason) return;
    onSubmit(form);
    setForm({ orderId: "", product: "", reason: "" });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Order</Form.Label>
        <Form.Select name="orderId" value={form.orderId} onChange={handleChange} required>
          <option value="">Select Order</option>
          {orders.map((order) => (
            <option key={order.id} value={order.id}>
              {order.id} - {order.product}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Product</Form.Label>
        <Form.Control
          type="text"
          name="product"
          value={form.product}
          onChange={handleChange}
          placeholder="Enter product name"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Reason</Form.Label>
        <Form.Control
          as="textarea"
          name="reason"
          value={form.reason}
          onChange={handleChange}
          rows={3}
          placeholder="Why are you returning this item?"
          required
        />
      </Form.Group>
      <Button type="submit" className="w-100" variant="success">
        Submit Return Request
      </Button>
    </Form>
  );
};

export default ReturnRequestForm;
