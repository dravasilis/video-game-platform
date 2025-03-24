"use client";
import Banner from "@/app/components/landing-page/banner/banner";
import MainNav from "@/app/components/main-nav/main-nav";
import { fetchGame, selectGameById } from "@/redux/features/games/gamesSlice";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const GamePage = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { id } = useParams(); //  Get id from the URL
	// Dispatch the action only once on component mount
	useEffect(() => {
		dispatch(fetchGame(Number(id)));
	}, [dispatch]);
	const game = useSelector(selectGameById);
	console.log(game);

	return (
		<div>
			<MainNav>
				{game ? (
					<>
						<Banner
							href={game?.background_image_additional}
							customBrightness={true}
						/>
						<div className="flex max-sm:flex-col gap-12 max-sm:gap-6 z-10 mt-[12rem] max-sm:mt-[4rem] px-16 max-sm:px-0">
							<Image
								src={game.background_image}
								alt="gameImage"
								width={1920}
								height={1080}
								className="w-[300px] shadow-[0px_0px_9px_2px_#121212] h-[350px] max-sm:w-full max-sm:h-full object-cover rounded-lg relative bottom-4"
							/>
							<div className="flex flex-col gap-8 ">
								<h1 className="text-5xl max-sm:text-2xl font-bold">{game.name}</h1>
								<h2
									className="text-lg text-primary-250 leading-[28px] "
									dangerouslySetInnerHTML={{ __html: game.description }}
								></h2>
							</div>
						</div>
					</>
				) : (
					"Game not found"
				)}
			</MainNav>
		</div>
	);
};

export default GamePage;
