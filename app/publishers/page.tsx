"use client";
import {
  fetchPublishers,
  selectPublishers,
} from "@/redux/features/publishers/publishersSlice";
import { AppDispatch } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainNav from "../components/main-nav/main-nav";
import MainCard from "../components/shared/main-card/main-card";
import Loader from "../components/shared/loader/loader";
import Pagination from "../components/shared/pagination/pagination";
import Banner from "../components/landing-page/banner/banner";
import Link from "next/link";

const Publishers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const publishersState = useSelector(selectPublishers);
  // Dispatch the action only once on component mount
  useEffect(() => {
    // eslint-disable-next-line  @typescript-eslint/no-unused-expressions
    !publishersState.publishers && dispatch(fetchPublishers());
  }, [dispatch]); // Empty dependency array means this will only run once when the component mounts

  console.log(publishersState.publishers);

  return (
    <>
      <MainNav header="Publishers" results={publishersState.publishers?.count}>
        <Banner banner="gamesbg.jpg" customBrightness={true} />
        <div className="flex flex-col gap-8  px-20 max-lg:px-8 max-sm:px-0  ">
          {!publishersState.loading ? (
            <div className="grid grid-cols-5 max-[1700px]:grid-cols-5 max-2xl:grid-cols-4 max-lg:grid-cols-3  max-md:!grid-cols-2  gap-y-8 w-full justify-center ">
              {publishersState.publishers?.results.map((publisher) => (
                <Link
                  key={publisher.id}
                  href={`/games?publishers=${publisher.slug}`}
                >
                  <MainCard data={publisher} isFavorite={false} />
                </Link>
              ))}
            </div>
          ) : (
            <Loader />
          )}
          {publishersState.publishers && (
            <Pagination
              count={publishersState.publishers?.count ?? 0}
              length={publishersState.publishers?.results.length ?? 0}
              dispatch={dispatch} // Pass dispatch
              fetchAction={fetchPublishers} // Pass fetch action for games
            />
          )}
        </div>
      </MainNav>
    </>
  );
};

export default Publishers;
