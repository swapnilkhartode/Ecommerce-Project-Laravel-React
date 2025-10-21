import React from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddPaymentMethod({ form, handleChange, setForm }) {
  return (
    <Form>
      {/* Payment Type */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Payment Type</Form.Label>
        <Form.Select
          name="type"
          value={form.type}
          onChange={handleChange}
          required
        >
          <option value="">Select a payment type</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="UPI">UPI</option>
          <option value="Net Banking">Net Banking</option>
          <option value="PayPal">PayPal</option>
        </Form.Select>
      </Form.Group>

      {/* Cardholder Name & Card Details */}
      {form.type.includes("Card") && (
        <>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Cardholder Name</Form.Label>
            <Form.Control
              type="text"
              name="cardholder"
              placeholder="Enter cardholder's name"
              value={form.cardholder || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Card Number</Form.Label>
            <Form.Control
              type="text"
              name="details"
              placeholder="**** **** **** ****"
              value={form.details}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Expiry Date & CVV */}
          <div className="row">
            <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Expiry Date</Form.Label>
              <Form.Control
                type="date"           // changed from "month" to "date"
                name="expiry"
                value={form.expiry || ""}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </div>

            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">CVV</Form.Label>
                <Form.Control
                  type="password"
                  name="cvv"
                  placeholder="***"
                  value={form.cvv || ""}
                  onChange={handleChange}
                  maxLength={3}
                  required
                />
              </Form.Group>
            </div>
          </div>
        </>
      )}

      {/* UPI ID */}
      {form.type === "UPI" && (
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">UPI ID</Form.Label>
          <Form.Control
            type="text"
            name="details"
            placeholder="example@upi"
            value={form.details}
            onChange={handleChange}
            required
          />
        </Form.Group>
      )}

      {/* Net Banking */}
      {form.type === "Net Banking" && (
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Bank Name</Form.Label>
          <Form.Control
            type="text"
            name="details"
            placeholder="Enter bank name"
            value={form.details}
            onChange={handleChange}
            required
          />
        </Form.Group>
      )}

      {/* PayPal */}
      {form.type === "PayPal" && (
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">PayPal Email</Form.Label>
          <Form.Control
            type="email"
            name="details"
            placeholder="your@email.com"
            value={form.details}
            onChange={handleChange}
            required
          />
        </Form.Group>
      )}
    </Form>
  );
}

export default AddPaymentMethod;
