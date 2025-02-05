import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../store/slice/authSlice.js";
import taskReducer from "../store/slice/taskSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
  },
});

export default store;
