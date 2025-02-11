import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const task = {
        id: nanoid(),
        text: action.payload.text,
        status: action.payload.status || "Pending",
        priority: action.payload.priority || "medium",
        dueDate: action.payload.dueDate
          ? new Date(action.payload.dueDate).toLocaleDateString()
          : null,
      };
      state.tasks.push(task);
    },

    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    updateTask: (state, action) => {
      const { id, text, status, priority, dueDate } = action.payload;
      const task = state.tasks.find((task) => task.id === id);

      if (task) {
        task.text = text !== undefined ? text : task.text;
        task.status = status !== undefined ? status : task.status;
        task.priority = priority !== undefined ? priority : task.priority;
        task.dueDate = dueDate !== undefined ? dueDate : task.dueDate;
      }
    },

    setTasks: (state, action) => {
      state.tasks = action.payload; // Replace all tasks (useful for fetching from backend)
    },
  },
});

export const { addTask, removeTask, updateTask, setTasks } = taskSlice.actions;
export default taskSlice.reducer;
