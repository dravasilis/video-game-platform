"use client";
import React from "react";
import styles from "./video-carousel.module.css";
import { Trailer } from "@/app/models/game";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  trailers: Trailer[];
}

const VideoCarousel = ({ trailers }: Props) => {
  const [slidesToScroll, setSlidesToScroll] = React.useState(1);

  return (
    <Carousel
      opts={{ slidesToScroll }}
      className="w-[65rem] max-xl:w-[32rem] max-w-[100%] pt-4"
    >
      <CarouselContent>
        {trailers.map((trailer: Trailer, index: number) => (
          <CarouselItem key={index} className=" basis-1/1  ">
            <Card className={styles.card}>
              <CardContent className={styles.cardContent}>
                <div
                  key={index}
                  className="flex flex-col gap-2 rounded-xl bg-black h-full w-max pb-4"
                >
                  <video
                    controls
                    preload="none"
                    className="rounded-xl max-sm:h-[10rem] w-max "
                    poster={trailer.preview}
                  >
                    <source src={trailer.data.max} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <span className="text-primary-100 font-bold px-4">
                    {trailer.name}
                  </span>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="bg-white ml-7 w-10 h-10  text-black hover:bg-gray-300 hover:cursor-pointer" />
      <CarouselNext className="bg-white text-black mr-7 w-10 h-10 hover:bg-gray-300 hover:cursor-pointer" />
    </Carousel>
  );
};

export default VideoCarousel;
