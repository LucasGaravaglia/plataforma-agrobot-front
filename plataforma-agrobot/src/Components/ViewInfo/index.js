import { useState } from "react";
import "./style.scss";

function ViewInfo({
  isLarge = true,
  titleView = "Pulverizar Plantação Região Leste",
  numericField = 0,
  FirstField = "20/03/2000",
  onClick,
}) {
  const [hoverIcon, setHoverIcon] = useState(false);
  return (
    <>
      <div
        id="container-box"
        style={{ width: "250px" }}
        onMouseEnter={() => {
          setHoverIcon(true);
        }}
        onMouseLeave={() => {
          setHoverIcon(false);
        }}
        className={`${hoverIcon ? "hover" : "notHover"} ${
          isLarge ? "large" : "small"
        }`}
        onClick={() => onClick()}
      >
        <div id="box-top" style={{ width: "250px" }}>
          <h1 id="title-viewInfo">{titleView}</h1>
        </div>
        <div id="box-bottom" style={{ width: "250px" }}>
          {isLarge ? (
            <>
              <div id="content-1">
                <h2 id="numeric-field-viewInfo">
                  N° de Missões: {numericField}
                </h2>
              </div>
              <div id="content-2">
                <div id="container-text">
                  <h3 id="first-field-viewInfo">Data: </h3>
                  <h4 id="second-field-viewInfo">{FirstField}</h4>
                </div>
              </div>
            </>
          ) : (
            <>
              <div id="content-1">
                <h2 id="numeric-field-viewInfo">
                  N° de Pontos: {numericField}
                </h2>
              </div>
              <div id="content-2">
                <div id="container-text">
                  <h3 id="first-field-viewInfo">Ordem: </h3>
                  <h4 id="second-field-viewInfo">{FirstField}</h4>
                </div>
              </div>
            </>
          )}
          <div id="content-3" />
        </div>
      </div>
    </>
  );
}

export default ViewInfo;
