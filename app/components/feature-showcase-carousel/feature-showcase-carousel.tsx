import React from "react";
import { CarouselUI } from "../carousel/CardsCarousel";
import { Game } from "@/app/models/game";

interface Props {
  games: Game[];
  title: string;
}

const FeatureShowcaseCarousel = ({ games, title }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 py-4">
      <span className="text-5xl max-lg:text-4xl max-md:text-3xl max-sm:text-2xl  w-full ">
        {title}
      </span>
      <div className="w-full h-1 rounded-lg bg-primary-100 box-shadow"></div>
      <CarouselUI games={games} />
    </div>
  );
};

export default FeatureShowcaseCarousel;
