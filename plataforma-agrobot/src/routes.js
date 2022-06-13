import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { TargetScreenContextProvider } from "./Context/TargetScreen";
import { DataContextProvider } from "./Context/DataContext";

function App() {
  return (
    <div>
      <DataContextProvider>
        <TargetScreenContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </TargetScreenContextProvider>
      </DataContextProvider>
    </div>
  );
}

export default App;
