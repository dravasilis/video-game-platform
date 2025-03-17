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
        <span className="text-5xl text-primary-100 font-bold">{title}</span>
        <div className="w-full h-1 rounded-lg bg-primary-100 box-shadow"></div>
      </div>
      <img
        src={`/images/${image}`}
        alt="dssd"
        className="object-contain justify-self-center col-span-2 rounded-2xl px-28"
      />
      <div
        style={{
          background:
            "linear-gradient(rgb(10, 12, 15) 7%, rgba(10, 12, 15, 0) 45%, rgb(10, 12, 15) 72%), linear-gradient(90deg, rgb(10, 12, 15) 9%, rgba(10, 12, 15, 0) 50%, rgb(10, 12, 15) 89%)",
        }}
        className="w-full h-full   absolute top-0 left-0"
      ></div>
      <div className="flex items-center  z-10">
        <span className="text-primary-250 !bg-[#fff0] !backdrop-blur-[1px] p-12 py-4 rounded-2xl glass text-2xl w-[70%]  leading-[40px] tracking-[-1px] pl-10 relative bottom-[10rem]">
          {description}
        </span>
      </div>
    </div>
  );
};

export default FeatureShowcase;
