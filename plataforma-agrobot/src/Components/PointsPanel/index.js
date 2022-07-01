import "../../styles/global.scss";
import "./style.scss";
import InfoMission from "../../Components/InfoMission";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Context/DataContext";

export default function PointsPanel({
  MissionTitle = "Pulverização plantação leste",
}) {
  const { locations } = useContext(DataContext);
  const [order, setOrder] = useState([]);
  const [lats, setLats] = useState([]);
  const [longs, setLongs] = useState([]);
  const [actions, setActions] = useState([]);
  useEffect(() => {
    setLats([]);
    setLongs([]);
    setOrder([]);
    setActions([]);
    locations.map((location) => {
      setLats((old) => [...old, location.latitude]);
      setLongs((old) => [...old, location.longitude]);
      setOrder((old) => [...old, location.locationOrder]);
      if (location.actions[0] && location.actions[0].actionType)
        setActions((old) => [
          ...old,
          location.actions[0].actionType.actionName,
        ]);
    });
  }, []);
  return (
    <div id="project-container">
      <div id="panel-container">
        <div className="header-container-pointsPanel">
          <div className="header-title-pointsPanel">
            <h1 id="panel-title">{MissionTitle}</h1>
            <div className="button-pointsPanel">
              <h1 className="button-content-text">Adicionar Localização</h1>
            </div>
          </div>
        </div>
        <div className="content-InfoMission">
          <InfoMission titleView="Ordem" content={order} />
          <InfoMission titleView="Latitude" content={lats} />
          <InfoMission titleView="Longitude" content={longs} />
          <InfoMission titleView="Ação" content={actions} />
        </div>
      </div>
    </div>
  );
}
