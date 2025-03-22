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
			<MainNav>
				<div className="flex flex-col gap-8  px-20 max-lg:px-10 max-sm:px-4 py-6">
					<div className="flex justify-between w-full items-center">
						<h1 className="text-5xl max-sm:text-3xl text-primary-100 font-bold  ">
							Games
						</h1>
						<h3 className="text-primary-250 max-sm:text-xs">
							{popularGames?.count.toLocaleString()} results
						</h3>
					</div>
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
              next={popularGames.next}
              previous={popularGames.previous}
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
