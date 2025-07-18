"use client";
import {
  fetchUpcomingGames,
  selectUpcomingGames,
} from "@/redux/features/games/gamesSlice";
import { AppDispatch } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainNav from "../components/main-nav/main-nav";
import Banner from "../components/landing-page/banner/banner";
import Link from "next/link";
import MainCard from "../components/shared/main-card/main-card";
import Loader from "../components/shared/loader/loader";
import Pagination from "../components/shared/pagination/pagination";
import {
  listenToFavorites,
  selectFavorites,
} from "@/redux/features/favorites/favoritesSlice";
import { selectUser } from "@/redux/features/user/userSlice";

const UpcomingGames = () => {
  const dispatch = useDispatch<AppDispatch>();
  const upcomingGames = useSelector(selectUpcomingGames);
  const userFavorites = useSelector(selectFavorites).favorites;
  const currentUser = useSelector(selectUser).user;
  useEffect(() => {
    if (!upcomingGames) {
      dispatch(fetchUpcomingGames());
      dispatch(listenToFavorites(currentUser?.uid ?? ""));
    }
  }, [currentUser]);
  return (
    <div>
      <MainNav header="Upcoming Games" results={upcomingGames?.count ?? 0}>
        <Banner banner="gamesbg2.jpg" customBrightness={true} />
        <div className="flex flex-col gap-8  px-20 max-lg:px-8 max-sm:px-0  z-[9]">
          {upcomingGames ? (
            <div className="grid justify-items-center  grid-cols-5 max-[1700px]:grid-cols-5 max-2xl:grid-cols-4 max-lg:grid-cols-3  max-md:!grid-cols-2 min-[1700px]:gap-x-12  gap-y-8 w-full ">
              {(upcomingGames.count ?? 0) > 0 ? (
                upcomingGames.results.map((game) => (
                  <Link href={`/games/${game.id}`} key={game.id}>
                    <MainCard
                      data={game}
                      isFavorite={
                        !!userFavorites.find((_game) => _game.id === game.id)
                      }
                    />
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
            count={upcomingGames?.count ?? 0}
            length={upcomingGames?.results?.length ?? 0}
            dispatch={dispatch} // Pass dispatch
            fetchAction={fetchUpcomingGames} // Pass fetch action for games
          />
        </div>
      </MainNav>
    </div>
  );
};

export default UpcomingGames;
