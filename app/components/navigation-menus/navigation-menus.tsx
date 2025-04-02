"use client";
import { navigationMenus } from "@/app/constants/navigation-menus";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import arrow from "../../../public/svg/arrow.svg";
import "./navigation-menus.scss";

const NavigationMenus = () => {
  const isSearchPressed = useSelector(
    (state: RootState) => state.search.isPressed
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="max-sm:hidden">
      {!isSearchPressed && (
        <div className="flex gap-4 max-xl:gap-2 max-lg:gap-0 items-center">
          {navigationMenus.map((menu, index) =>
            menu.children ? (
              <div
                key={index}
                className={`flex items-center gap-1 relative cursor-pointer px-4 max-xl:px-2 py-2 ${
                  hoveredIndex === index ? "fillMenu" : ""
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
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
                  <div className="dropdownMenu animate-drop-down ">
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
                  className="underlineEffectLine active:scale-[.98]  px-4 max-xl:px-2 py-2"
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

export default NavigationMenus;
