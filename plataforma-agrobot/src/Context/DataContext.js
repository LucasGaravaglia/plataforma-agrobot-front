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
  const [projectData, setProjectData] = useState([
    {
      titleView: "titleView",
      numericField: "1",
      FirstField: "FirstField",
      isLarge: true,
    },
  ]);
  const [user, setUser] = useState(1);
  const [project, setProject] = useState();
  const [missions, setMissions] = useState([
    {
      titleView: "titleView",
      numericField: "1",
      FirstField: "FirstField",
      isLarge: false,
    },
  ]);
  const [flag, setFlag] = useState(true);

  return (
    <DataContext.Provider
      value={{
        setProject,
        setMissions,
        missions,
        project,
        userData,
        setUserData,
        user,
        setUser,
        flag,
        setFlag,
        projectData,
        setProjectData,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
