import { useState } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import "./style.scss";

function NewProject({ isLarge = true }) {
  return (
    <div id="container-box" className={isLarge ? "large" : "small"}>
      <MdCreateNewFolder size={30} color="#1C1B1F" />
    </div>
  );
}

export default NewProject;
