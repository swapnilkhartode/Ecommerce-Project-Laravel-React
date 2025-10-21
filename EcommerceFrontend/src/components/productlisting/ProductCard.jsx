import React from "react";

function ProductCard({ product }) {
  // Calculate discount percentage
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  return (
    <div className="card h-100 shadow-sm border-0 product-card" style={{ transition: "transform 0.2s, box-shadow 0.2s" }}>
      {/* Image */}
      <div className="position-relative bg-light d-flex align-items-center justify-content-center" style={{ height: "200px" }}>
        {discount > 0 && (
          <span className="badge bg-danger position-absolute top-0 start-0 m-2">
            -{discount}%
          </span>
        )}
        <i className="bi bi-image" style={{ fontSize: "2.5rem", color: "#ccc" }}></i>
      </div>

      {/* Card Body */}
      <div className="card-body d-flex flex-column">
        <h6 className="mb-2">{product.name}</h6>

        {/* Rating placeholder */}
        <div className="mb-2">
          {[...Array(5)].map((_, i) => (
            <i
              key={i}
              className={`bi bi-star${i < (product.rating || 4) ? "-fill text-warning" : ""}`}
            ></i>
          ))}
        </div>

        {/* Price */}
        <p className="mb-3">
          <span className="fw-bold">${product.price}</span>{" "}
          {product.oldPrice > product.price && (
            <del className="text-muted ms-2">${product.oldPrice}</del>
          )}
        </p>

        {/* Buttons */}
        <div className="mt-auto d-flex gap-2">
          <button className="btn btn-sm btn-dark w-100">Add to Cart</button>
          <button className="btn btn-sm btn-outline-secondary">
            <i className="bi bi-heart"></i>
          </button>
        </div>
      </div>

      {/* Hover effect */}
      <style jsx>{`
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
}

export default ProductCard;
