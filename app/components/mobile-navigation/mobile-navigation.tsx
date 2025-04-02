"use client";
import { navigationMenus } from "@/app/constants/navigation-menus";
import Image from "next/image";
import React, { useState } from "react";
import menuSvg from "../../../public/svg/menu.svg";
import closeSvg from "../../../public/svg/close.svg";
import arrow from "../../../public/svg/arrow.svg";
import Link from "next/link";
const MobileNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <div className="sm:hidden  ">
      <button className="flex" onClick={() => setIsMenuOpen(true)}>
        <Image src={menuSvg} alt="menuSvg" width={30} height={30} />
      </button>
      {isMenuOpen && (
        <div className="flex flex-col absolute top-0 w-[15rem] h-full right-0 bg-black gap-6 items-start p-4">
          <button className="flex" onClick={() => setIsMenuOpen(false)}>
            <Image src={closeSvg} alt="closeSvg" width={30} height={30} />
          </button>
          {navigationMenus.map((menu, index) =>
            menu.children ? (
              <div
                key={index}
                className={`flex items-center w-full gap-1 relative cursor-pointer px-4 max-xl:px-2 py-2 `}
                onClick={() =>
                  setHoveredIndex(hoveredIndex === index ? null : index)
                }
              >
                <span className="max-xl:text-sm max-lg:text-xs">
                  {menu.name}
                </span>
                <Image
                  src={arrow}
                  alt="arrow"
                  width={20}
                  height={20}
                  className={`duration-200 ${
                    hoveredIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                />
                {hoveredIndex === index && (
                  <div className="dropdownMenu animate-drop-down z-10 w-full">
                    {menu.children.map((child, index) => (
                      <Link href={child.redirectUrl ?? "/home"} key={index}>
                        <div
                          className="menu"
                          dangerouslySetInnerHTML={{ __html: child.name }}
                        ></div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              menu.redirectUrl && (
                <Link
                  href={menu.redirectUrl}
                  key={index}
                  className="underlineEffectLine active:scale-[.98] w-full  px-4 max-xl:px-2 py-2"
                >
                  <span className="max-xl:text-sm max-lg:text-xs">
                    {" "}
                    {menu.name}
                  </span>
                </Link>
              )
            )
          )}
        </div>
      )}
    </div>
  );
};

export default MobileNavigation;
