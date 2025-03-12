import React from "react";
import { fetchHelper } from "../helpers/fetch-helper";
import "./page.module.css";
import "../globals.css";
import Loader from "../components/loader";

const home = async () => {
  const res = await fetchHelper("/games");

  return (
    <div className="text-9xl">
      {res.status_code === 1 ? "HOMEEEEE" : <Loader />}
    </div>
  );
};

export default home;
