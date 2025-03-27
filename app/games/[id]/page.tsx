"use client";
import Banner from "@/app/components/landing-page/banner/banner";
import MainNav from "@/app/components/main-nav/main-nav";
import Loader from "@/app/components/shared/loader/loader";
import { fetchGame, selectGameById } from "@/redux/features/games/gamesSlice";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./page.scss";
import SeparatingLine from "@/app/components/shared/separatingLine/separating-line";
import MainCard from "@/app/components/shared/main-card/main-card";
import StatCard from "@/app/components/shared/stat-card/stat";
const GamePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams(); //  Get id from the URL
  // Dispatch the action only once on component mount
  useEffect(() => {
    dispatch(fetchGame(Number(id)));
  }, [dispatch]);
  const gameState = useSelector(selectGameById);
  console.log(gameState);

  return (
    <div>
      <MainNav>
        {gameState.selectedGame ? (
          <div className="flex flex-col gap-12 px-16 max-sm:px-4 max-lg:px-8">
            <Banner
              href={gameState.selectedGame?.background_image_additional}
              customBrightness={true}
            />
            <div className="flex max-sm:flex-col gap-12 max-sm:gap-0 z-10 mt-[12rem] max-sm:mt-[2rem] max-sm:px-0">
              <div className="flex flex-col gap-2">
                <Image
                  src={gameState.selectedGame.background_image}
                  alt="gameState.selectedGameImage"
                  width={1920}
                  height={1080}
                  className="w-[300px] max-lg:w-[200px]  max-lg:h-[250px] shadow-[0px_0px_9px_2px_#121212] h-[350px] max-sm:w-full max-sm:h-full object-cover rounded-lg relative bottom-4"
                />
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex gap-1">
                    <Image
                      src={"/svg/owned.svg"}
                      alt="owned"
                      width={20}
                      height={20}
                    />
                    <span>Owned</span>
                    <span>
                      {gameState.selectedGame.added_by_status.owned.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Image
                      src={"/svg/beaten.svg"}
                      alt="beaten"
                      width={20}
                      height={20}
                    />
                    <span>Beaten</span>
                    <span>
                      {gameState.selectedGame.added_by_status.beaten.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Image
                      src={"/svg/playing.svg"}
                      alt="playing"
                      width={20}
                      height={20}
                    />
                    <span>Playing</span>
                    <span>
                      {gameState.selectedGame.added_by_status.playing.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Image
                      src={"/svg/wishlist.svg"}
                      alt="wishlist"
                      width={20}
                      height={20}
                    />
                    <span>Wishlist</span>
                    <span>
                      {gameState.selectedGame.added_by_status.toplay.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Image
                      src={"/svg/backlogged.svg"}
                      alt="backlogged"
                      width={20}
                      height={20}
                    />
                    <span>Backlogged</span>
                    <span>
                      {gameState.selectedGame.added_by_status.yet.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Image
                      src={"/svg/dropped.svg"}
                      alt="dropped"
                      width={20}
                      height={20}
                    />
                    <span>Dropped</span>
                    <span>
                      {gameState.selectedGame.added_by_status.dropped.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {/* TITLE  */}
                <h1 className="text-5xl max-lg:text-3xl max-sm:text-2xl font-bold pb-4 max-sm:pb-0 -ml-4 max-sm:ml-0">
                  {gameState.selectedGame.name}
                </h1>
                {/* RATING  */}
                <div className="flex gap-1 items-center font-bold ">
                  <Image
                    src={"/svg/star.svg"}
                    alt="star"
                    width={20}
                    height={20}
                  />
                  {gameState.selectedGame.rating} / 5
                </div>
                {/* METACRITIC  */}
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
                {/* RELEASE DATE  */}
                <div className="text-primary-150 flex flex-col gap-1 items-start max-sm:text-xs">
                  <p>
                    released {""}
                    <span className="text-primary-350  font-bold max-sm:text-sm text-lg">
                      {new Date(gameState.selectedGame.released)
                        .toDateString()
                        .substring(4)}
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
                </div>
                {/* GENRES  */}
                <div className="flex items-center gap-2 flex-wrap">
                  {gameState.selectedGame.genres.map((genre, index) => (
                    <Link href={"/genres"} key={index} className="pill">
                      {genre.name}
                    </Link>
                  ))}
                </div>
                <SeparatingLine />
                {/* PLATFORMS  */}
                <div className="flex items-center gap-2 flex-wrap">
                  {gameState.selectedGame.platforms.map(
                    (platformDetails, index) => (
                      <Link href={"/platforms"} key={index} className="pill">
                        {platformDetails.platform.name}
                      </Link>
                    )
                  )}
                </div>
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
              </div>
            </div>
            {/* DESCRIPTION  */}
            <div className="flex flex-col gap-4 relative">
              <h2 className="text-3xl text-primary-100 font-bold">Overview</h2>
              <p className="text-[16px] text-primary-350 leading-[26px]">
                {gameState.selectedGame.description_raw}
              </p>
            </div>
            {/* STATS  */}
            <div className="flex   gap-8">
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
            {/* STORES  */}
            <div className="flex flex-col gap-4 pt-8">
              <h2 className="text-3xl text-primary-100 font-bold">
                Available at
              </h2>
              <div className="flex gap-4 flex-wrap">
                {gameState.selectedGame.stores.map((storeDetails, index) => (
                  <MainCard key={index} data={storeDetails.store} />
                ))}
              </div>
            </div>
            {/* TAGS  */}
            <div className="flex flex-col gap-4 pt-8">
              <h3 className="text-lg text-primary-150 font-bold">Tags</h3>
              <div className="flex gap-4 flex-wrap">
                {gameState.selectedGame.tags.map((tag, index) => (
                  <Link href={"/genres"} key={index} className="pill">
                    {tag.name}
                  </Link>
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
