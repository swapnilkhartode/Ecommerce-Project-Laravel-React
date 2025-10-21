import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api"; 
import "../assets/styles/categoryPreview.css";
import ProductListing from "./ProductListing"; // import your product listing component

function CategoryPreviewPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [breadcrumbs, setBreadcrumbs] = useState([{ name: "Home", id: null }]);
  const [responseType, setResponseType] = useState(null);

  const fetchCategoryProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/category-products/${id}`);

      setProducts(res.data.data || []);
      setResponseType(res.data.type);

      const bc = [{ name: "Home", id: null }, ...(res.data.breadcrumbs || [])];
      setBreadcrumbs(bc);

    } catch (err) {
      console.error("Error fetching category products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, [id]);

  if (loading) return <p>Loading category...</p>;

  return (
    <div className="category-preview-page mt-5 mb-5">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        {breadcrumbs.map((crumb, index) => (
          <span key={index} className="breadcrumb-item">
            {crumb.id ? (
              <span onClick={() => navigate(`/category/${crumb.id}`)}>
                {crumb.name}
              </span>
            ) : (
              <span onClick={() => navigate("/")}>{crumb.name}</span>
            )}
            {index < breadcrumbs.length - 1 && " > "}
          </span>
        ))}
      </div>

      {/* Decide view based on response type */}
      {responseType === "category_preview" ? (
        <>
          {products.length === 0 ? (
            <div className="no-products-card">
              <div className="no-products-icon">🛒</div>
              <h3>No Products Found</h3>
              <p>Looks like this category is empty. Check back later!</p>
            </div>
          ) : (
            <div className="product-grid">
              {products.map((item) => (
                <div
                  key={item.subcategory_id}
                  className="product-card"
                  onClick={() => navigate(`/category/${item.subcategory_id}`)}
                >
                  {item.product?.image_url && (
                    <img
                      src={item.product.image_url}
                      alt={item.product.product_name}
                      className="product-image"
                    />
                  )}
                  <p className="product-name">{item.product.product_name}</p>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <ProductListing products={products} /> // 👈 pass data to product listing
      )}
    </div>
  );
}

export default CategoryPreviewPage;
