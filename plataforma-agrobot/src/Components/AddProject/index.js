import "./style.scss";

function AddProject({ listTypeProjects = [1, 2, 3, 4] }) {
  return (
    <>
      <div id="container-box-addProject">
        <div id="box-top-AddProject">
          <h1 id="title-AddProject">Criar Novo Projeto</h1>
          <div id="box-top-button">
            <h1 id="title-button">Cancelar</h1>
          </div>
        </div>
        <div id="box-bottom">
          <div className="container-text-input">
            <h1 className="text-AddProject">Nome Projeto</h1>
            <h1 className="text-AddProject">Tipo do Projeto</h1>
            <h1 className="text-AddProject">Data</h1>
          </div>
          <div className="container-input">
            <input type="text" className="input-AddProject" />
            <select className="input-AddProject">
              {listTypeProjects.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
            <input type="text" className="input-AddProject" />
          </div>
        </div>
        <div id="box-bottom-button">
          <h1 id="title-button">Ok</h1>
        </div>
      </div>
    </>
  );
}

export default AddProject;
