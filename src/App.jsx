import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Topbar from "./components/common/Topbar";
import Sidebar from "./components/common/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import Form from "./pages/form/ContactForm";
import ProductPage from "./pages/products/ProductPage";
import Profile from "./pages/profile/Profile";
import LoginPage from "./components/auth/LoginPage";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./styles/theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app" style={{ height: '100vh', display: 'flex' }}>
        {isAuthenticated && location.pathname !== "/login" && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {isAuthenticated && location.pathname !== "/login" && <Topbar setAuthenticated={setAuthenticated} />}
            <Routes>
              <Route path="/" element={isAuthenticated ? <Navigate to={location.pathname} /> : <Navigate to="/login" />} />
              <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/form" element={isAuthenticated ? <Form /> : <Navigate to="/login" />} />
              <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
              <Route path="/products" element={isAuthenticated ? <ProductPage /> : <Navigate to="/login" />} />
              <Route path="/login" element={<LoginPage setAuthenticated={setAuthenticated} />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
