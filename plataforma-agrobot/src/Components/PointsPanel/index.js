import "../../styles/global.scss";
import "./style.scss";
import InfoMission from "../../Components/InfoMission";
import { MdArrowBack } from "react-icons/md";

export default function PointsPanel({
  MissionTitle = "Pulverização plantação leste",
}) {
  return (
    <div id="project-container">
      <div id="panel-container">
        <div className="header-container-pointsPanel">
          <div className="icon-arrow-back">
            <MdArrowBack size={20} />
          </div>
          <div className="header-title-pointsPanel">
            <h1 id="panel-title">{MissionTitle}</h1>
            <div className="button-pointsPanel">
              <h1 className="button-content-text">Adicionar Localização</h1>
            </div>
          </div>
        </div>
        <div className="content-InfoMission">
          <InfoMission titleView="Ordem" />
          <InfoMission titleView="Latitude" />
          <InfoMission titleView="Longitude" />
          <InfoMission titleView="Ação" />
        </div>
      </div>
    </div>
  );
}