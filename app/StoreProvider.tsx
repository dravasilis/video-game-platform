"use client";
import { useEffect, useRef } from "react";
import { Provider, useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { makeStore, AppStore } from "../redux/store";
import {
  fetchPopularGames,
  fetchTopRatedGames,
  fetchUpcomingGames,
  fetchVintageGames,
} from "@/redux/features/games/gamesSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
