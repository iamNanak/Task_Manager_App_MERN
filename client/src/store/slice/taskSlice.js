import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  length: 0,
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      state.length += 1;
    },

    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      state.length = state.tasks.length;
    },

    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload._id
      );
      if (index !== -1) {
        // Preserve existing fields while updating
        state.tasks[index] = {
          ...state.tasks[index],
          ...action.payload,
        };
      }
    },

    setTasks: (state, action) => {
      state.tasks = action.payload.tasks; // Replace all tasks (useful for fetching from backend)
      state.length = action.payload.length;
    },
  },
});

export const { addTask, removeTask, updateTask, setTasks } = taskSlice.actions;
export default taskSlice.reducer;
