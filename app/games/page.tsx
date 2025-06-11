"use client";
import {
  fetchAllGames,
  selectAllGames,
} from "@/redux/features/games/gamesSlice";
import { selectPlatforms } from "@/redux/features/platforms/platformsSlice";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/landing-page/banner/banner";
import MainNav from "../components/main-nav/main-nav";
import AppliedFilter from "../components/shared/applied-filter/applied-filter";
import Filters from "../components/shared/filters/filters";
import Loader from "../components/shared/loader/loader";
import MainCard from "../components/shared/main-card/main-card";
import Pagination from "../components/shared/pagination/pagination";
import { useEffect } from "react";
import { getFavorites } from "../helpers/favorites";
import { auth } from "@/lib/firebase";
import { selectUser } from "@/redux/features/user/userSlice";
const Games = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const popularGames = useSelector(selectAllGames);
  const platforms = useSelector(selectPlatforms);
  const currentUserState = useSelector(selectUser);
  const searchParams = useSearchParams();
  const genreParam = searchParams.get("genres") ?? undefined;
  const platformParam = searchParams.get("platforms");
  const platformsNames = platforms.platforms?.results
    .filter((platform) =>
      platformParam?.split(",").includes(platform.id.toString())
    )
    .map((p) => p.name);
  const publisherParam = searchParams.get("publishers") ?? undefined;
  const devloperParam = searchParams.get("developers") ?? undefined;

  const clearFilter = (
    filterTitle: string,
    filterValue: string,
    isPlatforms?: boolean
  ) => {
    const searchParams = new URLSearchParams(window.location.search);
    const values = searchParams.getAll(filterTitle)[0].split(","); // get the parma's values
    const updatedValues = isPlatforms
      ? values.filter(
          (value) =>
            value.localeCompare(
              String(
                platforms.platforms?.results.find((p) => p.name === filterValue)
                  ?.id
              ) ?? "not found"
            ) !== 0
        ) // remove the value you want to delete
      : values.filter((value) => value.localeCompare(filterValue) !== 0); // remove the value you want to delete
    searchParams.delete(filterTitle); // delete the filter title
    if (updatedValues.length) {
      searchParams.set(filterTitle, updatedValues.join(","));
    }
    searchParams.set("page", "1");
    const newQuery = searchParams.toString();
    router.push(`${window.location.pathname}?${newQuery || "page=1"}`);
  };

  useEffect(() => {
    if (currentUserState.user) getFavorites(currentUserState.user);
  }, [currentUserState]);
  return (
    <>
      <MainNav header="Games" results={popularGames.popularGames?.count ?? 0}>
        <Banner banner="gamesbg2.jpg" customBrightness={true} />
        <div className="flex flex-col gap-8  px-20 max-lg:px-8 max-sm:px-0  z-10">
          <Filters />
          <div className="flex gap-4 items-center">
            {(genreParam?.split(",").length ?? 0) > 0 &&
              genreParam
                ?.split(",")
                .map((genre, index) => (
                  <AppliedFilter
                    key={index}
                    filterName="Genre"
                    filterTitle="genres"
                    filterValue={genre}
                    clearFilter={clearFilter}
                  />
                ))}
            {(platformParam?.split(",").length ?? 0) > 0 &&
              platformParam
                ?.split(",")
                .map((platform, index) => (
                  <AppliedFilter
                    key={index}
                    filterName="Platform"
                    filterTitle="platforms"
                    filterValue={platformsNames?.[index] ?? platform}
                    isPlatforms={true}
                    clearFilter={clearFilter}
                  />
                ))}
            {(publisherParam?.split(",").length ?? 0) > 0 &&
              publisherParam
                ?.split(",")
                .map((publisher, index) => (
                  <AppliedFilter
                    key={index}
                    filterName="Publisher"
                    filterTitle="publishers"
                    filterValue={publisher}
                    clearFilter={clearFilter}
                  />
                ))}
            {(devloperParam?.split(",").length ?? 0) > 0 &&
              devloperParam
                ?.split(",")
                .map((developer, index) => (
                  <AppliedFilter
                    key={index}
                    filterName="Developer"
                    filterTitle="developers"
                    filterValue={developer}
                    clearFilter={clearFilter}
                  />
                ))}
          </div>
          {!popularGames.loading ? (
            <div className="grid justify-items-center  grid-cols-5 max-[1700px]:grid-cols-5 max-2xl:grid-cols-4 max-lg:grid-cols-3  max-md:!grid-cols-2 min-[1700px]:gap-x-12  gap-y-8 w-full ">
              {(popularGames.popularGames?.count ?? 0) > 0 &&
                popularGames.popularGames?.results.map((game) => (
                  <Link href={`/games/${game.id}`} key={game.id}>
                    <MainCard data={game} />
                  </Link>
                ))}
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
