// import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.createdUser);
  // console.log("Admin ROute", user);

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect unauthenticated users to login
  }

  if (!user.isAdmin) {
    return <Navigate to="/" replace />; // Redirect non-admins to home
  }

  return children;
};

export default AdminRoute;
