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
  const { setCurrentScreen } = useContext(TargetScreenContext);
  const { setMissions, setLocations, setIdProject, setIdMission } =
    useContext(DataContext);

  const handlerSet = (item) => {
    console.log(item);
    if (screenTarget === 1) {
      setMissions(item.missions);
      setIdProject(item.id);
    } else if (screenTarget === 2) {
      setIdMission(item.id);
      setLocations(item.locations);
    }
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
        {dataList.map((Item, index) => (
          <li key={index}>
            <ComponentProp
              titleView={Item.titleView}
              isLarge={Item.isLarge}
              numericField={Item.numericField}
              FirstField={Item.FirstField}
              onClick={() => handlerSet(Item)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewInfo;
