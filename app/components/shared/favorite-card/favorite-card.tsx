"use client";
import React from "react";
import { setFavorite } from "@/app/helpers/favorites";
import { Genre } from "@/app/models/genre";
import { auth } from "@/lib/firebase";
import { setLoginModalOpen } from "@/redux/features/loginModal/loginModalSlice";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import { useDispatch } from "react-redux";
import heartEmpty from "../../../../public/svg/heartEmpty.svg";
import heartFilled from "../../../../public/svg/heartFilled.svg";
import styles from "../../../games/[id]/page.module.scss";
import Metacritic from "../metacritic/metacritic";
import "../main-card/main-card.scss";
import { Game } from "@/app/models/game";
interface Props<
  T extends {
    id: number;
    name: string;
    background_image?: string;
    released?: string;
    metacritic?: number;
    metacritic_url?: string;
    genres?: Genre[];
    games_count?: number;
    image_background?: string;
  }
> {
  data: T;
  isFavorite: boolean;
}
const FavoriteCard = <
  T extends {
    id: number;
    name: string;
    background_image?: string;
    released?: string;
    metacritic_url?: string;
    genres?: Genre[];
    metacritic?: number;
    games_count?: number;
    image_background?: string;
  }
>({
  data,
  isFavorite,
}: Props<T>) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSetFavorite = (type: "remove" | "add") => {
    const confirmRemoval = confirm(
      `Are you sure you want to remove ${data.name} from favorites?`
    );
    if (!confirmRemoval) return;

    if (!auth.currentUser) {
      dispatch(setLoginModalOpen(true));
      return;
    }
    setFavorite(auth, data as unknown as Game, type);
  };

  return (
    <div className="mainCard !w-full max-lg:!h-[230px] max-md:!h-[170px] max-sm:!h-[320px] max-sm:!w-[20rem] max-sm:justify-self-center">
      <div className="content">
        <div className="front !gap-4 !justify-normal !flex-row max-sm:!flex-col">
          <Image
            className="object-cover w-[44rem] max-lg:!w-[30rem] max-sm:!w-full !h-full  
              rounded-t-lg rounded-b-sm !shadow-none  !border-b border-[#3d3d3d] hover:!border-[#3d3d3d]"
            src={
              data.background_image ?? data.image_background ?? "/svg/game.svg"
            }
            alt="dataImage"
            width={1920}
            height={1080}
            unoptimized
          />

          <div
            className="flex flex-col gap-8   px-4 w-full justify-center   max-xl:px-[10px]  max-md:gap-2 max-sm:gap-0
             max-[640px]:py-0 max-[640px]:px-2 max-[640px]:justify-evenly "
          >
            <div className="flex items-center justify-center max-sm:justify-between max-sm:px-4  w-full">
              <span className="max-xl:text-xl text-xl max-lg:!text-lg max-md:!text-[14px] font-bold  justify-center flex text-center max-sm:text-left max-md:truncate-two-lines  text-primary-100">
                {data.name}
              </span>
              <div className="sm:hidden flex">
                {(data.genres?.length ?? 0) > 0 && (
                  <Metacritic rating={data.metacritic} />
                )}
              </div>
            </div>
            <div className="w-full flex flex-col items-center  gap-12 max-lg:gap-4 ">
              <div className="flex items-center gap-4">
                <div className="max-sm:hidden">
                  {(data.genres?.length ?? 0) > 0 && (
                    <Metacritic rating={data.metacritic} />
                  )}
                </div>

                {data.released && (
                  <span className="max-sm:hidden text-base max-xl:text-sm max-md:text-xs  font-bold text-primary-150">
                    {new Date(data.released).toDateString().substring(4)}
                  </span>
                )}
              </div>
              <div className="flex w-full max-sm:px-4 max-sm:justify-between  justify-center">
                {data.genres && (
                  <div className="flex items-center gap-2">
                    {data.genres.map(
                      (genre, index) =>
                        index < 2 && (
                          <div
                            key={index}
                            className={`${styles.pill} !text-xs p-0 !truncate !max-w-30 max-xl:!max-w-20 max-xl:!text-[10px] max-xl:!px-[6px] max-sm:!text-[8px]`}
                          >
                            {genre.name}
                          </div>
                        )
                    )}
                  </div>
                )}
                {data.released && (
                  <span className="sm:hidden text-base max-xl:text-sm max-md:text-xs  font-bold text-primary-150">
                    {new Date(data.released).toDateString().substring(4)}
                  </span>
                )}
              </div>
            </div>
            {(data.genres?.length ?? 0) > 0 &&
              (!isFavorite ? (
                <button
                  className="!w-[35px] !h-[35px] max-lg:!w-[25px] animate-drop-down"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSetFavorite("add");
                  }}
                >
                  <span>Add to favorites</span>
                  <Image
                    src={heartEmpty}
                    alt="emptyHeart"
                    width={35}
                    height={35}
                    className="!w-[35px] !h-[35px] max-lg:!w-[25px]"
                  />
                </button>
              ) : (
                <button
                  className="flex items-center justify-center hover:bg-[#2b2b2b] duration-150 rounded-lg  py-1 max-lg:py-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleSetFavorite("remove");
                  }}
                >
                  <Image
                    src={heartFilled}
                    alt="emptyHeart"
                    width={35}
                    height={35}
                    className="!w-[35px] !h-[35px] max-lg:!w-[25px] animate-drop-down"
                  />
                  <span className="max-lg:text-sm max-md:text-xs">
                    Remove from favorites
                  </span>
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
