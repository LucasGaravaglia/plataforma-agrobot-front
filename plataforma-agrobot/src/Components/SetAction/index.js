import { useEffect, useState } from "react";
import "../../styles/global.scss";
import "./style.scss";

import api from "../../services/api";

export default function SetAction({ ConfirmClick, CancelClick, id }) {
  const [action, setAction] = useState([]);
  const [selectedAction, setSelectedAction] = useState(1);

  useEffect(() => {
    api.get("actionType").then((response) => {
      setSelectedAction(response.data[0].actionName);
      setAction(response.data);
    });
  }, []);

  return (
    <div className="container-setAction">
      <div id="container-box-addProject">
        <div id="box-top-AddProject">
          <h1 id="title-AddProject">Selecionar Ação</h1>
          <div id="box-top-button" onClick={() => CancelClick()}>
            <h1 id="title-button">Cancelar</h1>
          </div>
        </div>
        <div id="box-bottom">
          <div className="content-box-bottom">
            <div className="container-text-input">
              <h1 className="text-AddProject">Ações</h1>
            </div>
            <div className="container-input">
              <select
                onChange={(d) => setSelectedAction(d.target.value)}
                className="select-setAction"
              >
                <option value={""}></option>
                {action.map((option) => (
                  <option value={option.id}>{option.actionName}</option>
                ))}
              </select>
            </div>
          </div>
          <div id="container-bottom-button">
            <div
              id="box-bottom-button"
              onClick={() => {
                api
                  .post("action", {
                    idActionType: selectedAction,
                    idLocation: id,
                  })
                  .then(() => {
                    ConfirmClick();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              <h1 id="title-button">Ok</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
