import Image from "next/image";
import "./feature-showcase.css";

import React from "react";

interface Props {
  title: string;
  description: string;
  image: string;
}

const FeatureShowcase = ({ title, description, image }: Props) => {
  return (
    <div className="relative flex flex-col w-full h-max">
      <div className="flex flex-col gap-4 col-span-2 z-20">
        <span className="text-5xl max-lg:text-4xl max-md:text-3xl  text-shadow text-primary-100  ">
          {title}
        </span>
        <div className="w-full h-1 rounded-lg bg-primary-100 box-shadow"></div>
      </div>
      <Image
        width={1920}
        height={1080}
        src={`/images/${image}`}
        alt="featureImage"
        className="object-contain w-full justify-self-center col-span-2 rounded-2xl"
      />
      <div className="w-full h-full absolute top-0 left-0 container-bg"></div>
      <div className="flex items-center  z-10 ">
        <span className="description glass">{description}</span>
      </div>
    </div>
  );
};

export default FeatureShowcase;
