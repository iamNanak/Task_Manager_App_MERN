import dotenv from "dotenv";
import express from "express";
import connectDB from "./src/db/connect.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// app.get("/", (req, res) => {
//   res.send("Server is ready!");
// });

// TODO: have to change the core origin
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import router from "./src/routes/user.routes.js";
import taskRouter from "./src/routes/task.routes.js";

app.use("/api/v1", router);
app.use("/api/v1", taskRouter);

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR: ", error);
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at the port: ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log(`MONGODB connection failed!!`, err);
  });
