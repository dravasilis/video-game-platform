import Image from "next/image";
import "./stat.scss";

import React from "react";
interface props {
  title: string;
  count: string;
  svg: string;
}

const StatCard = ({ title, count, svg }: props) => {
  return (
    <div className="stat-card-container">
      <div className="stat-card">
        <div className="tracking-wide flex gap-4 max-sm:gap-1 items-center">
          <Image
            width={50}
            height={20}
            src={`/svg/${svg}.svg`}
            alt="stat-svg"
            className="w-[30px] max-lg:w-[20px] max-sm:w-[17px]"
          />
          <span className="text-2xl  max-lg:text-lg  max-sm:text-base">
            {title}
          </span>
        </div>
        <span className="text-4xl max-lg:text-2xl  max-sm:text-xl font-bold text-primary-100">
          {count}
        </span>
      </div>
    </div>
  );
};

export default StatCard;
