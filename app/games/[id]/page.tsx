"use client";
import Banner from "@/app/components/landing-page/banner/banner";
import MainNav from "@/app/components/main-nav/main-nav";
import BarChart from "@/app/components/shared/bar-chart/bar-chart";
import Loader from "@/app/components/shared/loader/loader";
import MainCard from "@/app/components/shared/main-card/main-card";
import MediaCarousel from "@/app/components/shared/media-carousel/media-carousel";
import SeparatingLine from "@/app/components/shared/separatingLine/separating-line";
import StatCard from "@/app/components/shared/stat-card/stat";
import { statuses } from "@/app/constants/statuses";
import { StoreData } from "@/app/models/store";
import {
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

const GamePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams(); //  Get id from the URL

  useEffect(() => {
    dispatch(fetchGame(Number(id)));
    dispatch(fetchGameTrailers(Number(id)));
    dispatch(fetchGameScreenshots(Number(id)));
    dispatch(fetchGameSeries(Number(id)));
    dispatch(fetchGameExtraContent(Number(id)));
    dispatch(fetchGameStores(Number(id)));
    dispatch(fetchGameRedditPosts(Number(id)));
  }, [dispatch]);

  const gameState = useSelector(selectGameById);
  const trailer = useSelector(selectGameTrailers);
  const screenshots = useSelector(selectGameScreenshots);
  console.log(gameState);

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
                <div className="grid  grid-cols-1 max-sm:!hidden max-lg:grid-cols-1 gap-y-2 gap-x-6 text-sm">
                  {Object.entries(gameState.selectedGame.added_by_status).map(
                    ([key, value], index) => (
                      <div key={index} className="flex gap-4 px-4">
                        <Image
                          src={`/svg/${statuses[key].svg}.svg`}
                          alt="owned"
                          width={20}
                          height={20}
                        />
                        <div className="flex items-center justify-between w-full">
                          <span>{statuses[key].label}</span>
                          <span>{Number(value).toLocaleString()}</span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {/* TITLE  */}
                <h1 className="text-5xl max-lg:text-3xl max-sm:text-2xl font-bold pb-4 max-sm:pb-0 -ml-4 max-sm:ml-0">
                  {gameState.selectedGame.name}
                </h1>
                {/* RATING  */}
                <button
                  onClick={() =>
                    document
                      .getElementById("ratings")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="flex gap-2 items-center font-bold hover:cursor-pointer w-max"
                >
                  <Image
                    src={"/svg/star.svg"}
                    alt="star"
                    width={20}
                    height={20}
                  />
                  {gameState.selectedGame.rating} / 5
                  <span className="text-xs text-primary-200">
                    {gameState.selectedGame.ratings_count > 1000
                      ? Math.floor(gameState.selectedGame.ratings_count / 1000)
                      : ""}
                    K ratings
                  </span>
                </button>
                {/* METACRITIC  */}
                {gameState.selectedGame.metacritic && (
                  <Link
                    href={gameState.selectedGame.metacritic_url}
                    target="_blank"
                    className={`rounded-md py-1 px-3 text-lg font-bold text-dark ${
                      gameState.selectedGame.metacritic > 60
                        ? "bg-success"
                        : gameState.selectedGame.metacritic < 50
                        ? "bg-danger"
                        : "bg-warning"
                    } w-max`}
                  >
                    {gameState.selectedGame.metacritic}
                  </Link>
                )}

                {/* RELEASE DATE  */}
                <div className="text-primary-150 flex flex-col gap-1 items-start max-sm:text-xs">
                  <p>
                    released {""}
                    <span className="text-primary-350  font-bold max-sm:text-sm text-lg">
                      {gameState.selectedGame.tba ? (
                        <i>TBA</i>
                      ) : (
                        new Date(gameState.selectedGame.released)
                          .toDateString()
                          .substring(4)
                      )}
                    </span>
                  </p>
                  <p>
                    by{" "}
                    {gameState.selectedGame.developers.map((dev, index) => (
                      <span
                        key={index}
                        className=" text-primary-350 font-bold text-lg max-sm:text-sm"
                      >
                        {dev.name}
                        {gameState.selectedGame &&
                          index !==
                            gameState.selectedGame.developers.length - 1 &&
                          ", "}
                      </span>
                    ))}
                  </p>
                  {/* REDDIT */}
                  <Link
                    href={gameState.selectedGame.reddit_url}
                    target="_blank"
                    className="w-max flex gap-1"
                  >
                    <Image
                      src={"/svg/reddit.svg"}
                      alt="reddit"
                      width={60}
                      height={60}
                    />
                    <Image
                      src={"/svg/redirect.svg"}
                      alt="reddit"
                      width={13}
                      height={13}
                      className="mb-2"
                    />
                  </Link>
                  {/* WEBSITE URL */}
                  <Link
                    href={gameState.selectedGame.website}
                    target="_blank"
                    className="w-max flex gap-1"
                  >
                    <Image
                      src={"/svg/website.svg"}
                      alt="website"
                      width={20}
                      height={20}
                      className="mb-2"
                    />
                    <span className="text-primary-250 text-sm">Website</span>
                    <Image
                      src={"/svg/redirect.svg"}
                      alt="reddit"
                      width={13}
                      height={13}
                      className="mb-4"
                    />
                  </Link>
                </div>
                {/* GENRES  */}
                <div className="flex items-center gap-2 flex-wrap">
                  {gameState.selectedGame.genres.map((genre, index) => (
                    <Link href={"/genres"} key={index} className={styles.pill}>
                      {genre.name}
                    </Link>
                  ))}
                </div>
                <SeparatingLine />
                {/* PLATFORMS  */}
                <div className="flex items-center gap-2 flex-wrap">
                  {gameState.selectedGame.platforms.map(
                    (platformDetails, index) => (
                      <Link
                        href={"/platforms"}
                        key={index}
                        className={styles.pill}
                      >
                        {platformDetails.platform.name}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
            {/* STATS for smaller screen */}
            <div className="sm:hidden grid grid-cols-2   gap-y-2 gap-x-6 text-sm">
              {Object.entries(gameState.selectedGame.added_by_status).map(
                ([key, value], index) => (
                  <div key={index} className="flex gap-1">
                    <Image
                      src={`/svg/${statuses[key].svg}.svg`}
                      alt="owned"
                      width={20}
                      height={20}
                    />
                    <span>{statuses[key].label}</span>
                    <span>{Number(value).toLocaleString()}</span>
                  </div>
                )
              )}
            </div>
            {/* DESCRIPTION  */}
            <div className="flex flex-col gap-4 relative py-12 max-sm:py-0">
              <h2 className="h2">Overview</h2>
              <p className="text-[16px] text-primary-350 leading-[26px]">
                {gameState.selectedGame.description_raw}
              </p>
            </div>
            {/* STATS  */}
            <div
              className={`flex justify-center max-[1200px]:flex-wrap gap-8 ${styles.statCardParent}`}
            >
              <StatCard
                title={"Lists"}
                svg="lists"
                count={String(gameState.selectedGame.added)}
              />
              <StatCard
                title={"Reviews"}
                svg="star"
                count={String(gameState.selectedGame.reviews_count)}
              />
              <StatCard
                title={"Suggestions"}
                svg="suggestions"
                count={String(gameState.selectedGame.suggestions_count)}
              />
              <StatCard
                title={"Achievements"}
                svg="achievements"
                count={String(gameState.selectedGame.achievements_count)}
              />
            </div>
            {/* TRAILERS  */}
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
            {(gameState.gameExtraContent?.results?.length ?? 0) > 0 && (
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
            <div className="flex flex-col gap-8 pt-8">
              <h3 className="text-lg text-primary-150 font-bold">
                Recent Reddit posts
              </h3>
              <div className="flex flex-col gap-4 px-[20rem] max-2xl:px-[10rem] max-lg:px-[5rem] max-md:px-8 max-sm:px-4">
                {gameState.redditPosts?.results.map((post, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 border-b border-dark pb-2"
                  >
                    <Link
                      href={post.url}
                      target="_blank"
                      className="hover:underline"
                    >
                      <span className="text-primary-100 text-lg tracking-wide font-bold max-sm:text-base ">
                        {" "}
                        {post.name}
                      </span>
                    </Link>
                    <div className="flex gap-1">
                      <span className="text-primary-200  max-sm:text-xs">
                        by
                      </span>{" "}
                      <Link
                        href={post.username_url}
                        className="hover:underline text-primary-150 max-sm:text-xs  w-max"
                        target="_blank"
                      >
                        {post.username}
                      </Link>
                    </div>
                    <p
                      className="text-primary-300 max-sm:text-sm"
                      dangerouslySetInnerHTML={{ __html: post.text }}
                    ></p>
                    <span className="text-end text-primary-200 max-sm:text-xs">
                      {new Date(post.created).toDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </MainNav>
    </div>
  );
};

export default GamePage;
