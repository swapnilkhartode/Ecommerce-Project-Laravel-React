import React from "react";

const CustomerReviews = () => {
  return (
    <div className="mt-5">
      <h4>Customer Reviews</h4>

      {/* Rating Summary */}
      <div className="d-flex align-items-center mb-3">
        {[...Array(5)].map((_, i) => (
          <i key={i} className="bi bi-star-fill text-warning me-1"></i>
        ))}
        <span className="ms-2">4.5 <small>(123 reviews)</small></span>
      </div>

      {/* Single Review */}
      <div className="border rounded p-3 mb-3">
        <div className="d-flex align-items-center mb-2">
          <img
            src="https://via.placeholder.com/50"
            alt="user"
            className="rounded-circle me-2"
          />
          <strong>John Doe</strong>
        </div>

        <div className="mb-2">
          {[...Array(5)].map((_, i) => (
            <i key={i} className="bi bi-star-fill text-warning me-1"></i>
          ))}
        </div>

        <p className="mb-0">
          Lorem ipsum doloreerc onma suricem adip lisfcing elit, sed diam md cicee in lo. Quae ut form noumuc xim.
        </p>
      </div>
    </div>
  );
};

export default CustomerReviews;
