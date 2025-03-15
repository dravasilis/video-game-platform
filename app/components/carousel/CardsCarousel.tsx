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
export function CarouselUI({ games }: any) {
	return (
		<Carousel
			opts={{ slidesToScroll: 5 }}
			className="w-full max-w-[100%]  py-4"
		>
			<CarouselContent className="">
				{Array.from(games).map((game: any, index: number) => (
					<CarouselItem key={index} className="  md:basis-1/3 lg:basis-1/5">
						<Card className=" p-0 border-0 bg-transparent py-1 hover:cursor-pointer box">
							<CardContent className=" box-inner flex aspect-square items-center justify-center p-0 w-full h-[30rem] relative heading-frame">
								<div className="card-overlay duration-200 w-full h-full  absolute top-0 left-0    flex flex-col gap-2 items-center justify-center px-2 text-lg text-center">
									<span className="text-transparent">
										{game.alias ?? game.name}
									</span>
									<span className="text-transparent">
										{game.expected_release_year ??
											(game.original_release_date ?? 'N/A').substring(0, 4) }
									</span>
								</div>
								<img
									style={{ boxShadow: "#41606f87 0px 0px 1px 2px" }}
									src={game.image.super_url}
									className="w-full object-fill h-full rounded-md"
								/>
							</CardContent>
						</Card>
					</CarouselItem>
				))}
				<CarouselItem   className="  md:basis-1/3 lg:basis-1/5">
						<Card className=" p-0 border-0 bg-transparent py-1 hover:cursor-pointer box">
							<CardContent className=" box-inner flex gap-4 aspect-square items-center justify-center p-0 w-full h-[30rem] relative heading-frame">
								<span>See All</span>
						<img src="/svg/next.svg" width={20} alt="" />
							 
							</CardContent>
						</Card>
					</CarouselItem>
			</CarouselContent>
			<CarouselPrevious className="bg-white ml-7 w-10 h-10  text-black hover:bg-gray-300 hover:cursor-pointer" />
			<CarouselNext className="bg-white text-black mr-7 w-10 h-10 hover:bg-gray-300 hover:cursor-pointer" />
		</Carousel>
	);
}
