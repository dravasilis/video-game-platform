import Link from "next/link";
import Banner from "./components/banner/banner";

export default function Home() {
  return (
    <div>
      <Banner />
      <div className="z-10 relative top-[15rem] px-32 flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <img src="favicon.ico" width={50} alt="" />
          <span className="text-5xl ">Video Game Platform</span>
        </div>
        <span className="text-2xl text-[#b1c3d6]">
          Explore, discover, save your favourite games{" "}
        </span>
        <div className="flex w-full justify-end">
          <Link href={"/home"} className="underlineEffect flex gap-2">
            <span>Start browsing</span>
            <img src="/svg/next.svg" width={20} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
}
