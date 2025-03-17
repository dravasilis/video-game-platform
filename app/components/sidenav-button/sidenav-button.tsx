import React from "react";
import { Menu } from "../../models/menu";
import "./sidenav-button.css";
import Image from "next/image";

const SidenavButton = ({ title, redirectUrl, imagePath }: Menu) => {
  return (
    <button className="button">
      <div className="w-[42px] h-[42px] overflow-hidden rounded-lg">
        <Image
          src={imagePath}
          alt="sidenavImage"
          className="w-full h-full object-cover rounded-lg "
        />
      </div>
      <span className="text-[18px]">{title}</span>
    </button>
  );
};

export default SidenavButton;
