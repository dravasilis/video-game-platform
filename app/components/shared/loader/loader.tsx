import React from "react";
import "./loader.scss";
const Loader = () => {
  return <div className="grid justify-items-center  grid-cols-5 max-[1700px]:grid-cols-5 max-2xl:grid-cols-4 max-lg:grid-cols-3  max-md:!grid-cols-2 min-[1700px]:gap-x-12  gap-y-8 w-full">
    {[1,2,3,4,5,6,7,8,9,10].map((i) => (
      <div key={i} className="skeleton-card animate-pulse ">

      </div>
      ))}
  </div>;
};

export default Loader;
