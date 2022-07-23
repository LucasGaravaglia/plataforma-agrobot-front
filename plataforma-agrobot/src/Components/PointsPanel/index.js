import "../../styles/global.scss";
import "./style.scss";
import InfoMission from "../../Components/InfoMission";
import NewLocation from "../../Components/NewLocation";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Context/DataContext";

export default function PointsPanel({
  MissionTitle = "Pulverização plantação leste",
}) {
  const { locations } = useContext(DataContext);
  const [overlay, setOverlay] = useState(false);
  const [lats, setLats] = useState([]);
  const [longs, setLongs] = useState([]);
  const [actions, setActions] = useState([]);
  useEffect(() => {
    setLats([]);
    setLongs([]);
    setActions([]);
    locations.map((location) => {
      setLats((old) => [...old, location.latitude]);
      setLongs((old) => [...old, location.longitude]);
      if (location.actions[0] && location.actions[0].actionType)
        setActions((old) => [
          ...old,
          location.actions[0].actionType.actionName,
        ]);
    });
  }, []);
  useEffect(() => {
    setLats([]);
    setLongs([]);
    setActions([]);
    locations.map((location) => {
      setLats((old) => [...old, location.latitude]);
      setLongs((old) => [...old, location.longitude]);
      if (location.actions[0] && location.actions[0].actionType)
        setActions((old) => [
          ...old,
          location.actions[0].actionType.actionName,
        ]);
    });
  }, [overlay]);
  return (
    <div id="project-container">
      <div id="panel-container">
        <div className="header-container-pointsPanel">
          <div className="header-title-pointsPanel">
            <h1 id="panel-title">{MissionTitle}</h1>
            <div
              className="button-pointsPanel"
              onClick={() => setOverlay((old) => !old)}
            >
              <h1 className="button-content-text">
                {!overlay ? "Adicionar Localização" : "Sair"}
              </h1>
            </div>
          </div>
        </div>
        {!overlay ? (
          <div className="content-InfoMission">
            <InfoMission titleView="Latitude" content={lats} />
            <InfoMission titleView="Longitude" content={longs} />
            <InfoMission titleView="Ação" content={actions} />
          </div>
        ) : (
          <NewLocation />
        )}
      </div>
    </div>
  );
}
