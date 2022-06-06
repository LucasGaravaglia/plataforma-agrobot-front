import { useState } from "react";
import { MdDownload } from "react-icons/md";
import "./style.scss";

function ViewInfo({ dataList, ComponentProp, FirstComponent }) {
  return (
    <div id="container-List">
      <ul>
        <li>
          <FirstComponent />
        </li>
        {dataList.map((Item) => (
          <li>
            <ComponentProp numericField={Item.id} titleView={Item.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewInfo;
