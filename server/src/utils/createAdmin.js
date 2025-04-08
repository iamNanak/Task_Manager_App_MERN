import User from "../models/user.models.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config({
  path: "../../.env",
});
console.log(process.env.MONGODB_URI);
export const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for admin creation");

    const admin = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: "Admin123",
      isAdmin: true,
    });

    await admin.save();
    console.log("Admin created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();
