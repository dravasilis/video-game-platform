"use client";
import { CarouselFeatures } from "@/app/constants/feature-carousel";
import { FeatureShowcases } from "@/app/constants/feature-showcases";
import { Stats } from "@/app/constants/stats";
import {
  fetchTopRatedGames,
  fetchUpcomingGames,
  fetchVintageGames,
  selectTopRatedGames,
  selectUpcomingGames,
  selectVintageGames,
} from "@/redux/features/games/gamesSlice";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StatCard from "../shared/stat-card/stat";
import Banner from "./banner/banner";
import StartBrowsing from "./browse-button/browse-button";
import Description from "./description/description";
import FeatureShowcaseCarousel from "./feature-showcase-carousel/feature-showcase-carousel";
import FeatureShowcase from "./feature-showcase/feature-showcase";
import Title from "./title/title";

const LandingPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Dispatch the actions only once on component mount
  useEffect(() => {
    dispatch(fetchUpcomingGames());
    dispatch(fetchVintageGames());
    dispatch(fetchTopRatedGames());
  }, [dispatch]); // Empty dependency array means this will only run once when the component mounts

  const [upcoming, vintage, topRated] = [
    useSelector(selectUpcomingGames),
    useSelector(selectVintageGames),
    useSelector(selectTopRatedGames),
  ];
  return (
    <div className="px-24 max-xl:px-20 max-lg:px-16 max-md:px-12 max-sm:px-5">
      {/* START BROWSING BUTTON  */}
      <StartBrowsing />
      <Banner banner="bg100.jpg" />
      <div className="z-10 animate-fade-in relative pt-[12rem] max-xl:pt-[12rem] max-lg:pt-[8rem] max-[600px]:!pt-[5rem]   flex flex-col gap-4">
        <Title />
        {/* STATS */}
        <div className="flex items-center gap-4 animate-slide-in-right">
          {Stats.map((stat, index) => (
            <StatCard
              key={index}
              svg={stat.svg}
              title={stat.title}
              count={stat.count}
            />
          ))}
        </div>
        <Description />
        {FeatureShowcases.map((feature, index) => (
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
                ? upcoming?.results ?? []
                : index === 1
                ? vintage?.results ?? []
                : topRated?.results ?? []
            }
            title={feature.title}
          />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
