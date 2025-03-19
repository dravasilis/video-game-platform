import { fetchHelper } from "@/app/helpers/fetch-helper";
import { Game } from "@/app/models/game";
import { HttpResponse } from "@/app/models/httpResponse";
import Image from "next/image";
import Link from "next/link";
import "../../globals.css";
import Banner from "../banner/banner";
import FeatureShowcaseCarousel from "../feature-showcase-carousel/feature-showcase-carousel";
import FeatureShowcase from "../feature-showcase/feature-showcase";
import StatCard from "../stat-card/stat";
import logo from "../../../public/images/logo.png";
import nextSvg from "../../../public/svg/next.svg";
import { FeatureShowcases } from "@/app/constants/feature-showcases";
import { CarouselFeatures } from "@/app/constants/feature-carousel";

const LandingPage = async () => {
  const currentDate = new Date().toISOString().split("T")[0];
  //   console.log(currentDate);
  const featureShowcases = FeatureShowcases;
  const carouselFeatures = CarouselFeatures;
  const [upcomingGamesRes, vintageGamesRes, topRatedGamesRes]: [
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
    fetchHelper("/games", {
      ordering: "-metacritic",
      dates: "2012-01-01,2025-01-01",
    }),
  ]);
  //   console.log([mostRatedGamesRes]);
  return (
    <div className="">
      <Banner />
      <div className="z-10 animate-fade-in relative top-[12rem] max-lg:top-[7rem] max-[600px]:!top-[5rem] px-32 max-xl:px-24 max-lg:px-20 max-md:px-12 max-sm:px-5 flex flex-col gap-4">
        {/* TITLE  */}
        <div className="flex gap-4 items-center animate-slide-in-left">
          <Image
            src={logo}
            alt="favicon"
            className="w-[70px] max-sm:w-[40px]"
          />
          <h1 className=" text-[4rem] max-sm:text-4xl font-bold flex tracking-[-2px]">
            Gamepedia
          </h1>
        </div>
        {/* SUBTITLE  */}
        <h2 className="text-3xl max-sm:text-lg text-primary-200 animate-slide-in-left">
          Explore, discover, save your favourite games{" "}
        </h2>

        {/* STATS */}
        <div className="flex items-center gap-4 animate-slide-in-right">
          <StatCard
            svg="game"
            title="Games"
            count={
              (topRatedGamesRes.count ?? 0).toString().substring(0, 3) + "K"
            }
          />
          <StatCard svg="star" title="Reviews" count="500K" />
          <StatCard svg="rating" title="Ratings" count="1.1M" />
        </div>
        {/* START BROWSING  */}
        <div className="flex w-full justify-end">
          <Link href={"/"} className="underlineEffect flex gap-2">
            <span className="text-shadow">Start browsing</span>
            <Image src={nextSvg} width={20} height={30} alt="next" />
          </Link>
        </div>
        {/* DESCRIPTION  */}
        <div className="flex flex-col gap-4 py-20 max-md:pt-12 max-sm:pt-4">
          <div className="flex items-center gap-2 text-3xl ">
            <h3 className="text-5xl max-lg:text-4xl max-md:text-3xl text-primary-100  ">
              All Your Favorite Games in One Place
            </h3>
          </div>
          <span className="text-xl text-start max-lg:text-lg !w-3/4 max-xl:!w-full text-primary-150 leading-[30px]  max-sm:leading-6">
            Explore the ultimate game platform where you can discover, track,
            and experience thousands of games. Whether you&apos;re looking for
            the latest releases or timeless classics,{" "}
            <b className="text-primary-100">Gamepedia</b> brings everything
            together in one seamless experience. Save your favorites, dive into
            new adventures, and connect with the worlds you love—all in one
            place.
          </span>
        </div>
        {featureShowcases.map((feature, index) => (
          <FeatureShowcase
            key={index}
            title={feature.title}
            image={feature.image}
            description={feature.description}
          />
        ))}
        {CarouselFeatures.map((feature, index) => (
          <FeatureShowcaseCarousel
            key={index}
            description={feature.description}
            games={
              index === 0
                ? upcomingGamesRes.results
                : index === 1
                ? vintageGamesRes.results
                : topRatedGamesRes.results
            }
            title={feature.title}
          />
        ))}
        <div className="flex items-center gap-1 py-8 justify-end">
          Credit to
          <Link
            className="text-shadow underlineEffect text-[#3bffff]"
            href="https://api.rawg.io/docs/"
            target="_blank"
          >
            RAWG
          </Link>
          for providing the API
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
