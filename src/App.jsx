import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LoadingPage from "./pages/LoadingPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<MainPage />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/loading" element={<LoadingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
