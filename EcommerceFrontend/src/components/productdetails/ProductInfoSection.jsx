import React, { useState, useRef, useEffect } from "react";
import "../../assets/styles/product.css";

// Product images
import smartwatchImg from "../../assets/images/products/smartwatch.jpg";
import sneakersImg from "../../assets/images/products/sneakers.jpg";
import handbagsImg from "../../assets/images/products/handbags.jpg";
import wirelessImg from "../../assets/images/products/wireless_on.jpg";

const images = [smartwatchImg, sneakersImg, handbagsImg, wirelessImg];

const ProductInfoSection = () => {
  const [activeImg, setActiveImg] = useState(images[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const thumbnailRefs = useRef([]);

  // Scroll active thumbnail into view
  useEffect(() => {
    const index = images.indexOf(activeImg);
    if (thumbnailRefs.current[index]) {
      thumbnailRefs.current[index].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeImg]);

  return (
    <>
      <div className="row mb-5">
        {/* Left: Main Image & Thumbnails */}
        <div className="col-md-6">
          {/* Main Image with click handler */}
          <div
            className="border rounded overflow-hidden mb-3 main-product-img-wrapper"
            role="button"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src={activeImg}
              alt="Product"
              className="img-fluid main-product-img"
            />
          </div>

          {/* Thumbnail Carousel */}
          <div className="d-flex overflow-auto thumbnail-carousel gap-2">
            {images.map((img, index) => (
              <img
                key={index}
                ref={(el) => (thumbnailRefs.current[index] = el)}
                src={img}
                alt={`Thumbnail ${index}`}
                className={`thumbnail-img border rounded ${
                  img === activeImg ? "active-thumb" : ""
                }`}
                onClick={() => setActiveImg(img)}
              />
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="col-md-6">
          <h2>Smartwatch</h2>
          <h4>
            $199.99 <del className="text-muted">$299.99</del>
          </h4>
          <p className="text-success">In Stock</p>
          <button className="btn btn-outline-dark me-2">Add to Cart</button>
          <button className="btn btn-dark">Buy Now</button>

          <div className="mt-4">
            <h5>Description</h5>
            <p>
              This premium smartwatch features a sleek design, long battery
              life, and advanced fitness tracking to keep you connected and
              healthy.
            </p>

            <h6>Specifications</h6>
            <ul>
              <li>Heart rate monitoring</li>
              <li>Bluetooth 5.0</li>
              <li>Water-resistant</li>
              <li>Up to 7 days battery</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal for Enlarged Image */}
     {isModalOpen && (
  <div
    className="modal fade show d-block"
    tabIndex="-1"
    role="dialog"
    style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
    onClick={() => setIsModalOpen(false)}
  >
    <div
      className="modal-dialog modal-dialog-centered modal-lg"
      role="document"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="modal-content">
        {/* Close Button at Top Right */}
        <button
          type="button"
          className="btn-close position-absolute end-0 m-3 z-1"
          aria-label="Close"
          onClick={() => setIsModalOpen(false)}
        ></button>

        {/* Fixed Size Image Container */}
        <div
          className="modal-body d-flex align-items-center justify-content-center p-0"
          style={{
            height: "500px",  // fixed height
            backgroundColor: "#f8f9fa",
          }}
        >
          <img
            src={activeImg}
            alt="Zoomed"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Footer with Filename */}
        <div className="modal-footer justify-content-start px-3 py-2">
          <span className="fw-semibold">
            {`Preview: ${activeImg.split("/").pop()}`}
          </span>
        </div>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default ProductInfoSection;
