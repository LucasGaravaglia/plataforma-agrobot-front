import { createContext, useState } from "react";

export const TargetScreenContext = createContext();

export function TargetScreenContextProvider(props) {
  const [currentScreen, setCurrentScreen] = useState(0);
  return (
    <TargetScreenContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
      }}
    >
      {props.children}
    </TargetScreenContext.Provider>
  );
}
