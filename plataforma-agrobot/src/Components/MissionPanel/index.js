import "../../styles/global.scss";
import "./style.scss";
import FlatList from "../../Components/FlatList";
import ViewInfo from "../../Components/ViewInfo";
import NewProject from "../../Components/NewProject";
import { MdArrowBack } from "react-icons/md";

export default function MissionPanel() {
  return (
    <div id="project-container">
      <div id="panel-container">
        <div className="icon-arrow-back">
          <MdArrowBack size={20} />
        </div>
        <h1 id="panel-title">Painel de Missões</h1>
        <FlatList
          dataList={[
            { isLarge: false, id: 1, title: "lucas" },
            { isLarge: false, id: 2, title: "caio" },
            { isLarge: false, id: 3, title: "levi" },
            { isLarge: false, id: 3, title: "levi" },
            { isLarge: false, id: 3, title: "levi" },
            { isLarge: false, id: 3, title: "levi" },
            { isLarge: false, id: 3, title: "levi" },
            { isLarge: false, id: 3, title: "levi" },
            { isLarge: false, id: 3, title: "levi" },
            { isLarge: false, id: 3, title: "levi" },
          ]}
          FirstComponent={NewProject}
          ComponentProp={ViewInfo}
        />
      </div>
    </div>
  );
}
