import React from "react";
import { CarouselUI } from "../carousel/CardsCarousel";
import { Game } from "@/app/models/game";

interface Props {
  games: Game[];
  title: string;
  description: string;
}

const FeatureShowcaseCarousel = ({ games, title, description }: Props) => {
  return (
    <div
      style={{
        background: "linear-gradient(0deg, #50474714 30%, #0f121600 100%)",
        boxShadow: "0px 3px 3px -1px #212222",
      }}
      className="flex flex-col justify-center items-center gap-4 p-4 pb-8 pt-0 rounded-xl "
    >
      <span className="text-5xl max-lg:text-4xl max-md:text-3xl max-sm:text-2xl text-shadow w-full ">
        {title}
      </span>
      <div className="w-full h-1 rounded-lg bg-primary-100 box-shadow"></div>
      <CarouselUI games={games} />
      <div className="flex items-center  z-10">
        <span className="description !bottom-0 !p-4 max-sm:!p-0 !w-full">
          {description}
        </span>
      </div>
    </div>
  );
};

export default FeatureShowcaseCarousel;
