import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import mongoose from "mongoose";

// routes
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.use(json());

app.use("/api/users", userRoutes);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to DB");
  } catch (err) {
    console.error(err);
  }
};

app.listen(3000, () => {
  console.log("Listening on port 3000!!!!!!!!!");
});

start();
