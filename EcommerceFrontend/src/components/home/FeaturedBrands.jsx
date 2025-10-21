import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
SwiperCore.use([Autoplay]);
 // ✅ Correct for v9
import "swiper/css";
import "swiper/css/autoplay";
import "../../assets/styles/card.css";
import API from "../../api/api";

function FeaturedBrands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await API.get("/brands/featured");
        setBrands(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  
  

  return (
    <section className="container my-5">
      <h2 className="text-center mb-4">Featured Brands</h2>

      {loading ? (
              <div className="text-center my-5"><Spinner animation="border" /></div>
            ) : (
                   <Swiper
                      modules={[Autoplay]}
                      spaceBetween={20}
                      slidesPerView={5}
                      loop={false} // ✅ stop continuous looping
                      autoplay={{ delay: 2500, disableOnInteraction: false }}
                      breakpoints={{
                        0: { slidesPerView: 1 },
                        480: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                        1200: { slidesPerView: 5 },
                      }}
                    >
        {brands.map((brand) => (
              <SwiperSlide key={brand.brand_id}>
                <div className="custom-card p-3 text-center">
                  <img
                    src={brand.logo_url}
                    alt={brand.brand_name}
                    style={{ maxHeight: "100px", objectFit: "contain", margin: "0 auto" }}
                  />
                  <h6 className="mt-2">{brand.brand_name}</h6>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
            )}

    </section>
  );
}

export default FeaturedBrands;
