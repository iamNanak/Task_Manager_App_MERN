import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold">Task Manager</h2>
          <nav className="mt-6">
            <Link to="/dashboard" className="block py-2 text-lg">
              Dashboard
            </Link>
            <Link to="/tasks" className="block py-2 text-lg">
              My Tasks
            </Link>
            <Link to="/settings" className="block py-2 text-lg">
              Settings
            </Link>
          </nav>
        </div>
        <div>
          <button className="mt-6 w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Welcome Back!</h1>
        <p className="text-gray-600">Here's an overview of your tasks.</p>

        {/* Task Overview */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">Pending Tasks</h3>
            <p className="text-gray-500">4 tasks remaining</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">Completed Tasks</h3>
            <p className="text-gray-500">10 tasks done</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">AI Time Estimate</h3>
            <p className="text-gray-500">5 hrs estimated</p>
          </div>
        </div>

        {/* Add Task Button */}
        <div className="mt-6">
          <Link
            to="/add-task"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            + Add New Task
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
