import "../../styles/global.scss";
import "./style.scss";
import DrawNavigation from "../../Components/DrawNavigation";
import ProjectPanel from "../../Components/ProjectPanel";
import MissionPanel from "../../Components/MissionPanel";
import PointsPanel from "../../Components/PointsPanel";
import InfoMission from "../../Components/InfoMission";

export default function Home() {
  return (
    <div id="container">
      <DrawNavigation />
      {/* <ProjectPanel /> */}
      <PointsPanel />
      {/* <MissionPanel /> */}
    </div>
  );
}
