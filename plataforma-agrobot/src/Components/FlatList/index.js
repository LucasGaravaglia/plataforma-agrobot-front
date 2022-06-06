import { useState } from "react";
import { MdDownload } from "react-icons/md";
import "./style.scss";

function ViewInfo({ dataList, ComponentProp }) {
  return (
    <div id="container-List">
      <ul>
        {dataList.map((Item) => (
          <li>
            <ComponentProp numericField={Item.id} titleView={Item.title} />
          </li>
        ))}
      </ul>
      1
    </div>
  );
}

export default ViewInfo;
