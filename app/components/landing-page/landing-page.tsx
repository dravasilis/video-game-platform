import React from "react";
import Banner from "../banner/banner";
import Link from "next/link";
import "../../globals.css";
import { CarouselUI } from "../carousel/CardsCarousel";
import { fetchHelper } from "@/app/helpers/fetch-helper";
import FeatureShowcase from "../feature-showcase/feature-showcase";
import { HttpResponse } from "@/app/models/httpResponse";
import { Game } from "@/app/models/game";
const LandingPage = async () => {
	const currentDate = new Date().toISOString().split("T")[0];
	console.log(currentDate);

	const [upcomingGamesRes, vintageGamesRes, mostRatedGamesRes]: [
		HttpResponse<Game>,
		HttpResponse<Game>,
		HttpResponse<Game>
	] = await Promise.all([
		fetchHelper("/games", {
			ordering: "released",
			dates: `${currentDate},${currentDate.substring(0, 4)}-12-31`,
		}),
		fetchHelper("/games", {
			ordering: "ratings_count",
			dates: "1995-01-01,2005-01-01",
		}),
		fetchHelper("/games", { ordering: "-metacritic" }),
	]);
	console.log([mostRatedGamesRes]);
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
				{/* STATS */}
				<div className="flex items-center gap-4 pt-10 pb-36">
					<div className="flex flex-col items-center gap-4">
					<div className="text-3xl tracking-wide flex gap-2 items-center">
							{/* <span className="h-3 w-3 rounded-full bg-primary-100"></span> */}
							<span>Games</span>
						</div>
					<span className="text-4xl font-bold">{mostRatedGamesRes.count}</span>
					</div>
				</div>
				{/* DESCRIPTION  */}
				<div className="flex flex-col gap-4 py-12">
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
				<FeatureShowcase
					games={upcomingGamesRes.results}
					title="EXPLORE GAMES RELEASING SOON"
				/>
				<FeatureShowcase
					games={vintageGamesRes.results}
					title="EXPLORE OLD GEMS"
				/>
				<FeatureShowcase
					games={mostRatedGamesRes.results}
					title="EXPLORE TOP RATED GAMES"
				/>
			</div>
		</div>
	);
};

export default LandingPage;
