import { useState } from "react";
import "./style.scss";

function ViewInfo({ dataList, ComponentProp, FirstComponent, onClick }) {
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
              SecondField={Item.SecondField}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewInfo;
