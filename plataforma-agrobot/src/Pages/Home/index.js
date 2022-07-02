import { useContext } from "react";
import "../../styles/global.scss";
import "./style.scss";

import DrawNavigation from "../../Components/DrawNavigation";
import ProjectPanel from "../../Components/ProjectPanel";
import MissionPanel from "../../Components/MissionPanel";
import PointsPanel from "../../Components/PointsPanel";
import NewLocation from "../../Components/NewLocation";

import { TargetScreenContext } from "../../Context/TargetScreen";
import SetAction from "../../Components/SetAction";

export default function Home() {
  const { currentScreen } = useContext(TargetScreenContext);

  const SelectScreen = () => {
    if (currentScreen === 0) return <ProjectPanel />;
    if (currentScreen === 1) return <MissionPanel />;
    if (currentScreen === 2) return <PointsPanel />;
    else return <ProjectPanel />;
  };
  return (
    <div id="container">
      <DrawNavigation />
      {SelectScreen()}
      {/* <SetAction /> */}
    </div>
  );
}
