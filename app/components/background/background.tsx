import React from "react";
import "./background.css";
import Image from "next/image";
import backgroundImage from "../../../public/images/background.jpg";
const Background = () => {
  return (
    <div>
      <div className="backgroundGradient background"></div>
      <Image className="background" src={backgroundImage} alt="background" />
    </div>
  );
};

export default Background;
