import { useState } from "react";
import {
  MdArrowLeft,
  MdMenuBook,
  MdGroup,
  MdSettings,
  MdLogout,
  MdMenu,
} from "react-icons/md";
import "./style.scss";

function DrawNavigation() {
  const [open, setOpen] = useState(true);
  const toggleBar = () => {
    setOpen(!open);
    console.log(open);
  };
  return (
    <div id="side-bar" className={open ? "open" : "close"}>
      <ul>
        <li onClick={toggleBar} className={open ? "open" : "close"}>
          <div id="liDiv">
            <h2>Plataforma Missões</h2>
            {open ? (
              <MdArrowLeft size={50} id="iconStyle" />
            ) : (
              <MdMenu size={30} id="iconStyle" />
            )}
          </div>
        </li>
        <li id="li-color" className={open ? "open" : "close"}></li>
        <div>
          <li className={open ? "open" : "close"}>
            <MdMenuBook size={30} id="iconStyle" />
            <h3>Projetos</h3>
          </li>
          <li className={open ? "open" : "close"}>
            <MdGroup size={30} id="iconStyle" />
            <h3>Perfil</h3>
          </li>
        </div>
        <li id="fill-drawNavigation" />
        <li className={open ? "open" : "close"}>
          <MdSettings size={30} id="iconStyle" />
          <h3>Configurações</h3>
        </li>

        <li id="li-color" className={open ? "open" : "close"}>
          <div id="liDiv">
            <h4>Log Out</h4>
            <MdLogout size={30} id="iconStyle" />
          </div>
        </li>
      </ul>
    </div>
  );
}

export default DrawNavigation;
