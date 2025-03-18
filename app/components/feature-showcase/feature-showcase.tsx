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
        <span className="text-5xl max-lg:text-4xl max-md:text-3xl   text-primary-100 font-bold">
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
      <div
        style={{
          background:
            "linear-gradient(#0f1216 7%, #0f121600 45%, #0f1216 72%), linear-gradient(90deg, #0f1216 0%, #0f121600 50%, #0f1216 100%)",
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
