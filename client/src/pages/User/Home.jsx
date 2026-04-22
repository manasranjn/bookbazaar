import React, { Fragment } from "react";
import Hero from "../../components/HomeComponents/Hero";
import FeaturedBooks from "../../components/HomeComponents/FeaturedBooks";
import CategoriesSection from "../../components/HomeComponents/CategoriesSection";
import TrendingBooks from "../../components/HomeComponents/TrendingBooks";
import WhyChoose from "../../components/HomeComponents/WhyChoose";

const Home = () => {
  return (
    <Fragment>
      <Hero />
      <FeaturedBooks />
      <CategoriesSection />
      <TrendingBooks />
      <WhyChoose />
    </Fragment>
  );
};

export default Home;
