import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const tasks = {
        id: nanoid(),
        text: action.payload.text,
        status: action.payload.status || "Pending",
        priority: action.payload.priority || "medium",
        dueDate: action.payload.dueDate
          ? new Date(action.payload.dueDate).toLocaleDateString()
          : null,
      };
      state.tasks.push(tasks);
    },

    removeTask: (state, action) => {
      state.tasks.tasks = state.tasks.tasks.filter(
        (task) => task._id !== action.payload
      );
    },

    updateTask: (state, action) => {
      const { id, title, description, status, priority, dueDate } =
        action.payload;
      const task = state.tasks.tasks.find((task) => task._id === id);

      if (task) {
        task.title = title !== undefined ? title : task.title;
        task.description =
          description !== undefined ? description : task.description;
        task.status = status !== undefined ? status : task.status;
        task.priority = priority !== undefined ? priority : task.priority;
        task.dueDate = dueDate !== undefined ? dueDate : task.dueDate;
        if (typeof image !== "undefined" && image !== null) {
          if (typeof image === "object" && image.url) {
            task.image = image; // assuming your task.image is an object
          } else if (typeof image === "string") {
            task.image = { url: image };
          }
        }
        if (typeof pdf !== "undefined" && pdf !== null) {
          if (typeof pdf === "object" && pdf.url) {
            task.pdf = pdf;
          } else if (typeof pdf === "string") {
            task.pdf = { url: pdf };
          }
        }
      }
    },

    setTasks: (state, action) => {
      state.tasks = action.payload; // Replace all tasks (useful for fetching from backend)
    },
  },
});

export const { addTask, removeTask, updateTask, setTasks } = taskSlice.actions;
export default taskSlice.reducer;
