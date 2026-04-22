import React from "react";
import PageBanner from "../../components/common/PageBanner";
import AboutIntro from "../../components/AboutComponents/AboutIntro";
import MissionVision from "../../components/AboutComponents/MissionVision";
import WhyChoose from "../../components/HomeComponents/WhyChoose";
import OurTeam from "../../components/AboutComponents/OurTeam";

const About = () => {
  return (
    <>
      <PageBanner
        title="About BookBazaar"
        subtitle="Learn more about our mission and vision"
      />
      <AboutIntro />
      <MissionVision />
      <WhyChoose />
      <OurTeam />
    </>
  );
};

export default About;
