"use client";
import {
  fetchPopularGames,
  selectPopularGames,
} from "@/redux/features/games/gamesSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainNav from "../components/main-nav/main-nav";
import { AppDispatch } from "@/redux/store";
import MainCard from "../components/shared/main-card/main-card";
import Banner from "../components/landing-page/banner/banner";

const Games = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Dispatch the action only once on component mount
  useEffect(() => {
    dispatch(fetchPopularGames());
  }, [dispatch]); // Empty dependency array means this will only run once when the component mounts

  const popularGames = useSelector(selectPopularGames);
  console.log(popularGames);

  return (
    <>
      <MainNav>
        <h1 className="text-5xl max-sm:text-3xl text-primary-100 font-bold px-36">
          Games
        </h1>
        <div className="flex flex-wrap gap-12 max-lg:gap-4 max-xl:gap-7 w-full px-4 max-sm:p-0 justify-center py-8">
          {popularGames?.results.map((game, index) => (
            <MainCard key={index} game={game} />
          ))}
        </div>
      </MainNav>
    </>
  );
};

export default Games;
