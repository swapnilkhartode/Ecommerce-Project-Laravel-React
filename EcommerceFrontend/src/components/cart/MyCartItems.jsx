import React from "react";
import { Card, Button, InputGroup, Form } from "react-bootstrap";
import { Trash2, Heart } from "lucide-react";
import { motion } from "framer-motion";

const MyCartItems = ({ item, handleQuantityChange, handleRemove, moveToWishlist }) => {
  return (
    <motion.div
      key={item.id}
      className="mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
    >
      <Card className="shadow-sm border-0 rounded-4 hover-shadow d-flex flex-row align-items-center">
        <Card.Img
          src={item.image}
          alt={item.name}
          style={{
            width: "140px",
            height: "140px",
            objectFit: "cover",
            borderRadius: "0.75rem",
          }}
        />
        <Card.Body className="d-flex flex-column justify-content-between ms-3">
          <div>
            <h5 className="fw-semibold">{item.name}</h5>
            <p className="text-muted mb-2">
              ${item.price.toFixed(2)} × {item.quantity} = $
              {(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-2">
            {/* Quantity */}
            <InputGroup style={{ width: "130px" }}>
              <Button
                variant="outline-secondary"
                onClick={() => handleQuantityChange(item.id, -1)}
                style={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  padding: "0 12px",
                }}
              >
                -
              </Button>
              <Form.Control
                value={item.quantity}
                readOnly
                className="text-center"
                style={{ borderLeft: 0, borderRight: 0, padding: "0.35rem 0" }}
              />
              <Button
                variant="outline-secondary"
                onClick={() => handleQuantityChange(item.id, 1)}
                style={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  padding: "0 12px",
                }}
              >
                +
              </Button>
            </InputGroup>

            {/* Action Buttons */}
            <div className="d-flex flex-column">
              <Button
                variant="outline-danger"
                size="sm"
                className="d-flex align-items-center mb-1"
                onClick={() => handleRemove(item.id)}
              >
                <Trash2 size={16} className="me-2" /> Remove
              </Button>
              <Button
                variant="outline-warning"
                size="sm"
                className="d-flex align-items-center"
                onClick={() => moveToWishlist(item.id)}
              >
                <Heart size={16} className="me-2" /> Save for Later
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default MyCartItems;
