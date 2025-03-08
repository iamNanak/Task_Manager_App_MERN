import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/slice/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    // Remove token from localStorage or cookies
    localStorage.removeItem("authToken");

    // Dispatch logout action
    dispatch(logout());

    // Redirect to login
    navigate("/");
  };
  return (
    <>
      {/* Sidebar */}
      <aside className="fixed left-0 h-full w-64 bg-gray-800 text-white p-6 flex flex-col justify-between">
        {/* Logo and Navigation */}
        <div>
          {/* Logo or App Name */}
          <h2 className="text-2xl font-bold text-gray-100">Task Manager</h2>

          {/* Navigation Links */}
          <nav className="mt-8">
            <Link
              to="/"
              className="block py-3 px-4 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/task"
              className="block py-3 px-4 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              All Tasks
            </Link>
            <Link
              to="/settings"
              className="block py-3 px-4 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              Settings
            </Link>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="mt-auto p-4">
          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 z-10 relative"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
