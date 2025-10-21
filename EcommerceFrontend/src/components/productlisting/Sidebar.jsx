import React, { useState } from "react";
import FilterSection from "./FilterSection";

const categoriesData = [
  {
    name: "Electronics",
    subcategories: ["Mobiles", "Laptops", "Home Appliances"],
  },
  {
    name: "Fashion",
    subcategories: ["Men", "Women", "Accessories"],
  },
  {
    name: "Home Appliances",
    subcategories: ["Kitchen", "Furniture"],
  },
];

function Sidebar() {
  const [expanded, setExpanded] = useState({});

  const toggleCategory = (category) => {
    setExpanded((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="sidebar p-3 bg-light border">
      <h5 className="mb-3">Shop by Category</h5>

      {/* Categories with checkboxes */}
      {categoriesData.map((cat) => (
        <div key={cat.name} className="mb-3">
          <div
            onClick={() => toggleCategory(cat.name)}
            style={{ cursor: "pointer", fontWeight: "bold" }}
            className="d-flex justify-content-between align-items-center"
          >
            {cat.name}
            <span>{expanded[cat.name] ? "−" : "+"}</span>
          </div>

          {expanded[cat.name] && (
            <div className="ms-3 mt-1">
              {cat.subcategories.map((sub) => (
                <div className="form-check py-1" key={sub}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`${cat.name}-${sub}`}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`${cat.name}-${sub}`}
                  >
                    {sub}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <hr />
      {/* Filters */}
      <FilterSection />
    </div>
  );
}

export default Sidebar;
