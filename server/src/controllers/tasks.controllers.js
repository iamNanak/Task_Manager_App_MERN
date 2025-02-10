import { asyncHandler } from "../utils/asyncHandler.js";
import TaskModel from "../models/tasks.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createTask = asyncHandler(async (req, res) => {
  try {
    // console.log("User in createTask: ", req.user);
    const userId = req.user._id;
    // console.log("userId:", userId);
    const { title, description, dueDate, status, priority } = req.body;

    if ([title, description].some((field) => field?.trim() === "")) {
      return res.status(400).json({ message: "Please fill all details!" });
    }

    // console.log("req.files:", req.files.image);
    // console.log("req.body:", req.body);

    const imageFile = req.files["image"] ? req.files["image"][0].path : null;
    const pdfFile = req.files["pdf"] ? req.files["pdf"][0].path : null;

    // console.log("Image Path:", imageFile);
    // console.log("PDF Path:", pdfFile);

    const image = await uploadOnCloudinary(imageFile);
    // console.log("cloudinary link:", image);
    const pdf = await uploadOnCloudinary(pdfFile);

    const task = new TaskModel({
      title,
      description,
      dueDate,
      priority,
      status,
      image: image?.url || "",
      pdf: pdf?.url || "",
      user: userId,
    });
    console.log(task);

    await task.save();

    res.status(201).json(task);
  } catch (error) {
    console.log("Error in createTask: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

const getTasks = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      res.status(400).json({ message: "User not found!" });
    }

    const tasks = await TaskModel.find({ user: userId });

    res.status(200).json({
      length: tasks.length,
      tasks,
    });
  } catch (error) {
    console.log("Error in getTasks: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

const getTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Please provide a task id" });
    }

    const task = await TaskModel.findById(id);

    if (!task) {
      res.status(404).json({ message: "Task not found!" });
    }

    if (!task.user.equals(userId)) {
      res.status(401).json({ message: "Not authorized!" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.log("Error in getTask: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

const updateTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const { id } = req.params;
    const { title, description, dueDate, priority, status, completed } =
      req.body;

    if (!id) {
      res.status(400).json({ message: "Please provide a task id" });
    }

    const task = await TaskModel.findById(id);

    if (!task) {
      res.status(404).json({ message: "Task not found!" });
    }

    // check if the user is the owner of the task
    if (!task.user.equals(userId)) {
      res.status(401).json({ message: "Not authorized!" });
    }

    // update the task with the new data if provided or keep the old data
    Object.assign(task, {
      title,
      description,
      dueDate,
      priority,
      status,
      completed,
    });

    await task.save();

    return res.status(200).json(task);
  } catch (error) {
    console.log("Error in updateTask: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const task = await TaskModel.findById(id);

    if (!task) {
      res.status(404).json({ message: "Task not found!" });
    }

    // check if the user is the owner of the task
    if (!task.user.equals(userId)) {
      res.status(401).json({ message: "Not authorized!" });
    }

    await TaskModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    console.log("Error in deleteTask: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

const deleteAllTasks = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const tasks = await TaskModel.find({ user: userId });

    if (!tasks) {
      res.status(404).json({ message: "No tasks found!" });
    }

    // check if the user is the owner of the task
    if (!tasks.user.equals(userId)) {
      res.status(401).json({ message: "Not authorized!" });
    }

    await TaskModel.deleteMany({ user: userId });

    return res.status(200).json({ message: "All tasks deleted successfully!" });
  } catch (error) {
    console.log("Error in deleteAllTasks: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

export {
  createTask,
  getTask,
  getTasks,
  updateTask,
  deleteAllTasks,
  deleteTask,
};
