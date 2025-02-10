import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {
  const user = useSelector((state) => state.auth.createdUser);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "low",
    image: null,
    pdf: null,
  });

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setNewTask({ ...newTask, [e.target.name]: file });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a FormData object to send files and text fields

      const token = localStorage.getItem("authToken"); // Retrieve the token from local storage
      // console.log(token);
      if (!token || !user) {
        alert("You are not authorized. Please log in.");
        return;
      }
      const formData = new FormData();
      formData.append("title", newTask.title);
      formData.append("description", newTask.description);
      formData.append("priority", newTask.priority);
      formData.append("dueDate", newTask.dueDate);
      formData.append("status", newTask.status || "Pending");

      if (newTask.image) {
        formData.append("image", newTask.image);
      }
      if (newTask.pdf) {
        formData.append("pdf", newTask.pdf);
      }

      // Debugging: Print FormData
      // for (let pair of formData.entries()) {
      //   console.log(`${pair[0]}:`, pair[1]);
      // }

      // Send POST request to the backend
      const response = await axios.post(
        `${BASE_URL}/api/v1/task/create`, // Adjust URL if needed
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log("response:", response);

      console.log("Task Created Successfully:", response.data);
      setTasks([...tasks, response.data]); // Update task list dynamically
      // console.log(tasks);
      setIsFormOpen(false); // Close modal after submission
      // Reset the form state after submission
      setNewTask({
        title: "",
        description: "",
        priority: "low", // Default value
        dueDate: "",
        status: "Pending",
        image: null,
        pdf: null,
      });
      console.log(newTask);
      alert("Task created successfully!");
    } catch (error) {
      console.error(
        "Error creating task:",
        error.response?.data || error.message
      );
      alert("Failed to create task. Please try again.");
    }
  };

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

        {/* Task List */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          {tasks.map((task) => (
            <div key={task._id} className="bg-white p-4 shadow-md rounded-md">
              <h3 className="font-bold text-lg">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <p className="text-sm text-gray-500">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
              <p
                className={`text-sm font-semibold mt-2 ${
                  task.priority === "high"
                    ? "text-red-500"
                    : task.priority === "medium"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                Priority: {task.priority}
              </p>
            </div>
          ))}
        </div>

        {/* Add Task Button */}
        <div className="mt-6">
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-green-400 text-white px-6 py-5 rounded-lg font-semibold"
          >
            Add new Task
          </button>
        </div>
      </main>

      {isFormOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="title"
                className="w-full p-2 border rounded-md mb-2"
                placeholder="Title"
                value={newTask.title}
                onChange={handleChange}
              />
              <input
                type="textarea"
                name="description"
                placeholder="Description"
                value={newTask.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-md mb-2"
              />
              <input
                type="date"
                name="dueDate"
                value={newTask.dueDate}
                onChange={handleChange}
                className="w-full p-2 border rounded-md mb-2"
              />
              <select
                name="priority"
                value={newTask.priority}
                onChange={handleChange}
                className="w-full p-2 border rounded-md mb-2"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <select
                name="status"
                value={newTask.status}
                onChange={handleChange}
                className="w-full p-2 border rounded-md mb-2"
              >
                <option value="Pending">Pending</option>
                <option value="In progress">In progress</option>
                <option value="Completed">Completed</option>
              </select>

              <input
                type="file"
                name="image"
                accept="image/*"
                className="w-full p-2 border rounded-md mb-2"
                onChange={handleFileChange}
              />

              <input
                type="file"
                name="pdf"
                accept="application/pdf"
                className="w-full p-2 border rounded-md mb-2"
                onChange={handleFileChange}
              />

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
