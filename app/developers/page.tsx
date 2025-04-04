"use client";
import {
  fetchDevelopers,
  selectDevelopers,
} from "@/redux/features/developers/developersSlice";
import { AppDispatch } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainNav from "../components/main-nav/main-nav";
import Banner from "../components/landing-page/banner/banner";
import Link from "next/link";
import MainCard from "../components/shared/main-card/main-card";
import Loader from "../components/shared/loader/loader";
import Pagination from "../components/shared/pagination/pagination";

const Developers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const developersState = useSelector(selectDevelopers);
  // Dispatch the action only once on component mount
  useEffect(() => {
    // eslint-disable-next-line  @typescript-eslint/no-unused-expressions
    !developersState.developers && dispatch(fetchDevelopers());
  }, [dispatch]); // Empty dependency array means this will only run once when the component mounts

  console.log(developersState.developers);
  return (
    <>
      <MainNav header="Developers" results={developersState.developers?.count}>
        <Banner banner="bg20.jpg" customBrightness={true} />
        <div className="flex flex-col gap-8  px-20 max-lg:px-8 max-sm:px-0  z-10">
          {!developersState.loading ? (
            <div className="grid grid-cols-5 max-[1700px]:grid-cols-5 max-2xl:grid-cols-4 max-lg:grid-cols-3  max-md:!grid-cols-2  gap-y-8 w-full justify-center ">
              {developersState.developers?.results.map((developer) => (
                <Link
                  key={developer.id}
                  href={`/games?developers=${developer.slug}`}
                >
                  <MainCard data={developer} />
                </Link>
              ))}
            </div>
          ) : (
            <Loader />
          )}
          {developersState.developers && (
            <Pagination
              count={developersState.developers?.count ?? 0}
              length={developersState.developers?.results.length ?? 0}
              dispatch={dispatch} // Pass dispatch
              fetchAction={fetchDevelopers} // Pass fetch action for games
            />
          )}
        </div>
      </MainNav>
    </>
  );
};

export default Developers;
