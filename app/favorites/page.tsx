"use client";
import {
  listenToFavorites,
  selectFavorites,
} from "@/redux/features/favorites/favoritesSlice";
import { selectUser } from "@/redux/features/user/userSlice";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainNav from "../components/main-nav/main-nav";
import FavoriteCard from "../components/shared/favorite-card/favorite-card";
import Loader from "../components/shared/loader/loader";

const Favorites = () => {
  const favoritesState = useSelector(selectFavorites);
  const currentUser = useSelector(selectUser).user;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log(favoritesState);

    dispatch(listenToFavorites(currentUser?.uid ?? ""));
  }, [currentUser]);

  return (
    <>
      <MainNav
        header="My Favorite Games List"
        results={favoritesState.favorites.length ?? 0}
      >
        {favoritesState.loading ? (
          <Loader />
        ) : favoritesState.error ? (
          <div>{favoritesState.error}</div>
        ) : favoritesState.favorites.length > 0 ? (
          <div className="flex flex-wrap gap-8 px-20 max-lg:px-8 max-sm:px-0 py-4">
            <div className="w-full h-1 rounded-lg bg-primary-100 box-shadow"></div>

            {favoritesState.favorites.map((game) => (
              <div key={game.id} className="w-full">
                <Link href={`/games/${game.id}`} key={game.id}>
                  <FavoriteCard data={game} isFavorite={true}></FavoriteCard>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div>No favorite games saved yet!</div>
        )}
      </MainNav>
    </>
  );
};

export default Favorites;
