import React from "react";
import { CarouselUI } from "../carousel/CardsCarousel";
import { Game } from "@/app/models/game";
import "./feature-showcase-carousel.css";
interface Props {
  games: Game[];
  title: string;
  description: string;
}

const FeatureShowcaseCarousel = ({ games, title, description }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-5xl max-lg:text-4xl max-md:text-3xl max-sm:text-2xl text-shadow w-full ">
        {title}
      </span>
      <div className="w-full h-1 rounded-lg bg-primary-100 box-shadow"></div>
      <div className="flex flex-col px-4 pb-6 rounded-lg cardEffect">
        <CarouselUI games={games} />
        <div className="flex items-center  z-10">
          <span className="description !text-primary-100 !bottom-0 !p-4 max-sm:!p-0 !w-full">
            {description}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcaseCarousel;
