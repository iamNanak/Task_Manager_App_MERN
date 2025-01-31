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

const taskRouter = Router();

taskRouter.post("/task/create", protect, createTask);
taskRouter.delete("/task/:id", protect, deleteTask);
taskRouter.get("/task/:id", protect, getTask);
taskRouter.get("/all-tasks", protect, getTasks);
taskRouter.patch("/task/:id", protect, updateTask);

export default taskRouter;
