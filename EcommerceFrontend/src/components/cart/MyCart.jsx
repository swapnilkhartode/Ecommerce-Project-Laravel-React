import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CartItem from "./MyCartItems";
import OrderSummary from "./OrderSummary";

function MyCart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Wireless Headphones", price: 59.99, image: "/images/headphones.jpg", quantity: 1 },
    { id: 2, name: "Smart Watch", price: 129.99, image: "/images/smartwatch.jpg", quantity: 2 },
  ]);

  const [wishlist, setWishlist] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleRemove = (id) => setCartItems(cartItems.filter((item) => item.id !== id));

  const handleQuantityChange = (id, delta) =>
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );

  const moveToWishlist = (id) => {
    const item = cartItems.find((i) => i.id === id);
    setWishlist([...wishlist, item]);
    handleRemove(id);
  };

  const handleApplyCoupon = () => {
    if (coupon === "SAVE10") setDiscount(0.1);
    else if (coupon === "SAVE20") setDiscount(0.2);
    else setDiscount(0);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 200 ? 0 : 10;
  const total = subtotal - subtotal * discount + shipping;

  return (
    <Container className="my-5">
      <h2 className="fw-bold mb-4 d-flex align-items-center">
        <ShoppingCart size={28} className="me-2 text-primary" /> My Cart
      </h2>

      {cartItems.length > 0 ? (
        <Row>
          <Col lg={8}>
            <AnimatePresence>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  handleQuantityChange={handleQuantityChange}
                  handleRemove={handleRemove}
                  moveToWishlist={moveToWishlist}
                />
              ))}
            </AnimatePresence>
          </Col>

          <Col lg={4}>
            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              discount={discount}
              total={total}
              coupon={coupon}
              setCoupon={setCoupon}
              handleApplyCoupon={handleApplyCoupon}
              clearCart={() => setCartItems([])}
            />
          </Col>
        </Row>
      ) : (
        <motion.div
          className="text-center py-5 bg-light rounded-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ShoppingCart size={48} className="text-secondary mb-3" />
          <h5 className="fw-semibold">Your cart is empty</h5>
          <p className="text-muted">Browse products and add items to your cart.</p>
          <Button variant="primary">Shop Now</Button>
        </motion.div>
      )}
    </Container>
  );
}

export default MyCart;
