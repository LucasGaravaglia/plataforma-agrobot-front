import { useContext } from "react";
import "../../styles/global.scss";
import "./style.scss";

import DrawNavigation from "../../Components/DrawNavigation";
import ProjectPanel from "../../Components/ProjectPanel";
import MissionPanel from "../../Components/MissionPanel";
import PointsPanel from "../../Components/PointsPanel";

import { TargetScreenContext } from "../../Context/TargetScreen";
import { Login } from "../../Components/Login";
import { DataContext } from "../../Context/DataContext";

import Location from "../../Components/NewLocation";

export default function Home() {
  const { currentScreen } = useContext(TargetScreenContext);
  const { isAuthenticated } = useContext(DataContext);

  const SelectScreen = () => {
    if (currentScreen === 0) return <ProjectPanel />;
    if (currentScreen === 1) return <MissionPanel />;
    if (currentScreen === 2) return <PointsPanel />;
    else return <ProjectPanel />;
  };

  return (
    <div id="container">
      {!isAuthenticated ? (
        <Login />
      ) : (
        <>
          <DrawNavigation />
          {SelectScreen()}
        </>
      )}
      {/* <Location /> */}
    </div>
  );
}
