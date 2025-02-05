import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/slice/authSlice.js";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.createdUser);

  const handleLogout = () => {
    // Remove token from localStorage or cookies
    localStorage.removeItem("authToken");

    // Dispatch logout action
    dispatch(logout());

    // Redirect to login
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white py-4 shadow-md border-b-0">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link className="text-xl font-bold text-white" to="/">
          Zidio Task Manager
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-300">{user.email}</span>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="text-gray-300 hover:text-white transition"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                to="/register"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
