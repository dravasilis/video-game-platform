import React from "react";
import Image from "next/image";
import logo from "../../../../public/images/logo.png";

const Title = () => {
  return (
    <div>
      {/* TITLE  */}
      <div className="flex gap-4 items-center max-sm:gap-2">
        <Image
          src={logo}
          alt="favicon"
          className="w-[65px] max-sm:w-[40px] mb-1"
        />
        <h1 className=" text-[4rem] text-gradient max-lg:text-5xl max-sm:text-4xl font-bold flex tracking-[-2px]">
          Gamepedia
        </h1>
      </div>
      {/* SUBTITLE  */}
      <h2 className="text-3xl max-lg:text-2xl max-sm:text-lg text-primary-200">
        Explore, discover, save your favourite games{" "}
      </h2>
    </div>
  );
};

export default Title;
