import { Router } from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
} from "../controllers/user.controllers.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/user", getUser);

export default router;
