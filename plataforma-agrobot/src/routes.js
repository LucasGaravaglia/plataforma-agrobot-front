import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DrawNavigation from "./Components/DrawNavigation";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DrawNavigation />} />
          {/* <Route path="expenses" element={<Expenses />} />
          <Route path="invoices" element={<Invoices />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
