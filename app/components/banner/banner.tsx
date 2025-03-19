import React from "react";
import "./banner.css";
import Image from "next/image";
import bannerImage from "../../../public/images/bg100.jpg";
const Banner = () => {
  return (
    <div>
      <div className="bannerGradient banner"></div>
      <Image className="banner object-cover" src={bannerImage} alt="banner" />
    </div>
  );
};

export default Banner;
