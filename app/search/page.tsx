"use client";
import React, { useEffect } from "react";
import MainNav from "../components/main-nav/main-nav";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
	fetchAllGames,
	selectAllGames,
} from "@/redux/features/games/gamesSlice";
import MainCard from "../components/shared/main-card/main-card";
import { Loader } from "lucide-react";
import Pagination from "../components/shared/pagination/pagination";

const SeachResults = () => {
	const searchParams = useSearchParams();

	const searchTerm = searchParams.get("term");
	const dispatch = useDispatch<AppDispatch>();

	// Dispatch the action only once on component mount
	useEffect(() => {
		dispatch(
			fetchAllGames({
				search: searchTerm ?? undefined,
				search_exact: true,
				ordering: "-added",
			})
		);
	}, [dispatch]); // Empty dependency array means this will only run once when the component mounts
	const SearchResults = useSelector(selectAllGames);
	console.log(SearchResults);

	return (
		<div>
			<MainNav header="Search results" results={SearchResults?.count}>
				<div className="flex flex-col gap-8  px-20 max-lg:px-8 max-sm:px-0  z-10">
				<div className="flex items-center gap-2">
					<span className="text-primary-150"> Search:</span>
					<b> {searchTerm}</b>
				</div>
					{SearchResults?.results ? (
						<div className="grid grid-cols-5 max-[1700px]:grid-cols-5 max-2xl:grid-cols-4 max-lg:grid-cols-3  max-md:!grid-cols-2  gap-y-8 w-full justify-center ">
							{SearchResults.results.map((game) => (
								<MainCard key={game.id} data={game} />
							))}
						</div>
					) : (
						<Loader />
					)}
					{SearchResults && (
						<Pagination
							count={SearchResults?.count ?? 0}
							length={SearchResults?.results.length ?? 0}
							dispatch={dispatch} // Pass dispatch
							fetchAction={fetchAllGames} // Pass fetch action for games
						/>
					)}
				</div>
			</MainNav>
		</div>
	);
};

export default SeachResults;
