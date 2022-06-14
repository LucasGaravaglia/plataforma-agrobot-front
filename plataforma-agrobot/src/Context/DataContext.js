import { createContext, useState } from "react";

export const DataContext = createContext();

export function DataContextProvider(props) {
  const [userData, setUserData] = useState([
    {
      titleView: "titleView",
      numericField: "1",
      FirstField: "FirstField",
      SecondField: "SecondField",
      isLarge: true,
    },
  ]);
  const [user, setUser] = useState(1);
  const [flag, setFlag] = useState(true);

  return (
    <DataContext.Provider
      value={{
        userData,
        setUserData,
        user,
        setUser,
        flag,
        setFlag,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
