"use client";
import React, { useEffect, useState } from "react";
import styles from "./media-carousel.module.css";
import { Screenshot, Trailer } from "@/app/models/game";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Modal from "react-modal";

interface Props {
  trailer?: Trailer;
  screenshots: Screenshot[];
}

const MediaCarousel = ({ trailer, screenshots }: Props) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [slidesToScroll, setSlidesToScroll] = React.useState(2);
  useEffect(() => {
    const width = window.innerWidth;
    if (width <= 900) setSlidesToScroll(1); // 2xl:basis-1/6
    else setSlidesToScroll(2); // Default for smaller screens
  }, []);

  return (
    <Carousel opts={{ slidesToScroll }} className="w-full">
      <CarouselContent className="p-3 max-sm:pr-12">
        {trailer && (
          <CarouselItem className=" basis-1/2 max-[900px]:basis-1/1 ">
            <Card className={styles.card}>
              <CardContent className={styles.cardContent}>
                <div className="flex flex-col gap-2 rounded-xl bg-black h-full w-full pb-4">
                  <video
                    controls
                    preload="none"
                    className="rounded-xl   "
                    poster={trailer.preview}
                  >
                    <source src={trailer.data.max} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        )}
        {screenshots.map((screenshot, index) => (
          <CarouselItem key={index} className="basis-1/2 max-[900px]:basis-1/1">
            <Card className={styles.card}>
              <CardContent className={styles.cardContent}>
                <Image
                  src={screenshot.image}
                  width={1280}
                  height={720}
                  alt="screenshot"
                  className="rounded-xl h-full object-cover cursor-pointer"
                  onClick={() => {
                    setSelectedImage(index);
                    document.getElementsByTagName("body")[0].style.overflow =
                      "hidden";
                  }} // Click to open
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}

        {/* Fullscreen Modal */}
        <Modal
          isOpen={(selectedImage ?? -1) >= 0}
          onRequestClose={() => setSelectedImage(null)}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
          ariaHideApp={false} // Avoid accessibility warning in Next.js
        >
          <div className="relative">
            <button
              className="fixed top-4 right-4 text-white   px-4 py-2 rounded-md hover:cursor-pointer"
              onClick={() => {
                setSelectedImage(null);
                document.getElementsByTagName("body")[0].style.overflow =
                  "auto";
              }}
            >
              Close ✖
            </button>
            <Carousel
              opts={{ slidesToScroll: 1, startIndex: selectedImage ?? 0 }}
              className="w-full"
            >
              <CarouselContent className="p-3 max-sm:pr-12">
                {trailer && (
                  <CarouselItem className=" basis-1/1 ">
                    <Card className={styles.card}>
                      <CardContent className={styles.cardContent}>
                        <div className="flex flex-col gap-2 rounded-xl bg-black h-full w-full pb-4">
                          <video
                            controls
                            preload="none"
                            className="rounded-xl   "
                            poster={trailer.preview}
                          >
                            <source src={trailer.data.max} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                )}
                {screenshots.map((screenshot, index) => (
                  <CarouselItem key={index} className="basis-1/1">
                    <Card className={styles.card}>
                      <CardContent className={styles.cardContent}>
                        <Image
                          src={screenshot.image}
                          width={1280}
                          height={720}
                          alt="screenshot"
                          className="rounded-xl h-full object-cover cursor-pointer"
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </Modal>
      </CarouselContent>
      <div className="max-sm:hidden">
        <CarouselPrevious className="bg-white ml-7 max-sm:ml-12 w-10 h-10  text-black hover:bg-gray-300 hover:cursor-pointer" />
        <CarouselNext className="bg-white text-black mr-7 max-sm:mr-12 w-10 h-10 hover:bg-gray-300 hover:cursor-pointer" />
      </div>
    </Carousel>
  );
};

export default MediaCarousel;
