import { Game } from "@/app/models/game";
import React from "react";
import "./main-card.scss";
import Image from "next/image";
interface Props {
  game: Game;
}
const MainCard = ({ game }: Props) => {
  return (
    <div>
      <div className="card">
        <div className="content">
          <div className="back">
            <Image
              className="object-cover h-full rounded-lg !shadow-none w-full "
              src={game.background_image}
              alt="gameImage"
              width={1920}
              height={1080}
            />
            <div className="flex items-start justify-start gap-2 absolute bottom-1 w-full px-4 py-2">
              {game.genres.map((genre, index) => (
                <span className="pill text-primary-100 rounded-sm px-3 py-1  text-sm">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
          <div className="front">
            <Image
              className="object-cover h-full rounded-lg !shadow-none"
              src={game.background_image}
              alt="gameImage"
              width={1920}
              height={1080}
            />
            <span className="p-4 max-lg:p-2 max-lg:text-sm font-bold text-primary-100">
              {game.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
