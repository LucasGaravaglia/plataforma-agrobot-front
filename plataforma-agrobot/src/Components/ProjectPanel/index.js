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
  const { userData, setUserData, user, flag } = useContext(DataContext);
  const { currentScreen } = useContext(TargetScreenContext);
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    api
      .get(`/projects?populate=*&filters[user][id][$eq]=${user}`)
      .then((res) => {
        for (let i = 0; i < res.data.res.length; i++) {
          if (i === 0)
            setUserData([
              {
                titleView: res.data.res[i].attributes.projectName,
                numericField: res.data.res[i].attributes.missions.data.length,
                FirstField: "Delivery",
                SecondField: res.data.res[i].attributes.projectDate,
                isLarge: true,
              },
            ]);
          else
            setUserData((oldArray) => [
              ...oldArray,
              {
                titleView: res.data.res[i].attributes.projectName,
                numericField: res.data.res[i].attributes.missions.data.length,
                FirstField: "Delivery",
                SecondField: res.data.res[i].attributes.projectDate,
                isLarge: true,
              },
            ]);
        }
      })
      .catch((err) => {
        setUserData("Erro");
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
