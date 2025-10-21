import React, { useState } from "react";
import CartItems from "./CartItems.jsx";

const CartIcon = () => {
  const [showCart, setShowCart] = useState(false);

  const items = [
    { name: "Apple", qty: 2, price: 4 },
    { name: "Banana", qty: 1, price: 2 },
  ];

  return (
    <div 
      className="position-relative mx-2 me-3"
      onMouseEnter={() => setShowCart(true)}
      onMouseLeave={() => setShowCart(false)}
    >
      <i className="bi bi-cart-fill fs-5" style={{ cursor: "pointer" }}></i>
      <span className="badge bg-primary position-absolute top-0 start-100 translate-middle">
        {items.length}
      </span>

      {showCart && <CartItems items={items} />}
    </div>
  );
};

export default CartIcon;
