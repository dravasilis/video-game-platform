"use client";
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
import Image from "next/image";
import nextSvg from "../../../../public/svg/next.svg";
import Link from "next/link";
interface props {
  games: Game[];
}
export function CarouselUI({ games }: props) {
  const [slidesToScroll, setSlidesToScroll] = React.useState(1);

  React.useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      if (width >= 1536) setSlidesToScroll(6); // 2xl:basis-1/6
      else if (width >= 1280) setSlidesToScroll(5); // xl:basis-1/5
      else if (width >= 1024) setSlidesToScroll(4); // lg:basis-1/4
      else if (width >= 768) setSlidesToScroll(3); // md:basis-1/3
      else if (width >= 640) setSlidesToScroll(2); // sm:basis-1/2
      else setSlidesToScroll(1); // Default for smaller screens
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  return (
    <Carousel opts={{ slidesToScroll }} className="w-full max-w-[100%] pt-4">
      <CarouselContent className="px-1">
        {games.map((game: Game, index: number) => (
          <CarouselItem
            key={index}
            className="sm:basis-1/2  md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6"
          >
            <Link href={`/games/${game.id}`}>
              <Card className="card">
                <CardContent className="cardContent">
                  <div className="card-overlay ">
                    <span className="text-transparent font-bold">
                      {game.name}
                    </span>
                    <span className="text-transparent">{game.released}</span>
                  </div>
                  <Image
                    unoptimized
                    src={game.background_image ?? "/svg/game.svg"}
                    width={1920}
                    height={600}
                    alt="carouselImage"
                    className="w-full object-cover duration-100 h-full rounded-md shadow-[0px_0px_1px_2px_#41606f73]"
                  />
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
        <CarouselItem className="smd:basis-1/3 lg:basis-1/6">
          <Card className="card seeAll">
            <CardContent className="cardContent ">
              <div className="flex gap-2 items-center">
                <span>See All</span>
                <Image src={nextSvg} width={30} height={30} alt="next" />
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
