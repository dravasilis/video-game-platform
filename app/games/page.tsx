"use client";
import {
	fetchAllGames,
	selectAllGames,
} from "@/redux/features/games/gamesSlice";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainNav from "../components/main-nav/main-nav";
import Loader from "../components/shared/loader/loader";
import MainCard from "../components/shared/main-card/main-card";
import Pagination from "../components/shared/pagination/pagination";
import Banner from "../components/landing-page/banner/banner";

const Games = () => {
	const dispatch = useDispatch<AppDispatch>();

	// Dispatch the action only once on component mount
	useEffect(() => {
		dispatch(fetchAllGames());
	}, [dispatch]); // Empty dependency array means this will only run once when the component mounts

	const popularGames = useSelector(selectAllGames);
	console.log(popularGames);

	return (
		<>
			<MainNav header="Games" results={popularGames?.count}>
				<Banner banner="gamesbg2.jpg" />
				<div className="flex flex-col gap-8  px-20 max-lg:px-8 max-sm:px-0  z-10">
					{popularGames?.results ? (
						<div className="grid grid-cols-5 max-[1700px]:grid-cols-5 max-2xl:grid-cols-4 max-lg:grid-cols-3  max-md:!grid-cols-2  gap-y-8 w-full justify-center ">
							{popularGames.results.map((game) => (
								<MainCard key={game.id} data={game} />
							))}
						</div>
					) : (
						<Loader />
					)}
					{popularGames && (
						<Pagination
							count={popularGames?.count ?? 0}
							length={popularGames?.results.length ?? 0}
							dispatch={dispatch} // Pass dispatch
							fetchAction={fetchAllGames} // Pass fetch action for games
						/>
					)}
				</div>
			</MainNav>
		</>
	);
};

export default Games;
