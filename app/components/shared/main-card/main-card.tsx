import Image from "next/image";
import "./main-card.scss";
import Metacritic from "../metacritic/metacritic";
import { Genre } from "@/app/models/genre";
import styles from "../../../games/[id]/page.module.scss";
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
}
const MainCard = <
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
}: Props<T>) => {
  return (
    <div className="mainCard">
      <div className="content">
        <div className="front">
          <Image
            className="object-cover    rounded-t-lg rounded-b-sm !shadow-none  !border-b border-[#3d3d3d] hover:!border-[#3d3d3d]"
            src={
              data.background_image ?? data.image_background ?? "/svg/game.svg"
            }
            alt="dataImage"
            width={1020}
            height={620}
            unoptimized
          />

          <div className="flex flex-col gap-2 max-sm:gap-1 px-4  justify-center h-[30%] max-xl:px-[10px] max-xl:h-[35%] max-sm:h-[40%] max-[640px]:py-0 max-[640px]:px-2">
            <span className="max-xl:text-xs text-sm font-bold  truncate-two-lines text-primary-100">
              {data.name}
            </span>
            <div className="w-full flex items-center justify-between">
              <div className="flex flex-col gap-2">
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
                  <span className="text-xs max-xl:text-[10px] font-bold text-primary-150">
                    {new Date(data.released).toDateString().substring(4)}
                  </span>
                )}
              </div>
              {(data.genres?.length??0)>0 &&(
              <Metacritic rating={data.metacritic} />
              )}
            </div>
            {data.games_count && (
              <span className="text-xs max-xl:text-[10px] font-bold text-primary-150">
                {data.games_count.toLocaleString() + " Games"}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
