import React from "react";
import copyright from "../../../public/svg/copyright.svg";
import Image from "next/image";
import Link from "next/link";
const RawgReferral = () => {
  return (
    <div className="flex items-center text-sm max-sm:text-xs gap-1 py-8   justify-end px-24 max-xl:px-20 max-lg:px-16 max-md:px-12 max-sm:px-5">
      <Image src={copyright} alt="copyrightSvg" width={20} height={20} />
      Powered by
      <Link
        className="text-shadow underlineEffectLine text-[#98ffff] "
        href="https://api.rawg.io/docs/"
        target="_blank"
      >
        RAWG API
      </Link>
    </div>
  );
};

export default RawgReferral;
