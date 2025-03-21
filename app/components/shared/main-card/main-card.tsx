import { Game } from "@/app/models/game";
import Image from "next/image";
import "./main-card.scss";
interface Props {
  game: Game;
}
const MainCard = ({ game }: Props) => {
  return (
    <div className="w-max">
      <div className="main-card">
        <div className="content">
          <div className="front">
            <Image
              className="object-cover h-full  rounded-t-lg rounded-b-sm !shadow-none   "
              src={game.background_image}
              alt="gameImage"
              width={1920}
              height={1080}
            />
            <div className="flex flex-col gap-2 px-4 py-4   justify-center h-[5rem] max-[640px]:h-[6rem] max-[640px]:py-0 max-[640px]:px-2">
              <span className="max-xl:text-xs text-sm font-bold   text-primary-100">
                {game.name}
              </span>
              <span className="text-xs max-xl:text-[10px] font-bold text-primary-150">
                {new Date(game.released).toDateString().substring(4,)}
              </span>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
