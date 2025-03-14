import React from "react";
import Banner from "./banner/banner";
import Link from "next/link";
import "../globals.css";
const LandingPage = () => {
  return (
    <div>
      <Banner />
      <div className="z-10 relative top-[15rem] px-32 flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <img src="favicon.ico" width={50} alt="" />
          <span className="text-5xl text-shadow tracking-wide">Gamepedia</span>
        </div>
        <span className="text-2xl text-[#b1c3d6]">
          Explore, discover, save your favourite games{" "}
        </span>
        <div className="flex w-full justify-end">
          <Link href={"/home"} className="underlineEffect flex gap-2">
            <span className="text-shadow">Start browsing</span>
            <img src="/svg/next.svg" width={20} alt="" />
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-3xl">
            <span>What is </span>
            <span className="text-shadow tracking-wide">Gamepedia?</span>
          </div>
          <span className="text-xl text-[#b1c3d6]">
            Gamepedia is your ultimate gaming wikipedia, where you can explore
            and discover thousands of games while saving your favorites to your
            personal collection and much more.
          </span>
        </div>
        {/* <div className="relative w-[250px] h-[250px] rounded-xl">
          <img
            src="/images/games.jpg"
            alt="games"
            className="rounded-xl absolute w-full h-full"
          />
          <div className="flex flex-col gap-4 glass h-full">
            <span className="text-lg">Browse thousands of games</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LandingPage;
