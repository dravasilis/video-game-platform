"use client";
import Banner from "@/app/components/landing-page/banner/banner";
import MainNav from "@/app/components/main-nav/main-nav";
import BarChart from "@/app/components/shared/bar-chart/bar-chart";
import GameDetails from "@/app/components/shared/game-details/game-details";
import GameListsStatus from "@/app/components/shared/game-lists-status/game-lists-status";
import Loader from "@/app/components/shared/loader/loader";
import MainCard from "@/app/components/shared/main-card/main-card";
import MediaCarousel from "@/app/components/shared/media-carousel/media-carousel";
import RedditPosts from "@/app/components/shared/reddit-posts/reddit-posts";
import StatCard from "@/app/components/shared/stat-card/stat";
import { GamePageStats } from "@/app/constants/stats";
import { StoreData } from "@/app/models/store";
import {
  clearSelectedGame,
  fetchGame,
  fetchGameExtraContent,
  fetchGameRedditPosts,
  fetchGameScreenshots,
  fetchGameSeries,
  fetchGameStores,
  fetchGameTrailers,
  selectGameById,
  selectGameScreenshots,
  selectGameTrailers,
} from "@/redux/features/games/gamesSlice";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.scss";
import { setSearchPressed } from "@/redux/features/search/searchSlice";

const GamePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams(); //  Get id from the URL

  useEffect(() => {
    dispatch(setSearchPressed(false));
    dispatch(fetchGame(Number(id)));
    dispatch(fetchGameTrailers(Number(id)));
    dispatch(fetchGameScreenshots(Number(id)));
    dispatch(fetchGameSeries(Number(id)));
    dispatch(fetchGameExtraContent(Number(id)));
    dispatch(fetchGameStores(Number(id)));
    dispatch(fetchGameRedditPosts(Number(id)));
    return () => {
      dispatch(clearSelectedGame());
    };
  }, [dispatch]);

  const gameState = useSelector(selectGameById);
  const trailer = useSelector(selectGameTrailers);
  const screenshots = useSelector(selectGameScreenshots);
  console.log(gameState);

  const calculateCount = (index: number): string => {
    switch (index) {
      case 0:
        return String(gameState.selectedGame?.added);
      case 1:
        return String(gameState.selectedGame?.reviews_count);
      case 2:
        return String(gameState.selectedGame?.suggestions_count);
      case 3:
        return String(gameState.selectedGame?.achievements_count);
      case 4:
        return String(gameState.selectedGame?.playtime) + "h";
      default:
        return "";
    }
  };

  const navigateToStore = (storeData: StoreData): string => {
    const storeUrl = gameState.gameStores?.results.find(
      (s) => s.store_id === storeData.store.id
    )?.url;
    return storeUrl ?? "";
  };

  return (
    <div>
      <MainNav>
        {gameState.selectedGame ? (
          <div className="flex flex-col gap-8 px-16 max-sm:px-0 max-lg:px-8 overflow-hidden">
            <Banner
              href={gameState.selectedGame?.background_image_additional}
              customBrightness={true}
            />
            <div className="flex max-sm:flex-col gap-12 max-sm:gap-0 z-10 mt-[12rem] max-sm:mt-[2rem] max-sm:px-0">
              <div className="flex flex-col gap-2">
                <Image
                  unoptimized
                  src={gameState.selectedGame.background_image}
                  alt="gameState.selectedGameImage"
                  width={1920}
                  height={1080}
                  className="w-[300px] max-lg:w-[200px] max-w-[unset]  max-lg:h-[250px] shadow-[0px_0px_9px_2px_#121212] h-[350px] max-sm:w-full max-sm:h-full object-cover rounded-lg relative bottom-4"
                />
                <div className="flex flex-col gap-4 max-sm:hidden relative py-0">
                  <GameListsStatus
                    listStatuses={gameState.selectedGame.added_by_status}
                  />
                </div>
              </div>
              {/* STATS for bigger screen */}
              <GameDetails
                title={gameState.selectedGame.name}
                rating={gameState.selectedGame.rating}
                ratingsCount={gameState.selectedGame.ratings_count}
                metacritic={gameState.selectedGame.metacritic}
                metacriticUrl={gameState.selectedGame.metacritic_url}
                tba={gameState.selectedGame.tba}
                releaseDate={gameState.selectedGame.released}
                developers={gameState.selectedGame.developers}
                reddirUrl={gameState.selectedGame.reddit_url}
                websiteUrl={gameState.selectedGame.website}
                genres={gameState.selectedGame.genres}
                platforms={gameState.selectedGame.platforms}
              />
            </div>
            {/* STATS for smaller screen */}
            <div className="sm:hidden">
              <GameListsStatus
                listStatuses={gameState.selectedGame.added_by_status}
              />
            </div>
            {/* DESCRIPTION  */}
            <div className="flex flex-col gap-4 relative py-12 max-sm:py-0">
              <h2 className="h2">Overview</h2>
              <p className="text-[16px] text-primary-350 leading-[26px]">
                {gameState.selectedGame.description_raw}
              </p>
            </div>
            {/* GAME STATS  */}
            <div
              className={`flex justify-center max-[1200px]:flex-wrap gap-8 ${styles.statCardParent}`}
            >
              {GamePageStats.map((stat, index) => (
                <StatCard
                  key={index}
                  title={stat.title}
                  svg={stat.svg}
                  count={calculateCount(index)}
                />
              ))}
            </div>
            {/* MEDIA  */}
            <div className="flex flex-col gap-4 relative py-12 max-sm:py-4">
              <h2 className="h2">Media</h2>
              {/* asdsad */}
              <MediaCarousel
                trailer={trailer?.results[0]}
                screenshots={screenshots?.results ?? []}
              />
            </div>
            {/* CHART  */}
            <div className="py-8 max-sm:py-12 relative" id="ratings">
              <BarChart
                rating={gameState.selectedGame.rating}
                percents={Array.from(
                  gameState.selectedGame.ratings.map((r) => r.percent)
                )}
                total={gameState.selectedGame.ratings_count}
                count={Array.from(
                  gameState.selectedGame.ratings.map((r) => r.count)
                )}
              />
            </div>
            {/* SERIES  */}
            {(gameState.sameSeriesGames?.results?.length ?? 0) > 0 && (
              <div className="flex flex-col gap-4 pt-8">
                <h2 className="h2">More in the same series</h2>
                <div
                  className={`flex gap-4 flex-wrap ${styles.mainCardContainer}`}
                >
                  {gameState.sameSeriesGames?.results.map((game, index) => (
                    <Link key={index} href={`/games/${game.id}`}>
                      <MainCard data={game} />
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {/* EXTRA CONTENT  */}
            {gameState.gameExtraContent && (
              <div className="flex flex-col gap-4 pt-8">
                <h2 className="h2">Extra content</h2>
                <div
                  className={`flex gap-4 flex-wrap ${styles.mainCardContainer}`}
                >
                  {gameState.gameExtraContent?.results.map((game, index) => (
                    <Link key={index} href={`/games/${game.id}`}>
                      <MainCard data={game} />
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {/* STORES  */}
            {gameState.selectedGame.stores.length > 0 && (
              <div className="flex flex-col gap-4 pt-8">
                <h2 className="h2">Available at</h2>
                <div
                  className={`flex gap-4 flex-wrap ${styles.mainCardContainer}`}
                >
                  {gameState.selectedGame.stores.map((store, index) => (
                    <Link
                      key={index}
                      href={navigateToStore(store)}
                      target="_blank"
                    >
                      <MainCard data={store.store} />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* TAGS  */}
            <div className="flex flex-col gap-4 pt-8">
              <h3 className="text-lg text-primary-150 font-bold">Tags</h3>
              <div className="flex gap-4 flex-wrap">
                {gameState.selectedGame.tags.map((tag, index) => (
                  <Link href={"/genres"} key={index} className={styles.pill}>
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>
            {/* REDDIT POSTS  */}
            <RedditPosts posts={gameState.redditPosts?.results ?? []} />
          </div>
        ) : (
          <Loader />
        )}
      </MainNav>
    </div>
  );
};

export default GamePage;
