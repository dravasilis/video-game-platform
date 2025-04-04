import Link from "next/link";
import React from "react";

interface Props {
  rating?: number;
  url?: string;
}
const Metacritic = ({ rating, url }: Props) => {
  return (
    <>
      {url ? (
        <Link
          href={url}
          target="_blank"
          className={`rounded-md py-1 px-3 text-lg font-bold text-dark ${
            !rating
              ? "bg-primary-150"
              : rating > 60
              ? "bg-success"
              : rating < 50
              ? "bg-danger"
              : "bg-warning"
          } w-max`}
        >
          {rating}
        </Link>
      ) : (
        <div
          className={`rounded-md py-1 px-3 text-lg max-xl:text-[14px]  max-sm:text-[10px] font-bold text-dark max-[1700px]:px-2 max-[1700px]:text-base ${
            !rating
              ? "bg-primary-200"
              : rating > 60
              ? "bg-success"
              : rating < 50
              ? "bg-danger"
              : "bg-warning"
          } w-max`}
        >
          {" "}
          {rating ?? <i>N/A</i>}
        </div>
      )}
    </>
  );
};

export default Metacritic;
