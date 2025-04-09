"use client";
import {
  fetchAllGames,
  selectAllGames,
} from "@/redux/features/games/gamesSlice";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/landing-page/banner/banner";
import MainNav from "../components/main-nav/main-nav";
import AppliedFilter from "../components/shared/applied-filter/applied-filter";
import Loader from "../components/shared/loader/loader";
import MainCard from "../components/shared/main-card/main-card";
import Pagination from "../components/shared/pagination/pagination";
import { fetchPlatforms, selectPlatforms } from "@/redux/features/platforms/platformsSlice";
import { useEffect } from "react";
const Games = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const popularGames = useSelector(selectAllGames);
  const platforms = useSelector(selectPlatforms);
  const searchParams = useSearchParams();

  const genreParam = searchParams.get("genres") ?? undefined;
  const platformParam = Number(searchParams.get("platforms") )|| null;
  console.log(platformParam);
  
  const publisherParam = searchParams.get("publishers") ?? undefined;
  const devloperParam = searchParams.get("developers") ?? undefined;
  
  const clearFilter = (filterName: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete(filterName); // Remove the filter

    const newQuery = searchParams.toString();
    router.push(newQuery ? `?page=1` : window.location.pathname);
  };

  useEffect(() => {
    !platforms.platforms && dispatch(fetchPlatforms());
  },[])
  return (
    <>
      <MainNav header="Games" results={popularGames.popularGames?.count ?? 0}>
        <Banner banner="gamesbg2.jpg" customBrightness={true} />
        <div className="flex flex-col gap-8  px-20 max-lg:px-8 max-sm:px-0  z-10">
          {genreParam && (
            <AppliedFilter
              filterName="Genre"
              filterSlug="genres"
              appliedFilter={genreParam}
              clearFilter={clearFilter}
            />
          )}
          {platformParam && (
            <AppliedFilter
              filterName="Platform"
              filterSlug="platforms"
              appliedFilter={ platforms.platforms?.results.find(p=>p.id === platformParam)?.name ??'Not Found'}
              clearFilter={clearFilter}
            />
          )}
          {publisherParam && (
            <AppliedFilter
              filterName="Publisher"
              filterSlug="publishers"
              appliedFilter={publisherParam}
              clearFilter={clearFilter}
            />
          )}
          {devloperParam && (
            <AppliedFilter
              filterName="Developer"
              filterSlug="developers"
              appliedFilter={devloperParam}
              clearFilter={clearFilter}
            />
          )}
          {!popularGames.loading ? (
            <div className="grid justify-items-center  grid-cols-5 max-[1700px]:grid-cols-5 max-2xl:grid-cols-4 max-lg:grid-cols-3  max-md:!grid-cols-2 min-[1700px]:gap-x-12  gap-y-8 w-full ">
              {(popularGames.popularGames?.count ?? 0) > 0 && (
                popularGames.popularGames?.results.map((game) => (
                  <Link href={`/games/${game.id}`} key={game.id}>
                    <MainCard data={game} />
                  </Link>
                ))
              )  }
            </div>
          ) : (
            <Loader />
          )}
          <Pagination
            count={popularGames.popularGames?.count ?? 0}
            length={popularGames.popularGames?.results?.length ?? 0}
            dispatch={dispatch} // Pass dispatch
            fetchAction={fetchAllGames} // Pass fetch action for games
          />
        </div>
      </MainNav>
    </>
  );
};

export default Games;
