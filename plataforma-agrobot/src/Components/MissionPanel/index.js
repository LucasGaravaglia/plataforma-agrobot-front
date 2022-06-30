import "../../styles/global.scss";
import "./style.scss";
import FlatList from "../../Components/FlatList";
import ViewInfo from "../../Components/ViewInfo";
import NewProject from "../../Components/NewProject";
import { MdArrowBack } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { TargetScreenContext } from "../../Context/TargetScreen";
import { DataContext } from "../../Context/DataContext";

export default function MissionPanel() {
  const { missions, flag, setLocations } = useContext(DataContext);
  const { currentScreen } = useContext(TargetScreenContext);
  const [viewMissions, setViewMissions] = useState([{ isLarge: false }]);
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
        <FlatList
          dataList={viewMissions}
          FirstComponent={NewProject}
          ComponentProp={ViewInfo}
          onClick={() => {}}
          screenTarget={2}
          setter={setLocations}
        />
      </div>
    </div>
  );
}
