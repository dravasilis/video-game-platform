"use client";
import Banner from "@/app/components/landing-page/banner/banner";
import MainNav from "@/app/components/main-nav/main-nav";
import Loader from "@/app/components/shared/loader/loader";
import MainCard from "@/app/components/shared/main-card/main-card";
import Pagination from "@/app/components/shared/pagination/pagination";
import {
  fetchAllGames,
  fetchTopRatedGames,
} from "@/redux/features/games/gamesSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const TopRated = () => {
  const dispatch = useDispatch<AppDispatch>();
  const topRated = useSelector((state: RootState) => state.games.topRatedGames);
  return (
    <>
      <MainNav header="Top Rated Games" results={topRated?.count ?? 0}>
        <Banner banner="gamesbg2.jpg" customBrightness={true} />
        <div className="flex flex-col gap-8  px-20 max-lg:px-8 max-sm:px-0  z-10">
          {topRated ? (
            <div className="grid justify-items-center  grid-cols-5 max-[1700px]:grid-cols-5 max-2xl:grid-cols-4 max-lg:grid-cols-3  max-md:!grid-cols-2 min-[1700px]:gap-x-12  gap-y-8 w-full ">
              {(topRated?.count ?? 0) > 0 ? (
                topRated?.results.map((game) => (
                  <Link href={`/games/${game.id}`} key={game.id}>
                    <MainCard data={game} />
                  </Link>
                ))
              ) : (
                <div>Something went wrong</div>
              )}
            </div>
          ) : (
            <Loader />
          )}
          <Pagination
            count={topRated?.count ?? 0}
            length={topRated?.results?.length ?? 0}
            dispatch={dispatch} // Pass dispatch
            fetchAction={fetchTopRatedGames} // Pass fetch action for games
            pg={{ dates: "2012-01-01,2025-01-01" }}
          />
        </div>
      </MainNav>
    </>
  );
};

export default TopRated;
