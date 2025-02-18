import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.status);

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Home />}
      />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />}
      />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;
