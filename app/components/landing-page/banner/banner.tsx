import React from "react";
import "./banner.css";
import Image from "next/image";
interface Props {
  banner: string;
  customBrightness?: boolean;
}
const Banner = ({ banner,customBrightness }: Props) => {
  return (
    <div className="z-0">
      <div className="bannerGradient banner"></div>
      <Image
       className={`banner object-cover ${customBrightness ? 'brightness-[.25]' : ''}`}
        width={1920}
        height={1080}
        src={`/images/${banner}`}
        alt="banner"
        
      />
    </div>
  );
};

export default Banner;
