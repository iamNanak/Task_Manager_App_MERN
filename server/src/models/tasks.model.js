import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },

    description: {
      type: String,
      default: "No description",
    },

    dueDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["Pending", "In progress", "Completed"],
      default: "Pending",
    },

    completed: {
      type: Boolean,
      default: false,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },

    image: {
      type: String,
    },

    pdf: {
      type: String,
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("Task", TaskSchema);

export default TaskModel;
