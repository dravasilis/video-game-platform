import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/logo.png";
import Search from "../../search/search";
import MobileNavigation from "../mobile-navigation/mobile-navigation";
import NavigationMenus from "../navigation-menus/navigation-menus";
const Navigation = () => {
  return (
    <>
      <div className="flex w-full justify-between  z-20 h-10">
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
        <div className=" flex items-center justify-end">
          <Search />
          <MobileNavigation />
        </div>
      </div>
    </>
  );
};

export default Navigation;
