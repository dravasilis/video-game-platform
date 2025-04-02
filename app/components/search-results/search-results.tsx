"use client";
import {
  fetchAllGames,
  clearGames,
  selectAllGames,
  fetchSearchedGames,
  selectSearchedGames,
} from "@/redux/features/games/gamesSlice";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import Loader from "../shared/loader/loader";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../landing-page/banner/banner";
import MainNav from "../main-nav/main-nav";
import MainCard from "../shared/main-card/main-card";
import Pagination from "../shared/pagination/pagination";
import Image from "next/image";
const SearchResults = () => {
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get("term");
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(
      fetchSearchedGames({
        search: searchTerm ?? undefined,
        search_exact: true,
      })
    );
    return () => {
      //initialize games to the initial state
      dispatch(clearGames());
    };
  }, [dispatch, searchTerm]);
  const searchResults = useSelector(selectSearchedGames);
  console.log(searchResults);

  return (
    <div>
      <MainNav
        header="Search results"
        results={searchResults.searchedGames?.count}
      >
        <Banner banner="gamesbg6.jpg" customBrightness={true} />
        <div className="flex flex-col gap-8  px-20 max-lg:px-8 max-sm:px-0  z-10">
          <div className="flex items-center gap-2">
            <span className="text-primary-150"> Search for:</span>
            <b className="text-primary-300 text-lg"> {searchTerm}</b>
          </div>
          {searchResults.searchedGames?.count === 0 && (
            <div className="flex items-center gap-2 justify-center">
              <Image src="/svg/sad.svg" width={30} height={30} alt="sad" />
              <h1 className="text-2xl  max-lg:text-xl max-sm:text-sm text-primary-100">
                Whoopsie! We couldn&apos;t find anything that matches your
                search
              </h1>
            </div>
          )}
          {!searchResults.loading ? (
            <div className="grid justify-items-center  grid-cols-5 max-[1700px]:grid-cols-5 max-2xl:grid-cols-4 max-lg:grid-cols-3  max-md:!grid-cols-2 min-[1700px]:gap-x-12  gap-y-8 w-full   ">
              {searchResults.searchedGames?.results.map((game) => (
                <Link href={`/games/${game.id}`} key={game.id}>
                  <MainCard key={game.id} data={game} />
                </Link>
              ))}
            </div>
          ) : (
            <Loader />
          )}
          {(searchResults.searchedGames?.count ?? 0) > 0 && (
            <Pagination
              count={searchResults.searchedGames?.count ?? 0}
              length={searchResults.searchedGames?.results.length ?? 0}
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

export default SearchResults;
