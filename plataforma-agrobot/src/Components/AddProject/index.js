import { useContext, useState } from "react";
import api from "../../services/api";
import { DataContext } from "../../Context/DataContext";
import { TargetScreenContext } from "../../Context/TargetScreen";
import "./style.scss";

function AddProject({ onClick }) {
  const [projectName, setProjectName] = useState("");
  const [projectDate, setProjectDate] = useState("");
  const { user, setFlag, idProject } = useContext(DataContext);
  const { currentScreen } = useContext(TargetScreenContext);

  const handleChangeProjectName = (event) => {
    setProjectName(event.target.value);
  };

  const handleChangeProjectDate = (event) => {
    setProjectDate(event.target.value);
  };

  const handleConfirmButton = async () => {
    if (currentScreen == 0) {
      api
        .post("project", {
          projectName: projectName,
          projectDate: projectDate,
          idUser: user,
        })
        .then((res) => {
          setFlag((old) => !old);
          onClick();
        })
        .catch((err) => {
          onClick();
        });
    } else if (currentScreen == 1) {
      let missions = await api.get(`missions=${idProject}`);
      let data = {
        missionName: projectName,
        missionOrder: missions.data[missions.data.length - 1].missionOrder + 1,
        idProject: idProject,
      };
      console.log(data);
      api
        .post("mission", data)
        .then((res) => {
          setFlag((old) => !old);
          onClick();
        })
        .catch((err) => {
          onClick();
        });
    }
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
              {currentScreen == 0 ? (
                <>
                  <h1 className="text-AddProject">Nome Projeto</h1>
                  <h1 className="text-AddProject">Data</h1>
                </>
              ) : (
                <h1 className="text-AddProject">Nome da missão</h1>
              )}
            </div>
            <div className="container-input">
              <input
                type="text"
                className="input-AddProject"
                onChange={handleChangeProjectName}
                value={projectName}
              />
              {currentScreen == 0 ? (
                <input
                  type="date"
                  className="input-AddProject"
                  onChange={handleChangeProjectDate}
                  value={projectDate}
                />
              ) : null}
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
