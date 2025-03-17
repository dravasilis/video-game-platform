import React from "react";
import Banner from "../banner/banner";
import Link from "next/link";
import "../../globals.css";
import { CarouselUI } from "../carousel/CardsCarousel";
import { fetchHelper } from "@/app/helpers/fetch-helper";
import FeatureShowcaseCarousel from "../feature-showcase-carousel/feature-showcase-carousel";
import { HttpResponse } from "@/app/models/httpResponse";
import { Game } from "@/app/models/game";
import StatCard from "../stat-card/stat";
import FeatureShowcase from "../feature-showcase/feature-showcase";
const LandingPage = async () => {
  const currentDate = new Date().toISOString().split("T")[0];
  console.log(currentDate);

  const [upcomingGamesRes, vintageGamesRes, mostRatedGamesRes]: [
    HttpResponse<Game>,
    HttpResponse<Game>,
    HttpResponse<Game>
  ] = await Promise.all([
    fetchHelper("/games", {
      ordering: "released",
      dates: `${currentDate},${currentDate.substring(0, 4)}-12-31`,
    }),
    fetchHelper("/games", {
      ordering: "ratings_count",
      dates: "1995-01-01,2005-01-01",
    }),
    fetchHelper("/games", { ordering: "-metacritic" }),
  ]);
  console.log([mostRatedGamesRes]);
  return (
    <div>
      <Banner />
      <div className="z-10 relative top-[15rem] px-32 max-xl:px-24 max-lg:px-20 max-md:px-12 max-sm:px-6 flex flex-col gap-4">
        {/* TITLE  */}
        <div className="flex gap-4 items-center">
          <img
            src="/images/logo.png"
            width={50}
            alt="favicon"
            className="w-[50px] max-sm:w-[40px]"
          />
          <span className="text-5xl max-sm:text-4xl font-bold flex  tracking-wide">
            <span className="underlineEffect">Game</span>
            pedia
          </span>
        </div>
        {/* SUBTITLE  */}
        <span className="text-2xl max-sm:text-xl text-primary-200">
          Explore, discover, save your favourite games{" "}
        </span>

        {/* STATS */}
        <div className="flex items-center gap-4">
          <StatCard
            svg="game"
            title="Games"
            count={mostRatedGamesRes.count.toString().substring(0, 3) + "K"}
          />
          <StatCard svg="star" title="Reviews" count="500K" />
          <StatCard svg="rating" title="Ratings" count="1.1M" />
        </div>
        {/* START BROWSING  */}
        <div className="flex w-full justify-end">
          <Link href={"/home"} className="underlineEffect flex gap-2">
            <span className="text-shadow">Start browsing</span>
            <img src="/svg/next.svg" width={20} alt="" />
          </Link>
        </div>
        {/* DESCRIPTION  */}
        <div className="flex flex-col gap-4 py-20 max-md:pt-12">
          <div className="flex items-center gap-2 text-3xl max-lg:text-2xl">
            <span className="font-bold">
              All Your Favorite Games in One Place
            </span>
          </div>
          <span className="text-xl max-lg:text-lg !w-3/4 max-xl:!w-full text-primary-150 leading-[30px] tracking-wide">
            Explore the ultimate game platform where you can discover, track,
            and experience thousands of games. Whether you're looking for the
            latest releases or timeless classics,{" "}
            <b className="text-primary-100">Gamepedia</b> brings everything
            together in one seamless experience. Save your favorites, dive into
            new adventures, and connect with the worlds you love—all in one
            place.
          </span>
        </div>
        <FeatureShowcase
          title="Explore A Vast Library Of Games"
          image="bg6.png"
          description=" Dive into an extensive collection of games spanning all genres,
              from action-packed adventures to immersive RPGs. Whether you're
              searching for the latest releases or nostalgic classics, our
              platform lets you explore, discover, and find your next favorite
              game with ease."
        />
        <FeatureShowcase
          title="Discover A New Game Experience"
          image="bg3.png"
          description=" Uncover new worlds, connect with unforgettable characters, and
              dive into fresh gaming experiences like never before. Whether
              you're exploring hidden gems or the latest blockbusters, every
              game brings a unique adventure waiting to be discovered."
        />
        <FeatureShowcase
          title="Explore Games Through Player Perspectives"
          image="bg7.png"
          description="Make informed gaming choices with real user reviews and ratings. Explore what players love (or don’t) about each game, share your own experiences, and connect with a community that values honest opinions. Whether you're searching for a hidden gem or the next big hit, let reviews guide your next adventure! "
        />
        <FeatureShowcase
          title="Create & Customize Your Ultimate Game List"
          image="bg5.png"
          description="Easily save and organize your favorite games in one place! Build your personalized game list, keep track of the titles you love, and revisit them anytime. Whether you're curating a must-play backlog or showcasing your top picks, your collection is always just a click away. "
        />
        <FeatureShowcaseCarousel
          games={upcomingGamesRes.results}
          title="Games Releasing Soon"
        />
        <FeatureShowcaseCarousel
          games={vintageGamesRes.results}
          title="Old Gems"
        />
        <FeatureShowcaseCarousel
          games={mostRatedGamesRes.results}
          title="Top Rated Games"
        />
        <div className="flex w-full justify-end pb-24 pt-12">
          <Link href={"/home"} className="underlineEffect flex gap-2">
            <span className=" text-3xl font-bold">Start browsing</span>
            <img src="/svg/next.svg" width={20} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
