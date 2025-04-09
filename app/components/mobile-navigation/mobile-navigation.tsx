"use client";
import { navigationMenus } from "@/app/constants/navigation-menus";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import arrow from "../../../public/svg/arrow.svg";
import closeSvg from "../../../public/svg/close.svg";
import menuSvg from "../../../public/svg/menu.svg";
import styles from "./mobile-navigation.module.scss";

const MobileNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setHoveredIndex(null);
        document.body.style.overflow = "unset";
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="sm:hidden">
      <button
        className="flex"
        onClick={() => {
          setIsMenuOpen(true);
          document.body.style.overflow = "hidden";
        }}
      >
        <Image src={menuSvg} alt="menuSvg" width={30} height={30} />
      </button>
      {isMenuOpen && (
        <div
          ref={menuRef} // Attach ref to the menu
          className={`${styles.sideMenu} animate-slide-in-right-fast`}
        >
          <button
            className="flex"
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = "unset";
              setHoveredIndex(null);
            }}
          >
            <Image src={closeSvg} alt="closeSvg" width={25} height={25} />
          </button>

          {navigationMenus.map((menu, index) =>
            menu.children ? (
              <div
                key={index}
                className="flex items-center w-full gap-1 relative cursor-pointer px-4 max-xl:px-2 py-2"
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
                  <div className="dropdownMenu animate-drop-down z-10 !w-full">
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
