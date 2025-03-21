"use client";
import {
  fetchPopularGames,
  selectPopularGames,
} from "@/redux/features/games/gamesSlice";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainNav from "../components/main-nav/main-nav";
import Loader from "../components/shared/loader/loader";
import MainCard from "../components/shared/main-card/main-card";

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
        <div className="flex flex-col gap-8  px-20 max-lg:px-10 max-sm:px-4 py-6">
          <h1 className="text-5xl max-sm:text-3xl text-primary-100 font-bold  ">
            Games
          </h1>
        {
          popularGames?.results
          ?   <div className="grid grid-cols-5 max-[1700px]:grid-cols-5 max-2xl:grid-cols-4 max-lg:grid-cols-3  max-md:!grid-cols-2  gap-y-8 w-full justify-center ">
          {popularGames.results.map(game => (
            <MainCard key={game.id} game={game} />
          ))}
        </div>
        : <Loader/>
        }
        </div>
     
      </MainNav>
    </>
  );
};

export default Games;
