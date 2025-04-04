import { AddedByStatus } from "@/app/models/game";
import React from "react";
import Image from "next/image";
import { statuses } from "@/app/constants/statuses";
interface Props {
  listStatuses: AddedByStatus;
}
const GameListsStatus = ({ listStatuses }: Props) => {
  return (
    <>
      {listStatuses && (
        <div className="grid grid-cols-1 gap-y-2 gap-x-6 text-sm">
          {Object.entries(listStatuses).map(([key, value], index) => (
            <div key={index} className="flex gap-4 px-4">
              <Image
                src={`/svg/${statuses[key].svg}.svg`}
                alt="listSvg"
                width={20}
                height={20}
              />
              <div className="flex items-center justify-between w-full">
                <span>{statuses[key].label}</span>
                <span>{Number(value).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default GameListsStatus;
