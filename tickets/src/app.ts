import express from "express";
import { json } from "body-parser";
import "express-async-errors";

import cookieSession from "cookie-session";

import {
  errorHandler,
  NotFoundError,
  currentUserMidd,
} from "@danishshafiq030/common";

// routes
import { TicketRouter } from "./routes/ticket";

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

app.use(currentUserMidd);
app.use(TicketRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
