import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import "./CardsCarousel.scss";
import { Game } from "@/app/models/game";

interface props {
  games: Game[];
}
export function CarouselUI({ games }: props) {
  return (
    <Carousel opts={{ slidesToScroll: 6 }} className="w-full max-w-[100%] py-4">
      <CarouselContent className="px-1">
        {games.map((game: Game, index: number) => (
          <CarouselItem key={index} className="  md:basis-1/3 lg:basis-1/6">
            <Card className="card">
              <CardContent className="cardContent">
                <div className="card-overlay ">
                  <span className="text-transparent">{game.name}</span>
                  <span className="text-transparent">{game.released}</span>
                </div>
                <img
                  style={{ boxShadow: "#41606f73 0px 0px 1px 2px" }}
                  src={game.background_image}
                  className="w-full object-cover duration-100 h-full rounded-md"
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
        <CarouselItem className="smd:basis-1/3 lg:basis-1/6">
          <Card className="card seeAll">
            <CardContent className="cardContent ">
              <div className="flex gap-2 items-center">
                <span>See All</span>
                <img src="/svg/next.svg" width={20} alt="" />
              </div>
            </CardContent>
          </Card>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="bg-white ml-7 w-10 h-10  text-black hover:bg-gray-300 hover:cursor-pointer" />
      <CarouselNext className="bg-white text-black mr-7 w-10 h-10 hover:bg-gray-300 hover:cursor-pointer" />
    </Carousel>
  );
}
