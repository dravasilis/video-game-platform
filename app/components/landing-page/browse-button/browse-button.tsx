import Link from "next/link";
import React from "react";
import nextSvg from "../../../../public/svg/next.svg";
import Image from "next/image";
const StartBrowsing = () => {
  return (
    <div className="flex w-full justify-end fixed top-4 right-4 z-50">
      <Link
        href={"/home"}
        className="underlineEffect backdrop-blur-[2px] flex gap-2 browse animate-fade-in"
      >
        <span className=" text-primary-150">Start browsing</span>
        <Image src={nextSvg} width={15} height={30} alt="next" />
      </Link>
    </div>
  );
};

export default StartBrowsing;
