import React from "react";
import { fetchHelper } from "../helpers/fetch-helper";
import "./page.module.css";
import "../globals.css";
import Loader from "../components/loader";

const home = async () => {
  const res = await fetchHelper("/games");
  console.log(res);

  return (
    <div className="text-9xl">
      {res.status_code === 1 ? "Home" : <Loader />}
    </div>
  );
};

export default home;
