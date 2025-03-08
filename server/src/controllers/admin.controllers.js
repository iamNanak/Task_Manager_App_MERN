import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.models.js";

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) return res.status(400).json({ message: "User not found" });

    return res.status(200).json({ message: "User deleted Successfully" });
  } catch (error) {
    console.log("Can't Delete User:", error.message);
    res.status(500).json({ message: "Cannot Delete User" });
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    console.log("admin Controller:", users);

    if (users.length === 0)
      return res.status(404).json({ message: "No users found" });

    return res.status(200).json(users);
  } catch (error) {
    console.log("Can't get All Users: ", error.message);
    return res.status(500).json({ message: "Cannot get users" });
  }
});

const adminControl = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (user) {
      user.isAdmin = Boolean(req.body.isAdmin);

      const updatedUser = await user.save();

      return res.status(200).json(updatedUser);
    }
  } catch {
    res.status(400).json({ message: "Can't update the user" });
  }
});

export { deleteUser, getAllUsers, adminControl };
