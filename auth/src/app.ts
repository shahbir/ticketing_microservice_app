import express from "express";
import { json } from "body-parser";
import "express-async-errors";

import cookieSession from "cookie-session";

// routes
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    // NODE_ENV === "test" ? false : true
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use("/api/users", userRoutes);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
