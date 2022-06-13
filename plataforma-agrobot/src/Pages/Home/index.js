import { useContext, useEffect } from "react";
import "../../styles/global.scss";
import "./style.scss";

import DrawNavigation from "../../Components/DrawNavigation";
import ProjectPanel from "../../Components/ProjectPanel";
import MissionPanel from "../../Components/MissionPanel";
import PointsPanel from "../../Components/PointsPanel";

import { TargetScreenContext } from "../../Context/TargetScreen";
import { DataContext } from "../../Context/DataContext";

export default function Home() {
  const { currentScreen } = useContext(TargetScreenContext);
  const { userData } = useContext(DataContext);

  const SelectScreen = () => {
    if (currentScreen === 0) return <ProjectPanel data={userData} />;
    if (currentScreen === 1) return <MissionPanel data={userData} />;
    if (currentScreen === 2) return <PointsPanel data={userData} />;
  };
  return (
    <div id="container">
      <DrawNavigation />
      {/* <AddProject /> */}
      {SelectScreen()}
      {/* <ProjectPanel /> */}
      {/* <PointsPanel /> */}
      {/* <MissionPanel /> */}
    </div>
  );
}
