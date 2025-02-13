import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { removeTask } from "../../store/slice/taskSlice";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TaskItem = ({ tasks, handleEdit }) => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.auth.createdUser);
  console.log("TaskItem:", tasks);
  // const user = useSelector((state) => state.auth.createdUser);

  const handleDelete = async (taskId) => {
    try {
      // console.log(taskId);
      const token = localStorage.getItem("authToken");
      // console.log(user._id);
      // console.log(token);
      const res = await axios.delete(`${BASE_URL}/api/v1/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response:", res);
      if (res.status === 200) dispatch(removeTask(taskId));
    } catch (error) {
      console.log("Error in deleting task:", error.message);
    }
  };

  // console.log("TaskItem:", tasks);
  return (
    <>
      {/* Task List */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks && tasks.tasks && tasks.tasks.length > 0 ? (
          tasks.tasks.map((task) => (
            <div
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 relative"
              key={task._id}
            >
              {/* Edit and Delete Icons */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="text-gray-500 hover:text-blue-500 transition-colors duration-200"
                >
                  <MdEdit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-gray-500 hover:text-red-500 transition-colors duration-200"
                >
                  <MdDelete className="w-5 h-5" />
                </button>
              </div>

              {/* Task Title */}
              <h3 className="font-bold text-xl text-gray-800 mb-2">
                {task.title}
              </h3>

              {/* Task Description */}
              <p className="text-gray-600 text-sm mb-4">{task.description}</p>

              {/* Due Date */}
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span className="mr-2">📅</span>
                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
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
                <span className="font-semibold">Priority: {task.priority}</span>
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

              {task.pdf && (
                <div className="mt-2">
                  <a
                    href={task.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View PDF
                  </a>
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
    </>
  );
};

export default TaskItem;
