import { useState } from "react";
import { MdDownload } from "react-icons/md";
import "./style.scss";

function ViewInfo({
  isLarge = true,
  titleView = "Pulverizar Plantação Região Leste",
  numericField = 0,
  FirstField = "Delivery",
  SecondField = "20/03/2000",
}) {
  return (
    <>
      <div id="container-box" className={isLarge ? "large" : "small"}>
        <div id="box-top">
          <h1 id="title-viewInfo">{titleView}</h1>
        </div>
        <div id="box-bottom">
          {isLarge ? (
            <>
              <div id="content-1">
                <h2 id="numeric-field-viewInfo">
                  N° de Missões: {numericField}
                </h2>
              </div>
              <div id="content-2">
                <div id="container-text">
                  <h3 id="first-field-viewInfo">Tipo: </h3>
                  <h4 id="second-field-viewInfo">{FirstField}</h4>
                </div>
                <div id="container-text">
                  <h3 id="first-field-viewInfo">Data: </h3>
                  <h4 id="second-field-viewInfo">{SecondField}</h4>
                </div>
              </div>
            </>
          ) : (
            <>
              <div id="content-1">
                <h2>N° de Pontos: {numericField}</h2>
              </div>
              <div id="content-2">
                <div id="container-text">
                  <h3>Ordem: </h3>
                  <h4>{FirstField}</h4>
                </div>
              </div>
            </>
          )}
          {isLarge ? (
            <div id="content-3">
              <div id="icon">
                <MdDownload size={16} color="#1C1B1F" />
              </div>
            </div>
          ) : (
            <div id="content-3" />
          )}
        </div>
      </div>
    </>
  );
}

export default ViewInfo;
