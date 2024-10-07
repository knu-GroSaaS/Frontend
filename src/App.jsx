import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

function App() {
const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  return (
    <>
      <BrowserRouter>
        {!isLoginPage && (
          <Sidebar />
        )}
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
