import React, { useState } from "react";

const filtersData = [
  {
    name: "Brand",
    options: ["Samsung", "Apple", "Sony", "LG", "OnePlus"],
  },
  {
    name: "Rating",
    options: ["5 Stars", "4 Stars & Up", "3 Stars & Up", "2 Stars & Up"],
  },
  {
    name: "Availability",
    options: ["In Stock", "Out of Stock"],
  },
  {
    name: "Discount %",
    options: ["10% or more", "20% or more", "30% or more", "50% or more"],
  },
];

function FilterSection() {
  const [expanded, setExpanded] = useState({});

  const toggleFilter = (filterName) => {
    setExpanded((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  return (
    <div className="filter-section">
      <h5 className="mb-3">Filters</h5>

      {/* Price Slider */}
      <div className="mb-4">
        <label className="form-label">Price</label>
        <input type="range" className="form-range" min="0" max="1000" />
      </div>

      {/* Other Filters */}
      {filtersData.map((filter) => (
        <div key={filter.name} className="mb-2">
          <div
            onClick={() => toggleFilter(filter.name)}
            style={{ cursor: "pointer", fontWeight: "bold" }}
            className="d-flex justify-content-between align-items-center"
          >
            {filter.name}
            <span>{expanded[filter.name] ? "−" : "+"}</span>
          </div>
          {expanded[filter.name] && (
            <div className="ms-3 mt-1">
              {filter.options.map((option) => (
                <div className="form-check" key={option}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`${filter.name}-${option}`}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`${filter.name}-${option}`}
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FilterSection;
