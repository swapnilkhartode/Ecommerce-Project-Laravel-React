import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import API from "../../api/api";
import "../../assets/styles/navbar.css";

function Navlink() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSub, setActiveSub] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  if (loading) return <p>Loading categories...</p>;

  return (
    <ul className="main-menu">
      {categories.map((cat, i) => (
        <li
          key={cat.category_id}
          className={`menu-item ${activeCategory === i ? "active" : ""}`}
          onMouseEnter={() => setActiveCategory(i)}
          onMouseLeave={() => {
            setActiveCategory(null);
            setActiveSub(null);
          }}
        >
          <span onClick={() => handleCategoryClick(cat.category_id)}>
            {cat.category_name}
          </span>

          {activeCategory === i && cat.subcategories?.length > 0 && (
            <ul className="submenu">
              {cat.subcategories.map((sub, j) => (
                <li
                  key={sub.category_id}
                  className={`submenu-item ${activeSub === j ? "active" : ""}`}
                  onMouseEnter={() => setActiveSub(j)}
                  onMouseLeave={() => setActiveSub(null)}
                >
                  <span onClick={() => handleCategoryClick(sub.category_id)}>
                      {sub.category_name}
                 </span>
                   {activeSub === j && sub.subcategories?.length > 0 && (
                      <ul className="nested-submenu">
                        {sub.subcategories.map((nested) => (
                          <li key={nested.category_id}>
                            <Link to="#">{nested.category_name}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

export default Navlink;
