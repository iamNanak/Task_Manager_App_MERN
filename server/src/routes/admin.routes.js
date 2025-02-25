import { Router } from "express";

import { deleteUser, getAllUsers } from "../controllers/admin.controllers.js";
import { adminMiddleware, protect } from "../middlewares/auth.middleware.js";

const adminRouter = Router();

adminRouter.get(
  "/allUsers",
  protect,
  adminMiddleware,
  // (req, res) => {
  //   console.log("req.body from admin route", req.body);
  // },
  getAllUsers
);
adminRouter.delete("/deleteUser/:id", protect, adminMiddleware, deleteUser);

export default adminRouter;
