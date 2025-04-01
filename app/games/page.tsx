"use client";
import {
  fetchAllGames,
  selectAllGames,
} from "@/redux/features/games/gamesSlice";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainNav from "../components/main-nav/main-nav";
import Loader from "../components/shared/loader/loader";
import MainCard from "../components/shared/main-card/main-card";
import Pagination from "../components/shared/pagination/pagination";
import Banner from "../components/landing-page/banner/banner";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "./[id]/page.module.scss";
const Games = () => {
  const dispatch = useDispatch<AppDispatch>();
  const popularGames = useSelector(selectAllGames);
  const searchParams = useSearchParams();
  const genreParam = searchParams.get("genres") ?? undefined;
  console.log(genreParam);

  // Dispatch the action only once on component mount
  useEffect(() => {
    // eslint-disable-next-line  @typescript-eslint/no-unused-expressions
    !popularGames.popularGames && dispatch(fetchAllGames());
  }, [dispatch, popularGames]);
  return (
    <>
      <MainNav header="Games" results={popularGames.popularGames?.count ?? 0}>
        <Banner banner="gamesbg2.jpg" customBrightness={true} />
        <div className="flex flex-col gap-8  px-20 max-lg:px-8 max-sm:px-0  z-10">
          <div className={styles.pill}>{genreParam}</div>
          {!popularGames.loading ? (
            <div className="grid justify-items-center  grid-cols-5 max-[1700px]:grid-cols-5 max-2xl:grid-cols-4 max-lg:grid-cols-3  max-md:!grid-cols-2 min-[1700px]:gap-x-12  gap-y-8 w-full ">
              {(popularGames.popularGames?.count ?? 0) > 0 ? (
                popularGames.popularGames?.results.map((game) => (
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
          {popularGames.popularGames && (
            <Pagination
              count={popularGames.popularGames?.count ?? 0}
              length={popularGames.popularGames?.results?.length ?? 0}
              dispatch={dispatch} // Pass dispatch
              fetchAction={fetchAllGames} // Pass fetch action for games
            />
          )}
        </div>
      </MainNav>
    </>
  );
};

export default Games;
