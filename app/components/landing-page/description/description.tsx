import React from "react";

const Description = () => {
  return (
    <div className="flex flex-col gap-4 py-20 max-md:pt-12 max-sm:pt-4">
      <div className="flex items-center gap-2 text-3xl ">
        <h3 className="text-5xl max-lg:text-4xl max-md:text-3xl font-bold text-primary-100  ">
          All Your Favorite Games in One Place
        </h3>
      </div>
      <span className="text-3xl text-start max-lg:text-2xl max-md:text-xl   max-xl:!w-full text-primary-150 leading-[40px] max-lg:leading-[30px] max-sm:leading-7">
        Explore the ultimate game platform where you can discover, track, and
        experience thousands of games. Whether you&apos;re looking for the
        latest releases or timeless classics,{" "}
        <b className="text-primary-100">Gamepedia</b> brings everything together
        in one seamless experience. Save your favorites, dive into new
        adventures, and connect with the worlds you love—all in one place.
      </span>
    </div>
  );
};

export default Description;
