import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("createdUser")) || null;

const initialState = {
  status: !!storedUser,
  createdUser: storedUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    login: (state, action) => {
      state.status = true;
      state.createdUser = action.payload.verifiedUser;
      localStorage.setItem(
        "createdUser",
        JSON.stringify(action.payload.verifiedUser)
      );
    },
    logout: (state) => {
      state.status = false;
      state.createdUser = null;
      localStorage.removeItem("createdUser");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
