import { useContext, useState } from "react";
import api from "../../services/api";
import { DataContext } from "../../Context/DataContext";
import "./style.scss";

function AddProject({ listTypeProjects = ["delivery", "rural"], onClick }) {
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectDate, setProjectDate] = useState("");
  const { user } = useContext(DataContext);

  const handleChangeProjectName = (event) => {
    setProjectName(event.target.value);
  };

  const handleChangeProjectType = (event) => {
    setProjectType(event.target.value);
  };

  const handleChangeProjectDate = (event) => {
    setProjectDate(event.target.value);
  };

  const handleConfirmButton = () => {
    api
      .post("/projects?populate=*", {
        data: {
          projectName: projectName,
          projectDate: projectDate,
          // user: user,
        },
      })
      .catch((err) => {
        console.log(err);
      });
    onClick();
  };
  return (
    <div className="container-hover">
      <div id="container-box-addProject">
        <div id="box-top-AddProject">
          <h1 id="title-AddProject">Criar Novo Projeto</h1>
          <div id="box-top-button" onClick={() => onClick()}>
            <h1 id="title-button">Cancelar</h1>
          </div>
        </div>
        <div id="box-bottom">
          <div className="content-box-bottom">
            <div className="container-text-input">
              <h1 className="text-AddProject">Nome Projeto</h1>
              <h1 className="text-AddProject">Tipo do Projeto</h1>
              <h1 className="text-AddProject">Data</h1>
            </div>
            <div className="container-input">
              <input
                type="text"
                className="input-AddProject"
                onChange={handleChangeProjectName}
                value={projectName}
              />
              <select
                className="input-AddProject"
                onChange={handleChangeProjectType}
              >
                {listTypeProjects.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
              <input
                type="text"
                className="input-AddProject"
                onChange={handleChangeProjectDate}
                value={projectDate}
              />
            </div>
          </div>
          <div id="container-bottom-button">
            <div id="box-bottom-button" onClick={() => handleConfirmButton()}>
              <h1 id="title-button">Ok</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProject;
