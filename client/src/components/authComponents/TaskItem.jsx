import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeTask } from "../../store/slice/taskSlice";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TaskItem = ({ tasks, handleEdit }) => {
  // console.log("Tasks:", tasks);
  const dispatch = useDispatch();

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.delete(`${BASE_URL}/api/v1/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) dispatch(removeTask(taskId));
    } catch (error) {
      console.log("Error in deleting task:", error.message);
    }
  };

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks ? (
        tasks.tasks.map((task) => (
          // console.log("Task ID:", task._id),
          <div
            className="group relative duration-500 hover:-translate-y-2"
            key={task._id}
          >
            <div
              className={`relative rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 ${
                task.priority === "high"
                  ? "bg-red-300"
                  : task.priority === "medium"
                  ? "bg-yellow-300"
                  : "bg-green-300"
              }`}
            >
              <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => handleEdit(task)}
                  className="p-2 rounded-full bg-gray-50 hover:bg-blue-50 text-gray-500 hover:text-blue-500 transition-colors duration-200"
                >
                  <MdEdit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="p-2 rounded-full bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-500 transition-colors duration-200"
                >
                  <MdDelete className="w-5 h-5" />
                </button>
              </div>

              <h3 className="text-2xl text-center font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors duration-200">
                {task.title}
              </h3>

              <p className="text-gray-900 font-semibold text-sm mb-4 line-clamp-2">
                {task.description}
              </p>

              <div className="flex items-center text-sm text-black mb-4  p-2 rounded-md">
                <span className="mr-2">📅</span>
                <span className="font-medium">
                  {new Date(task.dueDate).toISOString().split("T")[0]}
                </span>
              </div>

              <div className="flex items-center text-sm mb-4">
                <span
                  className={`inline-block w-3 h-3 rounded-full border-black mr-2 transition-colors duration-200 ${
                    task.priority === "high"
                      ? "bg-red-700"
                      : task.priority === "medium"
                      ? "bg-yellow-700"
                      : "bg-green-700"
                  }`}
                />
                <span className="font-medium capitalize">
                  Priority: {task.priority}
                </span>
              </div>

              {/* Status Badge */}
              <div className="flex items-center text-sm mb-4">
                <span
                  className={`inline-block w-3 h-3 border-black rounded-full mr-2 transition-colors duration-200 ${
                    task.status === "Pending"
                      ? "bg-red-500"
                      : task.status === "In progress"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                />
                <span className="font-medium">{task.status}</span>
              </div>

              {task.image && (
                <div className="mt-4 rounded-md overflow-hidden bg-gray-50">
                  <img
                    src={task.image}
                    alt="Task Image"
                    className="w-full h-40 rounded-md object-cover transition-opacity duration-200 hover:opacity-90"
                  />
                </div>
              )}

              {task.pdf && (
                <div className="mt-4">
                  <a
                    href={task.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-md bg-gray-50 text-primary hover:bg-primary/5 transition-colors duration-200"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    View PDF
                  </a>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center col-span-full">
          No tasks available.
        </p>
      )}
    </div>
  );
};

export default TaskItem;
