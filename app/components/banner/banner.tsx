import React from "react";
import "./banner.css";
import Image from "next/image";
const Banner = () => {
  return (
    <div>
      <div className="bannerGradient banner"></div>
      <Image
        className="banner object-fill"
        width={1920}
        height={200}
        src="/images/bg1.jpg"
        alt="banner"
      />
    </div>
  );
};

export default Banner;
