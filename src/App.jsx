import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import MainPage from "./pages/MainPage"
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import CreatePage from "./pages/CreatePage";
import CaseUnit from "./components/Case/CaseUnit";
import UpdatePage from "./pages/UpdatePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/update" element={<UpdatePage />} />
          <Route path="/case/:id" element={<CaseUnit/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;