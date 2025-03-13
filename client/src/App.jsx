import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import AdminRoute from "./components/authComponents/AdminRoute";
import AdminPanel from "./components/AdminPanel";
import GoogleLogin from "./pages/GoogleLogin";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.status);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/google" element={<GoogleLogin />} />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />}
      />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default App;
