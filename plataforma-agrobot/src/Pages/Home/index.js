import "../../styles/global.scss";
import "./style.scss";
import DrawNavigation from "../../Components/DrawNavigation";
import ProjectPanel from "../../Components/ProjectPanel";

export default function Home() {
  return (
    <div id="container">
      <DrawNavigation />
      <ProjectPanel />
    </div>
  );
}
