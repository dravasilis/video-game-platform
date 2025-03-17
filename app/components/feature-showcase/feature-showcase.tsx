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
        <span className="text-5xl max-lg:text-4xl max-md:text-3xl max-sm:text-2xl text-primary-100 font-bold">
          {title}
        </span>
        <div className="w-full h-1 rounded-lg bg-primary-100 box-shadow"></div>
      </div>
      <Image
        src={`/images/${image}`}
        alt="featureImage"
        className="object-contain justify-self-center col-span-2 rounded-2xl"
      />
      <div
        style={{
          background:
            "linear-gradient(rgb(10, 12, 15) 7%, rgba(10, 12, 15, 0) 45%, rgb(10, 12, 15) 72%), linear-gradient(90deg, rgb(10, 12, 15) 0%, rgba(10, 12, 15, 0) 50%, rgb(10, 12, 15) 100%)",
        }}
        className="w-full h-full absolute top-0 left-0"
      ></div>
      <div className="flex items-center  z-10">
        <span className="description">{description}</span>
      </div>
    </div>
  );
};

export default FeatureShowcase;
