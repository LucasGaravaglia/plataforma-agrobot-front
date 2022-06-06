import "../../styles/global.scss";
import "./style.scss";
import DrawNavigation from "../../Components/DrawNavigation";
import ProjectPanel from "../../Components/ProjectPanel";
import MissionPanel from "../../Components/MissionPanel";

export default function Home() {
  return (
    <div id="container">
      <DrawNavigation />
      {/* <ProjectPanel /> */}
      <MissionPanel />
    </div>
  );
}
