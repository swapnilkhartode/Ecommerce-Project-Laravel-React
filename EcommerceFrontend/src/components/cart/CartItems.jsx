import React from "react";

const CartItems = ({ items }) => {
  // Calculate total
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div 
      className="position-absolute bg-white shadow rounded p-3"
      style={{ width: "250px", top: "35px", right: "-60px", zIndex: 1000 }}
    >
      <table className="table table-sm mb-0">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>${item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-end mt-2">
        <strong>Total: ${total}</strong>
      </div>
    </div>
  );
};

export default CartItems;
