import React from "react";
import { Menus } from "../constants/menus";
import SidenavButton from "./sidenav-button/sidenav-button";

const Sidenav = () => {
  const menus = Menus;
  return (
    <div
      className="w-[15rem] flex flex-col gap-6 py-8 px-4 z-20 relative h-full"
      style={{
        background:
          "linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, #060d17eb 8%)",
      }}
    >
      <span className="text-[#c6c6c6]">Browse</span>
      {menus.map((menu, index) => (
        <SidenavButton key={index} {...menu} />
      ))}
    </div>
  );
};

export default Sidenav;
