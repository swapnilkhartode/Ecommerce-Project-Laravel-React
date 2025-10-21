import React from "react";
import "../../assets/styles/card.css";

import handbagsImg from "../../assets/images/products/handbags.jpg";
import smartwatchImg from "../../assets/images/products/smartwatch.jpg";
import sneakersImg from "../../assets/images/products/sneakers.jpg";
import wireless_onImg from "../../assets/images/products/wireless_on.jpg";

function RelatedProducts() {
  return (
    <section className="container my-5">
      <h2 className="text-center mb-4">Related Products</h2>
      <div className="row">

        {/* Smartwatch */}
        <div className="col-md-3">
          <div className="custom-card">
            <img src={smartwatchImg} alt="Smartwatch" className="custom-img" />
            <h5 className="mt-3">Smartwatch</h5>
            <p>$199.99</p>
          </div>
        </div>

        {/* Sneaker */}
        <div className="col-md-3">
          <div className="custom-card">
            <img src={sneakersImg} alt="Sneaker" className="custom-img" />
            <h5 className="mt-3">Sneaker</h5>
            <p>$79.99</p>
          </div>
        </div>

        {/* Handbag */}
        <div className="col-md-3">
          <div className="custom-card">
            <img src={handbagsImg} alt="Handbag" className="custom-img" />
            <h5 className="mt-3">Handbag</h5>
            <p>$129.99</p>
          </div>
        </div>

        {/* Wireless On */}
        <div className="col-md-3">
          <div className="custom-card">
            <img src={wireless_onImg} alt="Wireless On" className="custom-img" />
            <h5 className="mt-3">Wireless On</h5>
            <p>$99.99</p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default RelatedProducts;
