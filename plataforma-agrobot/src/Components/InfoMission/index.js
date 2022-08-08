import "./style.scss";

function InfoMission({ titleView = "Latitude", content = [] }) {
  return (
    <>
      <div id="container-box" style={{ width: "250px" }}>
        <div id="box-top-InfoMission" style={{ width: "250px" }}>
          <h1 id="title-InfoMission">{titleView}</h1>
        </div>
        <div id="box-bottom" style={{ width: "250px" }}>
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
