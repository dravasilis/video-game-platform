import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselUI({ games }: any) {
	return (
		<Carousel
			opts={{ slidesToScroll: 5 }}
			className="w-full max-w-[70rem]  py-4"
		>
			<CarouselContent>
				{Array.from(games).map((game: any, index: number) => (
					<CarouselItem key={index} className="  md:basis-1/2 lg:basis-1/5">
						<Card className=" p-0 border-0 bg-transparent py-1">
							<CardContent className="flex aspect-square items-center justify-center p-0 w-full h-[300px] relative">
								<img
									style={{ boxShadow: "0px 0px 8px 1px #1d7ca787;" }}
									src={game.image.thumb_url}
									className="w-full object-fill h-full rounded-md"
								/>
								{/* <span className="absolute bottom-0 left-0 glass font-bold px-2 py-1 w-full text-primary-100 h-[5rem] text-center">{game.alias??game.name}</span> */}
							</CardContent>
						</Card>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="bg-white ml-7 w-10 h-10  text-black hover:bg-gray-300 hover:cursor-pointer" />
			<CarouselNext className="bg-white text-black mr-7 w-10 h-10 hover:bg-gray-300 hover:cursor-pointer" />
		</Carousel>
	);
}
