import { useContext, useEffect, useState } from "react";
import "../../styles/global.scss";
import "./style.scss";
import FlatList from "../../Components/FlatList";
import ViewInfo from "../../Components/ViewInfo";
import NewProject from "../../Components/NewProject";
import AddProject from "../../Components/AddProject";

import api from "../../services/api";
import { DataContext } from "../../Context/DataContext";
import { TargetScreenContext } from "../../Context/TargetScreen";

export default function ProjectPanel() {
  const { userData, setUserData, user, flag, setMissions } =
    useContext(DataContext);
  const { currentScreen } = useContext(TargetScreenContext);
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    api
      .get(`/projects=${user}`)
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          if (i === 0)
            setUserData([
              {
                titleView: res.data[i].projectName,
                numericField: res.data[i].missions.length,
                FirstField: res.data[i].projectDate,
                isLarge: true,
                id: res.data[i].id,
                missions: res.data[i].missions,
              },
            ]);
          else
            setUserData((oldArray) => [
              ...oldArray,
              {
                titleView: res.data[i].projectName,
                numericField: res.data[i].missions.length,
                FirstField: res.data[i].projectDate,
                isLarge: true,
                id: res.data[i].id,
                missions: res.data[i].missions,
              },
            ]);
        }
      })
      .catch((err) => {
        setUserData([
          {
            titleView: "Erro ao conectar com backend",
            numericField: 2,
            FirstField: String(err),
            isLarge: false,
            id: 1,
          },
        ]);
      });
  }, [currentScreen, flag]);
  return (
    <div id="project-container">
      <div id="panel-container">
        <h1 id="panel-title">Painel de Projetos</h1>
        <FlatList
          dataList={userData}
          FirstComponent={NewProject}
          ComponentProp={ViewInfo}
          onClick={() => setOverlay((old) => !old)}
          screenTarget={1}
          setter={setMissions}
        />
        {overlay ? (
          <div className="overlay">
            <AddProject onClick={() => setOverlay((old) => !old)} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
