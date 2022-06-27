import { useState, useContext } from "react";
import { DataContext } from "../../Context/DataContext";
import { TargetScreenContext } from "../../Context/TargetScreen";
import "./style.scss";

function ViewInfo({
  dataList,
  ComponentProp,
  FirstComponent,
  onClick,
  screenTarget = 1,
}) {
  const { setMissions, setProject } = useContext(DataContext);
  const { setCurrentScreen } = useContext(TargetScreenContext);

  const handlerSetProject = (item) => {
    console.log(item);
    setMissions(item.missions);
    setCurrentScreen(screenTarget);
  };
  return (
    <div id="container-List">
      <ul>
        <li>
          <FirstComponent
            isLarge={dataList[0].isLarge}
            onClick={() => onClick()}
          />
        </li>
        {dataList.map((Item) => (
          <li>
            <ComponentProp
              titleView={Item.titleView}
              isLarge={Item.isLarge}
              numericField={Item.numericField}
              FirstField={Item.FirstField}
              onClick={() => handlerSetProject(Item)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewInfo;
