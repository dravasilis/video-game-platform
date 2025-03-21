import Banner from "../components/landing-page/banner/banner";
import MainNav from "../components/main-nav/main-nav";
import GameCategory from "../components/shared/category/category";
import { Categories } from "../constants/categories";
import "../globals.css";
import "./page.css";
const home = () => {
  return (
    <div className="animate-fade-in">
      <MainNav>
        <Banner banner={"bg10.jpg"} />
        <div className="flex flex-col gap-16 py-8 px-24   max-sm:px-8 z-10">
          <div className="flex flex-col gap-3 ">
            <h1 className="text-5xl max-sm:text-3xl text-primary-100 font-bold">
              Start your journey
            </h1>
          </div>
          <div className="flex flex-wrap justify-center gap-14 ">
            {Categories.map((category, index) => (
              <GameCategory key={index} category={category} />
            ))}
          </div>
        </div>
      </MainNav>
    </div>
  );
};

export default home;
