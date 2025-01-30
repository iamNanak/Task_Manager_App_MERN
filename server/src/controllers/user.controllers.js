import { asyncHandler } from "../../utils/asyncHandler.js";
import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//use user id to generate token
const generateToken = (id) => {
  // token must be returned to the client
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => field?.trim() === "")) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be atleast 6 characters" });
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = generateToken(user._id);

  const options = {
    path: "/",
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  };

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    return res.status(400).json({ message: "Invalid User Data" });
  }

  res.status(200).cookie("token", token, options).json({ createdUser, token });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // check if user exists
  const userExists = await User.findOne({ email });

  if (!userExists) {
    return res.status(404).json({ message: "User not found, sign up!" });
  }

  // check id the password match the hashed password in the database
  const isMatch = await bcrypt.compare(password, userExists.password);

  if (!isMatch) {
    // 400 Bad Request
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = generateToken(userExists._id);

  const options = {
    path: "/",
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  };

  if (userExists && isMatch) {
    const verifiedUser = await User.findById(userExists._id).select(
      "-password"
    );
    return res
      .status(200)
      .cookie("token", token, options)
      .json({ verifiedUser, token });
  } else {
    res.status(400).json({ message: "Invalid email or password" });
  }
});

// logout user
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
  });

  return res.status(200).json({ message: "User logged out" });
});

export { registerUser, loginUser, logoutUser };
