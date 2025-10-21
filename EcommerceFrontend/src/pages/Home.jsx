// src/pages/Home.jsx

import Banner from '../components/home/Banner';
import FeaturedCategories from '../components/home/FeaturedCategories';
import FeaturedBrands from '../components/home/FeaturedBrands';

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedCategories />
      <FeaturedBrands />
    </div>
  );
}
