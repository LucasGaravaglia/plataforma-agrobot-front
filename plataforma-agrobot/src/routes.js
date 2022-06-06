import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DrawNavigation from "./Components/DrawNavigation";
import NewProject from "./Components/NewProject";
import ViewInfo from "./Components/ViewInfo";
import { ProjectPanel } from "./Pages/ProjectPanel";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProjectPanel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
