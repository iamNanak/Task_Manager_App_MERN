import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setTasks } from "../store/slice/taskSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slice/authSlice";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.createdUser);
  const tasks = useSelector((state) => state.task.tasks);
  console.log("tasks :", tasks);
  const dispatch = useDispatch();
  const [isFormOpen, setIsFormOpen] = useState(false);
  // const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "low",
    image: null,
    pdf: null,
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get(`${BASE_URL}/api/v1/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setTasks(res.data));
      } catch (error) {
        console.log("Error in fetching the tasks: ", error);
      }
    };

    if (user?._id) {
      fetchTask();
    }
  }, [user, dispatch]);

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setNewTask({ ...newTask, [e.target.name]: file });
  };

  const logoutHandler = () => {
    // Remove token from localStorage or cookies
    localStorage.removeItem("authToken");

    // Dispatch logout action
    dispatch(logout());

    // Redirect to login
    navigate("/");
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
      const res = await axios.get(`${BASE_URL}/api/v1/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setTasks(res.data));
      console.log(tasks);
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
      <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col justify-between ">
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

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-sm">
          {/* Welcome Message */}
          <div className="m-2">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome Back, {user.name}! 👋
            </h1>
            <p className="text-gray-600 mt-2">
              Here's an overview of your tasks.
            </p>
          </div>

          {/* Add Task Button */}
          <div className="flex justify-center items-center">
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-gradient-to-r from-green-400 to-blue-400 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center"
            >
              <span className="mr-2">➕</span> Add New Task
            </button>
          </div>
        </div>
        {/* Task Overview */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">Pending Tasks</h3>
            <p className="text-gray-500">
              {tasks && tasks.tasks && tasks.tasks.length > 0
                ? tasks.tasks.filter((task) => task.status == "Pending").length
                : 0}{" "}
              tasks remaining
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">Completed Tasks</h3>
            <p className="text-gray-500">
              {" "}
              {tasks && tasks.tasks && tasks.tasks.length > 0
                ? tasks.tasks.filter((task) => task.status == "Completed")
                    .length
                : 0}{" "}
              tasks done
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">AI Time Estimate</h3>
            <p className="text-gray-500">5 hrs estimated</p>
          </div>
        </div>

        {/* Task List */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks && tasks.tasks && tasks.tasks.length > 0 ? (
            tasks.tasks.map((task) => (
              <div
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                key={task._id}
              >
                {/* Task Title */}
                <h3 className="font-bold text-xl text-gray-800 mb-2">
                  {task.title}
                </h3>

                {/* Task Description */}
                <p className="text-gray-600 text-sm mb-4">{task.description}</p>

                {/* Due Date */}
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="mr-2">📅</span>
                  <span>
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>

                {/* Priority */}
                <div className="flex items-center text-sm mb-4">
                  <span
                    className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      task.priority === "high"
                        ? "bg-red-500"
                        : task.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  ></span>
                  <span className="font-semibold">
                    Priority: {task.priority}
                  </span>
                </div>

                {/* Status */}
                <div className="flex items-center text-sm mb-4">
                  <span
                    className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      task.status === "Pending"
                        ? "bg-red-500"
                        : task.status === "In progress"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  ></span>
                  <span className="font-semibold">Status: {task.status}</span>
                </div>

                {/* Image Preview */}
                {task.image && (
                  <div className="mt-4">
                    <img
                      src={task.image}
                      alt="Task Image"
                      className="w-full h-40 rounded-md object-cover shadow-sm"
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No tasks available.
            </p>
          )}
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
