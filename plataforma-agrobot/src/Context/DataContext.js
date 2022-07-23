import { createContext, useState } from "react";

export const DataContext = createContext();

export function DataContextProvider(props) {
  const [userData, setUserData] = useState([]);
  const [user, setUser] = useState();
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [mission, setMission] = useState(1);
  const [idProject, setIdProject] = useState(1);
  const [missions, setMissions] = useState([]);
  const [flag, setFlag] = useState(true);
  const [locations, setLocations] = useState([]);

  const cleanData = () => {
    setUserData([]);
    setUser();
    setAuthenticated(false);
    setMission(1);
    setIdProject(1);
    setMissions([]);
    setFlag(true);
    setLocations([]);
  };

  return (
    <DataContext.Provider
      value={{
        cleanData,
        isAuthenticated,
        setAuthenticated,
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
