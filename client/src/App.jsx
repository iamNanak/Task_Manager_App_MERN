import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard"; // Protected Page Examplea

function App() {
  const user = useSelector((state) => state.auth.status); // Get auth state from Redux
  console.log(user);
  return (
    <>
      {/* <Navbar /> */}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/dashboard" /> : <Register />}
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
