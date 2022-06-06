import "../../styles/global.scss";
import "./style.scss";
import DrawNavigation from "../../Components/DrawNavigation";
import FlatList from "../../Components/FlatList";
import ViewInfo from "../../Components/ViewInfo";
import NewProject from "../../Components/NewProject";

export function ProjectPanel() {
  return (
    <div id="container">
      <DrawNavigation />
      <div id="project-container">
        <div id="panel-container">
          <h1 id="panel-title">Painel de Projetos</h1>
          <FlatList
            dataList={[
              { id: 1, title: "lucas" },
              { id: 2, title: "caio" },
              { id: 3, title: "levi" },
              { id: 3, title: "levi" },
              { id: 3, title: "levi" },
              { id: 3, title: "levi" },
              { id: 3, title: "levi" },
              { id: 3, title: "levi" },
              { id: 3, title: "levi" },
              { id: 3, title: "levi" },
              { id: 3, title: "levi" },
              { id: 3, title: "levi" },
              { id: 3, title: "levi" },
              { id: 3, title: "levi" },
              { id: 3, title: "levi" },
              { id: 3, title: "levi" },
              { id: 3, title: "levi" },
              { id: 3, title: "levi" },
              { id: 3, title: "levi" },
              { id: 3, title: "levi" },
              { id: 3, title: "levi" },
            ]}
            FirstComponent={NewProject}
            ComponentProp={ViewInfo}
          />
        </div>
      </div>
    </div>
  );
}
