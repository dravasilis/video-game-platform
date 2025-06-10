import React from "react";
import Navigation from "../navigation/navigation";
import AuthUi from "../auth-ui/auth-ui";

interface Props {
  children: React.ReactNode;
  header?: string;
  results?: number;
}
const MainNav = ({ children, header, results }: Props) => {
  return (
    <>
      <div className="flex flex-col gap-4 py-4 animate-fade-in px-4 ">
        <div className="flex flex-col gap-1 items-end">
          <AuthUi />
          <Navigation />
        </div>
        <div
          id="page-content"
          className="flex flex-col gap-4 py-4 animate-fade-in  "
        >
          {header && (
            <div className="flex justify-between w-full items-center z-10 px-20 max-lg:px-10 max-md:px-4 max-[540px]:!px-0 pt-8">
              <h1 className="text-5xl max-sm:text-3xl text-primary-100 font-bold  ">
                {header}
              </h1>
              <h3 className="text-primary-250 max-sm:text-xs">
                {(results ?? 0).toLocaleString()} results
              </h3>
            </div>
          )}

          {children}
        </div>
      </div>
    </>
  );
};

export default MainNav;
