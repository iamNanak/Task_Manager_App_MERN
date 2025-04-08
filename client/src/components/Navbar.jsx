import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/slice/authSlice.js";
import { useState } from "react";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const verifiedUser = useSelector((state) => state.auth.createdUser);
  console.log(verifiedUser);

  const [isDropDown, setIsDropDown] = useState(false);

  const toggleDropdown = () => {
    setIsDropDown(!isDropDown);
  };
  const closeDropdown = () => {
    setIsDropDown(false);
  };

  const handleLogout = () => {
    // Remove token from localStorage or cookies
    localStorage.removeItem("authToken");

    // Dispatch logout action
    dispatch(logout());

    // Redirect to login
    navigate("/login");
  };
  const handleDashboard = () => {
    // Redirect to dasboard
    navigate("/dashboard");
  };

  return (
    <nav className="bg-white text-white py-4 shadow-md border-b-0">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex">
          <Link className="text-xl font-bold text-white" to="/">
            <img
              src="../public/logo.webp"
              alt="Logo"
              className="w-full h-12 text-white"
            />
            <p className="text-black text-end font-normal">Task Manager</p>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {verifiedUser?.isAdmin && (
            <Link
              to="/admin"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
            >
              Admin Panel
            </Link>
          )}
          {verifiedUser ? (
            <>
              {/* Dashboard and Logout buttons */}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                onClick={handleDashboard}
              >
                Dashboard
              </button>
              {/* Avatar and Dropdown */}
              <div className="relative">
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  {/* Avatar with the first letter of the user's name */}
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full text-white font-bold">
                    {verifiedUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-800">{verifiedUser.name}</span>
                </div>

                {/* Dropdown Menu */}
                {isDropDown && (
                  <div
                    className="absolute right-0 mt-2 w-20 bg-white rounded-lg shadow-lg z-10"
                    onMouseLeave={closeDropdown}
                  >
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Login and Register links */}
              <Link
                className="text-gray-900 hover:bg-green-500 transition border-black bg-green-400 px-4 py-2 rounded-full"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition"
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
