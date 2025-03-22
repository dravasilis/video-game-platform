import Image from "next/image";
import React from "react";
import logo from "../../../public/images/logo.png";
const MainNav = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-col gap-4 py-4 animate-fade-in">
        {/* <Sidenav /> */}
        <div className="flex gap-1 items-center z-10">
          <Image
            src={logo}
            alt="favicon"
            className="w-[30px] max-sm:w-[17px] mb-1"
          />
          <h1 className=" text-2xl text-primary-150 max-sm:text-sm font-bold flex tracking-[-2px]">
            Gamepedia
          </h1>
        </div>
        {children}
      </div>
    </>
  );
};

export default MainNav;
