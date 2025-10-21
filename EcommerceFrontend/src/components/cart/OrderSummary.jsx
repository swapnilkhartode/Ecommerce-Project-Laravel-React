import React from "react";
import { Card, Button, Form } from "react-bootstrap";

const OrderSummary = ({ subtotal, shipping, discount, total, coupon, setCoupon, handleApplyCoupon, clearCart }) => {
  return (
    <Card className="shadow-sm border-0 p-4 sticky-top rounded-4">
      <h5 className="fw-semibold mb-3">Order Summary</h5>

      <Form.Group className="mb-3">
        <Form.Label className="fw-medium">Apply Coupon</Form.Label>
        <div className="d-flex">
          <Form.Control
            placeholder="Enter coupon"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          />
          <Button
            variant="secondary"
            onClick={handleApplyCoupon}
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          >
            Apply
          </Button>
        </div>
        {discount > 0 && (
          <small className="text-success mt-1 d-block">
            Coupon applied! {discount * 100}% off
          </small>
        )}
      </Form.Group>

      <div className="d-flex justify-content-between mb-2">
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      {discount > 0 && (
        <div className="d-flex justify-content-between mb-2 text-success">
          <span>Discount:</span>
          <span>- ${(subtotal * discount).toFixed(2)}</span>
        </div>
      )}
      <div className="d-flex justify-content-between mb-2">
        <span>Shipping:</span>
        <span>${shipping.toFixed(2)}</span>
      </div>
      <hr />
      <div className="d-flex justify-content-between fw-bold mb-3">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <Button variant="success" className="w-100 mb-2">
        Proceed to Checkout
      </Button>
      <Button variant="outline-danger" className="w-100" onClick={clearCart}>
        Clear Cart
      </Button>
    </Card>
  );
};

export default OrderSummary;
