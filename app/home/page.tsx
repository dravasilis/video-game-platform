import Background from "../components/background/background";
import Sidenav from "../components/sidenav";
import "../globals.css";
import "./page.module.css";

const home = async () => {
  // const res = await fetchHelper("/releases");
  // console.log(res);

  return (
    <>
      <Background />
      <Sidenav />
    </>
  );
};

export default home;
