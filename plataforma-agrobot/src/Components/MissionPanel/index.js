import "../../styles/global.scss";
import "./style.scss";
import FlatList from "../../Components/FlatList";
import ViewInfo from "../../Components/ViewInfo";
import NewProject from "../../Components/NewProject";
import AddProject from "../../Components/AddProject";
import { useContext, useEffect, useState } from "react";
import { TargetScreenContext } from "../../Context/TargetScreen";
import { DataContext } from "../../Context/DataContext";
import { MdDownload } from "react-icons/md";

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

  const writeProjectFile = (data) => {
    const blob = new Blob([data], { type: "text/json" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "missions.json";
    link.click();
  };

  return (
    <div id="project-container">
      <div id="panel-container">
        <div id="header-title">
          <h1 id="panel-title">Painel de Missões</h1>
          <div id="download-icon">
            <MdDownload
              size={25}
              onClick={() => {
                let outputJson = [];
                for (let i = 0; i < viewMissions.length; i++) {
                  outputJson.push({
                    name: viewMissions[i].titleView,
                    order: i,
                    locations: [],
                  });
                  for (let j = 0; j < viewMissions[i].locations.length; j++) {
                    outputJson[i].locations.push({
                      action:
                        viewMissions[i].locations[j].actions[0].actionType
                          .actionName,
                      order: j,
                      latitude: viewMissions[i].locations[j].latitude,
                      longitude: viewMissions[i].locations[j].longitude,
                    });
                  }
                }
                writeProjectFile(JSON.stringify(outputJson));
              }}
            />
          </div>
        </div>
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
