import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import MainPage from "./pages/MainPage"
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CaselistPage from "./pages/CaselistPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<CaselistPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
