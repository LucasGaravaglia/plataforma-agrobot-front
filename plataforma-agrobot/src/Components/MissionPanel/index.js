import "../../styles/global.scss";
import "./style.scss";
import FlatList from "../../Components/FlatList";
import ViewInfo from "../../Components/ViewInfo";
import NewProject from "../../Components/NewProject";
import AddProject from "../../Components/AddProject";
import { useContext, useEffect, useState } from "react";
import { TargetScreenContext } from "../../Context/TargetScreen";
import { DataContext } from "../../Context/DataContext";

export default function MissionPanel() {
  const { missions, flag, setLocations } = useContext(DataContext);
  const { currentScreen, setCurrentScreen } = useContext(TargetScreenContext);
  const [viewMissions, setViewMissions] = useState([{ isLarge: false }]);
  const [overlay, setOverlay] = useState(false);
  useEffect(() => {
    for (let i = 0; i < missions.length; i++) {
      if (i === 0)
        setViewMissions([
          {
            id: missions[i].id,
            titleView: missions[i].missionName,
            numericField: 1,
            FirstField: missions[i].missionOrder,
            locations: missions[i].locations,
            isLarge: false,
          },
        ]);
      else
        setViewMissions((oldArray) => [
          ...oldArray,
          {
            id: missions[i].id,
            titleView: missions[i].missionName,
            numericField: 1,
            FirstField: missions[i].missionOrder,
            locations: missions[i].locations,
            isLarge: false,
          },
        ]);
    }
  }, [currentScreen, flag, missions]);

  return (
    <div id="project-container">
      <div id="panel-container">
        <h1 id="panel-title">Painel de Missões</h1>
        {viewMissions[0].id ? (
          <FlatList
            dataList={viewMissions}
            FirstComponent={NewProject}
            ComponentProp={ViewInfo}
            onClick={() => setOverlay((old) => !old)}
            screenTarget={2}
            setter={setLocations}
          />
        ) : (
          <NewProject
            isLarge={false}
            onClick={() => setOverlay((old) => !old)}
          />
        )}

        {overlay ? (
          <div className="overlay">
            <AddProject
              onClick={() => {
                setOverlay((old) => !old);
                setCurrentScreen(0);
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
