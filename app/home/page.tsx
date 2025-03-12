import React from "react";
import { fetchHelper } from "../helpers/fetch-helper";
import "./page.module.css";
import "../globals.css";
import Loader from "../components/loader";
const home = async () => {
  const games: { name: string }[] = await fetchHelper("/games");
  console.log(games);

  return <div className="text-9xl">HOMEEE</div>;
};

export default home;
