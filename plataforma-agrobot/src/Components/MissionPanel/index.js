import "../../styles/global.scss";
import "./style.scss";
import FlatList from "../../Components/FlatList";
import ViewInfo from "../../Components/ViewInfo";
import NewProject from "../../Components/NewProject";
import { MdArrowBack } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { TargetScreenContext } from "../../Context/TargetScreen";
import { DataContext } from "../../Context/DataContext";
import api from "../../services/api";

export default function MissionPanel() {
  const { missions, flag } = useContext(DataContext);
  const { currentScreen, setCurrentScreen } = useContext(TargetScreenContext);
  const [overlay, setOverlay] = useState(false);
  const [viewMissions, setViewMissions] = useState([{ isLarge: false }]);
  useEffect(() => {
    console.log(missions);
    for (let i = 0; i < missions.length; i++) {
      if (i === 0)
        setViewMissions([
          {
            titleView: missions[i].missionName,
            numericField: 1,
            FirstField: missions[i].missionOrder,
            isLarge: false,
          },
        ]);
      else
        setViewMissions((oldArray) => [
          ...oldArray,
          {
            titleView: missions[i].missionName,
            numericField: 1,
            FirstField: missions[i].missionOrder,
            isLarge: false,
          },
        ]);
    }
  }, [currentScreen, flag, missions]);
  return (
    <div id="project-container">
      <div id="panel-container">
        <div className="icon-arrow-back">
          <MdArrowBack size={20} onClick={() => setCurrentScreen(0)} />
        </div>
        <h1 id="panel-title">Painel de Missões</h1>
        <FlatList
          dataList={viewMissions}
          FirstComponent={NewProject}
          ComponentProp={ViewInfo}
          onClick={() => {}}
          screenTarget={2}
        />
      </div>
    </div>
  );
}
