"use client";
import {
	clearGames,
	fetchAllGames,
	selectAllGames
} from "@/redux/features/games/gamesSlice";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/landing-page/banner/banner";
import MainNav from "../components/main-nav/main-nav";
import Loader from "../components/shared/loader/loader";
import MainCard from "../components/shared/main-card/main-card";
import Pagination from "../components/shared/pagination/pagination";
const SeachResults = () => {
	const searchParams = useSearchParams();

	const searchTerm = searchParams.get("term");
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(
			fetchAllGames({
				search: searchTerm ?? undefined,
				search_exact: true,
			})
		);
		return () => {
			//initialize games to the initial state
			dispatch(clearGames());
		};
	}, [dispatch, searchTerm]);
	const searchResults = useSelector(selectAllGames);
	console.log(searchResults);

	return (
		<div>
			<MainNav header="Search results" results={searchResults.popularGames?.count  }>
				<Banner banner="gamesbg6.jpg" customBrightness={true} />
				<div className="flex flex-col gap-8  px-20 max-lg:px-8 max-sm:px-0  z-10">
					<div className="flex items-center gap-2">
						<span className="text-primary-150"> Search for:</span>
						<b className="text-primary-300 text-lg"> {searchTerm}</b>
					</div>
					{searchResults.popularGames?.count ===0 &&
					<div className="flex items-center gap-2 justify-center">
						<Image src='/svg/sad.svg' width={30} height={30} alt="sad" />
						<h1 className="text-2xl  max-lg:text-xl max-sm:text-sm text-primary-100">Whoopsie! We couldn't find anything that matches your search</h1>
					</div>
					 }	
					{!searchResults.loading ? (
						<div className="grid justify-items-center  grid-cols-5 max-[1700px]:grid-cols-5 max-2xl:grid-cols-4 max-lg:grid-cols-3  max-md:!grid-cols-2 min-[1700px]:gap-x-12  gap-y-8 w-full   ">
							{searchResults.popularGames?.results.map((game) => (
								<MainCard key={game.id} data={game} />
							))}
						</div>
					) : (
						<Loader />
					)}
					{(searchResults.popularGames?.count??0)>0 && (
						<Pagination
							count={searchResults.popularGames?.count ?? 0}
							length={searchResults.popularGames?.results.length ?? 0}
							searchParam={searchTerm ?? undefined}
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
