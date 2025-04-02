import Link from "next/link";
import React from "react";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import Search from "../../search/search";
import NavigationMenus from "../navigation-menus/navigation-menus";
import MobileNavigation from "../mobile-navigation/mobile-navigation";
const Navigation = () => {
  return (
    <>
      <div className="flex w-full justify-between  z-20 ">
        <Link href="/home" className="flex gap-1 items-center z-10">
          <Image
            src={logo}
            alt="favicon"
            className="w-[30px] max-md:w-[17px] mb-1"
          />
          <h1 className=" text-2xl text-primary-350 max-md:text-sm font-bold flex tracking-[-2px]">
            Gamepedia
          </h1>
        </Link>
        <NavigationMenus />
        <div className="flex items-center gap-2 w-full justify-end">
          <Search />
          <MobileNavigation />
        </div>
      </div>
    </>
  );
};

export default Navigation;
