import { useState } from "react";
import { MdDownload } from "react-icons/md";
import "./style.scss";

function InfoMission({ titleView = "Latitude", content = [] }) {
  return (
    <>
      <div id="container-box">
        <div id="box-top-InfoMission">
          <h1 id="title-InfoMission">{titleView}</h1>
        </div>
        <div id="box-bottom">
          <ul>
            {content.map((Item) => (
              <li>{Item}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default InfoMission;
