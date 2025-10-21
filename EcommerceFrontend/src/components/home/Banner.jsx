import React, { useEffect, useState } from "react";
import { Carousel, Button } from "react-bootstrap";
import API from "../../api/api"; 
import "../../assets/styles/home.css";

function Banner() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    // Fetch banners from API
    const fetchBanners = async () => {
      try {
        const res = await API.get("/banners");
        // Only show active banners
        setBanners(res.data.filter(b => b.status === "active"));
      } catch (err) {
        console.error("Error fetching banners:", err);
      }
    };

    fetchBanners();
  }, []);

  if (banners.length === 0) return null; // don't render carousel if no banners

  return (
    <section className="d-flex justify-content-center my-5">
      <div className="w-80 position-relative">
        <Carousel fade interval={4000}>
          {banners.map((banner, idx) => (
            <Carousel.Item key={banner.id}>
              <img
                className="d-block w-100 rounded-3 vh-80 object-fit-cover"
                src={banner.image_url}
                alt={banner.title}
              />
              <Carousel.Caption className="text-center bg-dark bg-opacity-50 p-4 rounded-3">
                <h1 className="fw-bold display-4">{banner.title}</h1>
                <p className="lead">
                  {/* Optional: you can have a description in DB or static fallback */}
                  {banner.description || "Check out our latest offers!"}
                </p>
                <Button variant="danger" className="px-4 py-2">
                  Shop Now
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

export default Banner;
