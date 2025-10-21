import React, { useEffect, useState } from "react";
import "../../assets/styles/card.css"; 

import electronicsImg from "../../assets/images/categories/electronics.jpg";
import fashionImg from "../../assets/images/categories/fashion.jpg";
import homeKitchenImg from "../../assets/images/categories/home_kitchen.jpg";
import beautyImg from "../../assets/images/categories/beauty.jpg";
import furniture from "../../assets/images/categories/furniture.jpg";
import technology from "../../assets/images/categories/technology.jpg";
import schoolsupply from "../../assets/images/categories/schoolsupply.jpg";

import API from "../../api/api";
import { Spinner } from "react-bootstrap";

function FeaturedCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/top-categories");
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // stop loader
      }
    };
    fetchCategories();
  }, []);

  const categoryImages = {
    "TECHNOLOGY": technology,
    "FASHION": fashionImg,
    "HOME & KITCHEN": homeKitchenImg,
    "Beauty": beautyImg,
    "FURNITURE & INTERIORS" : furniture,
    "SCHOOL SUPPLIES": schoolsupply
  };

  return (
    <section className="container my-5">
      <h2 className="text-center mb-4">Featured Categories</h2>

      {loading ? (
        <div className="text-center my-5"><Spinner animation="border" /></div>
      ) : (
        <div className="row">
          {categories.map((cat) => (
            <div className="col-md-3 mb-4" key={cat.category_id}>
              <div className="custom-card">
                <img
                  src={categoryImages[cat.category_name] || beautyImg} 
                  alt={cat.category_name} 
                  className="custom-img" 
                />
                <p className="mt-2 fw-bold text-center">{cat.category_name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default FeaturedCategories;
