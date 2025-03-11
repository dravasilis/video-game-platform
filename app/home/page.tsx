import React from "react";
import { fetchHelper } from "../helpers/fetch-helper";
import "./page.module.css";
import "../globals.css";
import Loader from "../components/loader";
const home = async () => {
  const games: { name: string }[] = await fetchHelper(
    "https://www.giantbomb.com/api/games/"
  );
  const handleLoaderChange = (loaderState: boolean) => {
    console.log("loaderState: ", loaderState);
  };
  return (
    <div className="text-9xl">
      HOMEEE
      <Loader data={games} onLoaderChange={handleLoaderChange} />
    </div>
  );
};

export default home;
