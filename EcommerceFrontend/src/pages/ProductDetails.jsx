import React from "react";
import ProductInfoSection from "../components/productdetails/ProductInfoSection";
import CustomerReviews from "../components/productdetails/CustomerReviews";
import RelatedProducts from "../components/productdetails/RelatedProducts";

const ProductDetails = () => {
  return (
    <div className="container my-5">
      <ProductInfoSection />
      <hr />
      <CustomerReviews />
      <hr />
      <RelatedProducts />
    </div>
  );
};

export default ProductDetails;
