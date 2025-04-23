const SkeletonGamePage = () => {
  return (
    <div className="flex max-sm:flex-col max-sm:items-center gap-12 px-16 max-lg:px-8 max-sm:gap-0 z-10 mt-[12rem] max-sm:mt-[2rem] max-sm:px-0">
      <div className="flex flex-col gap-4">
        <div className="skeleton-card !h-[350px] !w-[300px]   animate-pulse "></div>
        <div className="skeleton-card !h-[15px] !rounded-md !w-[285px] animate-pulse "></div>
        <div className="skeleton-card !h-[15px] !rounded-md !w-[285px] animate-pulse "></div>
        <div className="skeleton-card !h-[15px] !rounded-md !w-[285px] animate-pulse "></div>
        <div className="skeleton-card !h-[15px] !rounded-md !w-[285px] animate-pulse "></div>
        <div className="skeleton-card !h-[15px] !rounded-md !w-[285px] animate-pulse "></div>
        <div className="skeleton-card !h-[15px] !rounded-md !w-[285px] animate-pulse "></div>
      </div>
      <div className="flex flex-col gap-4 max-sm:py-4">
        <div className="skeleton-card !h-[25px] !rounded-md !w-[500px] animate-pulse "></div>
        <div className="skeleton-card !h-[25px] !rounded-md !w-[300px] animate-pulse "></div>
        <div className="skeleton-card !h-[40px] !rounded-md !w-[50px] animate-pulse "></div>
        <div className="skeleton-card !h-[25px] !rounded-md !w-[250px] animate-pulse "></div>
        <div className="skeleton-card !h-[25px] !rounded-md !w-[300px] animate-pulse "></div>
        <div className="skeleton-card !h-[25px] !rounded-md !w-[100px] animate-pulse "></div>
        <div className="skeleton-card !h-[25px] !rounded-md !w-[100px] animate-pulse "></div>
        {[0, 1].map((i) => (
          <div key={i} className="flex gap-2">
            <div className="skeleton-card !h-[25px] !rounded-md !w-[50px] animate-pulse "></div>
            <div className="skeleton-card !h-[25px] !rounded-md !w-[50px] animate-pulse "></div>
            <div className="skeleton-card !h-[25px] !rounded-md !w-[50px] animate-pulse "></div>
            <div className="skeleton-card !h-[25px] !rounded-md !w-[50px] animate-pulse "></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonGamePage;
