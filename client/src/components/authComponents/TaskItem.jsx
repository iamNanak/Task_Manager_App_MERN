import { edit, star, trash } from "@/utils/Icons";
import { formatTime } from "@/utils/utilities";
import { motion } from "framer-motion";
import { item } from "@/utils/animations";

function TaskItem({ task }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-red-500";
      case "In progress":
        return "text-yellow-500";
      case "Completed":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <motion.div
      className="bg-white p-5 shadow-lg rounded-lg border border-gray-200 flex flex-col gap-3 transition-transform transform hover:scale-105"
      variants={item}
    >
      <h3 className="font-bold text-xl text-gray-800">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <p className="text-sm text-gray-500">Due: {formatTime(task.dueDate)}</p>
      <p className={`text-sm font-semibold ${getPriorityColor(task.priority)}`}>
        Priority: {task.priority}
      </p>
      <p className={`text-sm font-semibold ${getStatusColor(task.status)}`}>
        Status: {task.status}
      </p>
      {task.image && (
        <div className="mt-3">
          <img
            src={task.image}
            alt="Task"
            className="w-full h-40 rounded-md object-cover border border-gray-300"
          />
        </div>
      )}
      <div className="mt-auto flex justify-between items-center">
        <p className="text-sm text-gray-400">{formatTime(task.createdAt)}</p>
        <div className="flex items-center gap-3 text-gray-400 text-lg">
          <button
            className={`transition-colors duration-200 hover:text-yellow-500 ${
              task.completed ? "text-yellow-400" : "text-gray-400"
            }`}
          >
            {star}
          </button>
          <button
            className="text-blue-500 hover:text-blue-600"
            onClick={() => {
              getTask(task._id);
              openModalForEdit(task);
            }}
          >
            {edit}
          </button>
          <button
            className="text-red-500 hover:text-red-600"
            onClick={() => deleteTask(task._id)}
          >
            {trash}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default TaskItem;
