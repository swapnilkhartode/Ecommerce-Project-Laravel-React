import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Spinner, Form } from "react-bootstrap";
import AddPaymentMethod from "./AddPaymentMethod";
import API from "../api/api";
import { FaCreditCard, FaPaypal,FaEdit, FaTrash  } from "react-icons/fa";

function PaymentMethodsDashboard() {
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);
  const [form, setForm] = useState({
    type: "",
    details: "",
    cardholder: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const res = await API.get("/payment-methods");
      setMethods(res.data);
    } catch (err) {
      console.error("Error fetching payment methods:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddOrUpdate = async () => {
    if (!form.type || !form.details) return;
    try {
      let res;
      if (editingMethod) {
        res = await API.put(`/payment-methods/${editingMethod.id}`, form);
        setMethods(methods.map((m) => (m.id === editingMethod.id ? res.data : m)));
      } else {
        res = await API.post("/payment-methods", form);
        setMethods([...methods, res.data]);
      }
      setForm({ type: "", details: "", cardholder: "", expiry: "", cvv: "" });
      setEditingMethod(null);
      setShowModal(false);
    } catch (err) {
      console.error("Error saving payment method:", err);
    }
  };

  const handleEdit = (method) => {
    setForm({ ...method });
    setEditingMethod(method);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this method?")) return;
    try {
      await API.delete(`/payment-methods/${id}`);
      setMethods(methods.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Error deleting payment method:", err);
    }
  };

  const getIcon = (type) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes("card")) return <FaCreditCard size={24} />;
    if (lowerType.includes("paypal")) return <FaPaypal size={24} color="#003087" />;
    return null;
  };

  return (
    <div className="container my-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Payment Methods</h2>
        <Button
          variant="primary"
          className=" px-4"
          onClick={() => {
            setEditingMethod(null);
            setForm({ type: "", details: "", cardholder: "", expiry: "", cvv: "" });
            setShowModal(true);
          }}
        >
          + Add Payment Method
        </Button>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : methods.length > 0 ? (
        <div className="row">
          {methods.map((method) => (
            <div className="col-md-4 mb-3" key={method.id}>
              <Card className="h-100 border shadow-sm">
                <Card.Header className="d-flex flex-column align-items-center py-3 bg-light border-bottom">
                  {getIcon(method.type)}
                  <h6 className="mt-2">{method.type}</h6>
                </Card.Header>
                <Card.Body className="d-flex flex-column justify-content-between">
                  <p className="text-muted">{method.details}</p>
                  <div className="d-flex gap-2">
                    <Button
                      size="sm"
                      variant="outline-primary"
                      className="d-flex align-items-center gap-1 px-3"
                      onClick={() => handleEdit(method)}
                      title="Edit"
                    >
                      <FaEdit /> Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="outline-danger"
                      className="d-flex align-items-center gap-1 px-3"
                      onClick={() => handleDelete(method.id)}
                      title="Remove"
                    >
                      <FaTrash /> Remove
                    </Button>
                  </div>


                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5 bg-light rounded">
          <div className="display-6 mb-3">💳</div>
          <h5>No saved payment methods</h5>
          <p className="text-muted">Add a payment method to make checkout faster.</p>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            + Add Payment Method
          </Button>
        </div>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingMethod ? "Edit Payment Method" : "Add Payment Method"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <AddPaymentMethod form={form} handleChange={handleChange} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAddOrUpdate}>
            {editingMethod ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PaymentMethodsDashboard;
