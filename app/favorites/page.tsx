"use client";
import {
  listenToFavorites,
  selectFavorites,
} from "@/redux/features/favorites/favoritesSlice";
import { selectUser } from "@/redux/features/user/userSlice";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainNav from "../components/main-nav/main-nav";
import FavoriteCard from "../components/shared/favorite-card/favorite-card";

const Favorites = () => {
  const favoriteGames = useSelector(selectFavorites).favorites;
  const currentUser = useSelector(selectUser).user;
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(listenToFavorites(currentUser?.uid ?? ""));
  }, [currentUser]);
  return (
    <>
      <MainNav header="My Favorite Games List">
        <div className="flex flex-wrap gap-4">
          {/* {favoriteGames.map(() => (
            <FavoriteCard />
          ))} */}
        </div>
      </MainNav>
    </>
  );
};

export default Favorites;
