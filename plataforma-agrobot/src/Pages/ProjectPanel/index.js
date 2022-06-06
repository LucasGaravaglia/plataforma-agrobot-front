import "../../styles/global.scss";
import "./style.scss";
import DrawNavigation from "../../Components/DrawNavigation";
import FlatList from "../../Components/FlatList";
import ViewInfo from "../../Components/ViewInfo";

export function ProjectPanel() {
  return (
    <div id="project-container">
      {/* <div id="panel-container"> */}
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
        ]}
        ComponentProp={ViewInfo}
      />
      {/* </div> */}
    </div>
  );
}
