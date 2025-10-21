import React, { useState } from "react";
import Sidebar from "../components/productlisting/Sidebar";

function ProductCard({ product }) {
  return (
    <div className="card h-100">
      <img
        src={product.image_url || "https://via.placeholder.com/300x200"}
        className="card-img-top"
        alt={product.product_name}
        style={{ objectFit: "cover", height: "200px" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.product_name}</h5>
        <p className="card-text mb-2">
          ${product.price || 0}{" "}
          {product.oldPrice && (
            <span className="text-muted text-decoration-line-through">
              ${product.oldPrice}
            </span>
          )}
        </p>
        <button className="btn btn-primary mt-auto">Add to Cart</button>
      </div>
    </div>
  );
}

function ProductListing({ products = [] }) {
  const [view, setView] = useState("grid");

  return (
    <div className="container-fluid my-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-3">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-lg-9">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
            <h3>Shop</h3>
            <div className="d-flex align-items-center gap-2 mt-2 mt-lg-0">
              <select className="form-select w-auto">
                <option>Price Low-High</option>
                <option>Price High-Low</option>
                <option>Newest</option>
              </select>

              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn btn-outline-secondary ${view === "grid" ? "active" : ""}`}
                  onClick={() => setView("grid")}
                >
                  Grid
                </button>
                <button
                  type="button"
                  className={`btn btn-outline-secondary ${view === "list" ? "active" : ""}`}
                  onClick={() => setView("list")}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          {/* Products */}
          {products.length === 0 ? (
            <p>No products available</p>
          ) : view === "grid" ? (
            <div className="row">
              {products.map((product, idx) => (
                <div key={idx} className="col-md-4 mb-4">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="list-view">
              {products.map((product, idx) => (
                <div
                  key={idx}
                  className="d-flex align-items-center mb-3 p-3 border rounded"
                >
                  <img
                    src={product.image_url || "https://via.placeholder.com/150"}
                    alt={product.product_name}
                    className="me-3"
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                  <div>
                    <h5>{product.product_name}</h5>
                    <p className="mb-1">{product.description || "No description"}</p>
                    <p className="mb-0">
                      <strong>${product.price || 0}</strong>{" "}
                      {product.oldPrice && (
                        <span className="text-muted text-decoration-line-through">
                          ${product.oldPrice}
                        </span>
                      )}
                    </p>
                    <button className="btn btn-dark mt-2">Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductListing;
