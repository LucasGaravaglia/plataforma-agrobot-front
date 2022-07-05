import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { TargetScreenContextProvider } from "./Context/TargetScreen";
import { DataContextProvider } from "./Context/DataContext";
import { AuthContextProvider } from "./Context/Auth";

function App() {
  return (
    <div>
      <DataContextProvider>
        <AuthContextProvider>
          <TargetScreenContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </BrowserRouter>
          </TargetScreenContextProvider>
        </AuthContextProvider>
      </DataContextProvider>
    </div>
  );
}

export default App;
