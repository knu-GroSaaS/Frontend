import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CaselistPage from "./pages/CaselistPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<MainPage />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<CaselistPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
