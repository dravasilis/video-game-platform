import React from "react";
import "./banner.css";
import Image from "next/image";
interface Props {
  banner?: string;
  customBrightness?: boolean;
  href?: string;
}
const Banner = ({ banner, href, customBrightness }: Props) => {
  return (
    <div className="z-0">
      <div
        className={`bannerGradient banner ${
          customBrightness ? "bannerGradientSecondary" : "bannerGradient"
        }`}
      ></div>
      <Image
        className={`banner object-cover ${
          customBrightness ? "brightness-[.35]" : ""
        }`}
        width={1920}
        height={1080}
        src={href ?? `/images/${banner}`}
        alt="banner"
      />
    </div>
  );
};

export default Banner;
