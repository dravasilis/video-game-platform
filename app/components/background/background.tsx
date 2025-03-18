import React from "react";
import "./background.css";
import Image from "next/image";
const Background = () => {
  return (
    <div>
      <div className="backgroundGradient background"></div>
      <Image
        width={500}
        height={200}
        className="background"
        src="/images/background.jpg"
        alt="background"
      />
    </div>
  );
};

export default Background;
