import { createContext, useState } from "react";

export const DataContext = createContext();

export function DataContextProvider(props) {
  const [userData, setUserData] = useState({});
  const [user, setUser] = useState("Lucas");

  return (
    <DataContext.Provider
      value={{
        userData,
        setUserData,
        user,
        setUser,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
