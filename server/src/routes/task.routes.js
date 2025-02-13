import { Router } from "express";
import {
  createTask,
  deleteTask,
  deleteAllTasks,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/tasks.controllers.js";
import { protect } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const taskRouter = Router();

taskRouter.post(
  "/task/create",
  protect,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "pdf",
      maxCount: 1,
    },
  ]),
  (req, res, next) => {
    console.log(" Received files:", req.files); // Debug
    console.log(" Received body:", req.body); // Debug
    if (!req.files) {
      console.error("No files received"); // Debug
    }
    next();
  },
  createTask
);
taskRouter.delete("/task/:id", protect, deleteTask);
taskRouter.get("/task/:id", protect, getTask);
taskRouter.get("/tasks", protect, getTasks);
taskRouter.put(
  "/task/:id",
  protect,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "pdf",
      maxCount: 1,
    },
  ]),
  updateTask
);

export default taskRouter;
