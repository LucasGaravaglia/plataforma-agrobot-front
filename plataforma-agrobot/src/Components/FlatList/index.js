import { useState } from "react";
import { MdDownload } from "react-icons/md";
import "./style.scss";

function ViewInfo({ dataList, ComponentProp, FirstComponent }) {
  return (
    <div id="container-List">
      <ul>
        <li>
          <FirstComponent isLarge={dataList[0].isLarge} />
        </li>
        {dataList.map((Item) => (
          <li>
            <ComponentProp
              numericField={Item.id}
              titleView={Item.title}
              isLarge={Item.isLarge}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewInfo;
