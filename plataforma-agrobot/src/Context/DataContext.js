import { createContext, useState } from "react";

export const DataContext = createContext();

export function DataContextProvider(props) {
  const [userData, setUserData] = useState([
    {
      titleView: "titleView",
      numericField: "1",
      FirstField: "FirstField",
      isLarge: true,
    },
  ]);
  const [user, setUser] = useState(1);
  const [mission, setMission] = useState(1);
  const [idProject, setIdProject] = useState(1);
  const [missions, setMissions] = useState([
    {
      titleView: "titleView",
      numericField: "1",
      FirstField: "FirstField",
      isLarge: false,
    },
  ]);
  const [flag, setFlag] = useState(true);
  const [locations, setLocations] = useState([
    {
      titleView: "titleView",
      numericField: "1",
      FirstField: "FirstField",
      isLarge: true,
    },
  ]);

  return (
    <DataContext.Provider
      value={{
        setMissions,
        locations,
        setLocations,
        missions,
        userData,
        setUserData,
        user,
        setUser,
        flag,
        setFlag,
        idMission: mission,
        setIdMission: setMission,
        idProject,
        setIdProject,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
