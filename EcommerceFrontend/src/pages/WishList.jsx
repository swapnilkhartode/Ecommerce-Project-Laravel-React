import React, { useState } from "react";
import { Card, Button, Badge, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Trash2, Heart, ShoppingCart, Eye } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

function WishlistDashboard() {
  const [wishlist, setWishlist] = useState([
    { id: 1, name: "Wireless Headphones", price: "$59.99", image: "/images/headphones.jpg", new: true },
    { id: 2, name: "Smart Watch", price: "$129.99", image: "/images/smartwatch.jpg", discount: "10%" },
  ]);

  const handleRemove = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddToCart = (item) => {
    alert(`Added "${item.name}" to cart!`);
    handleRemove(item.id);
  };

  const renderTooltip = (msg) => <Tooltip>{msg}</Tooltip>;

  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4 d-flex align-items-center">
        <Heart size={28} className="text-danger me-2" /> My Wishlist
      </h2>

      {wishlist.length > 0 ? (
        <div className="row">
          <AnimatePresence>
            {wishlist.map((item) => (
              <motion.div
                className="col-md-4 mb-4"
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="shadow-sm border-0 h-100 wishlist-card" style={{ borderRadius: "12px" }}>
                  <div className="position-relative overflow-hidden">
                    <Card.Img
                      variant="top"
                      src={item.image}
                      style={{ height: "220px", objectFit: "cover", borderRadius: "12px 12px 0 0" }}
                    />
                    {item.discount && (
                      <Badge
                        bg="danger"
                        className="position-absolute top-2 start-2 p-2 fw-semibold"
                        style={{ borderRadius: "50px", opacity: 0.9 }}
                      >
                        {item.discount} OFF
                      </Badge>
                    )}
                    {item.new && (
                      <Badge
                        bg="success"
                        className="position-absolute top-2 end-2 p-2 fw-semibold"
                        style={{ borderRadius: "50px", opacity: 0.9 }}
                      >
                        NEW
                      </Badge>
                    )}
                  </div>

                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title className="fw-semibold">{item.name}</Card.Title>
                      <p className="text-muted mb-2">{item.price}</p>
                    </div>

                    <div className="d-flex justify-content-between mt-3">
                      <OverlayTrigger overlay={renderTooltip("Remove from wishlist")}>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleRemove(item.id)}
                          className="d-flex align-items-center"
                        >
                          <Trash2 size={16} className="me-1" /> Remove
                        </Button>
                      </OverlayTrigger>

                      <OverlayTrigger overlay={renderTooltip("Add to cart")}>
                        <Button
                          variant="primary"
                          size="sm"
                          className="d-flex align-items-center"
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingCart size={16} className="me-1" /> Add to Cart
                        </Button>
                      </OverlayTrigger>

                      <OverlayTrigger overlay={renderTooltip("Quick view")}>
                        <Button variant="outline-secondary" size="sm" className="d-flex align-items-center">
                          <Eye size={16} />
                        </Button>
                      </OverlayTrigger>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-5 bg-light rounded animate__animated animate__fadeIn">
          <Heart size={60} className="text-secondary mb-3" />
          <h4 className="fw-semibold mb-2">Your wishlist is empty</h4>
          <p className="text-muted mb-3">
            Browse products and add your favorites here.
          </p>
          <Button variant="primary" size="lg" className="fw-semibold">
            Shop Now
          </Button>
        </div>
      )}

      <style>{`
        .wishlist-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 20px rgba(0,0,0,0.15);
          transition: all 0.3s;
        }
        .wishlist-card button:hover {
          transform: scale(1.05);
          transition: all 0.2s;
        }
      `}</style>
    </div>
  );
}

export default WishlistDashboard;
