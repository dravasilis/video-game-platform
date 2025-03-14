import React from "react";
import Banner from "../banner/banner";
import Link from "next/link";
import "../../globals.css"; 
import { CarouselUI } from "../carousel/CardsCarousel";
import { fetchHelper } from "@/app/helpers/fetch-helper";
const LandingPage =  async () => {
  const res = await  fetchHelper('/games') 
  console.log(res.results[0]);
  
	return (
		<div>
      
			<Banner />
			<div className="z-10 relative top-[15rem] px-32 flex flex-col gap-4">
				{/* TITLE  */}
				<div className="flex gap-2 items-center">
					<img src="favicon.ico" width={50} alt="" />
					<span className="text-5xl text-shadow tracking-wide">Gamepedia</span>
				</div>
				{/* SUBTITLE  */}
				<span className="text-2xl text-primary-200">
					Explore, discover, save your favourite games{" "}
				</span>
				{/* START BROWSING  */}
				<div className="flex w-full justify-end">
					<Link href={"/home"} className="underlineEffect flex gap-2">
						<span className="text-shadow">Start browsing</span>
						<img src="/svg/next.svg" width={20} alt="" />
					</Link>
				</div>
				{/* DESCRIPTION  */}
				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-2 text-3xl">
						<span>What is </span>
						<span className="text-shadow tracking-wide">Gamepedia</span>?
					</div>
					<span className="text-xl text-primary-200">
						Gamepedia is your ultimate gaming wikipedia, where you can explore
						and discover thousands of games while saving your favorites to your
						personal collection and much more.
					</span>
				</div>
				<div className="flex flex-col justify-center items-center gap-8 py-24">
					<span className="text-5xl font-bold">Explore new games</span>
						<CarouselUI games={res.results}/>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
