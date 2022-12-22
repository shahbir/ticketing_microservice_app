import express from "express";
import { body } from "express-validator";
// controllers
import {
  signUp,
  signIn,
  currentUser,
  signOut,
} from "../controller/userController";

// validation
import { validateRequest } from "../middlewares/validate-request";

// middleware
import { currentUserMidd } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";

const route = express.Router();

route.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 & 20 characters"),
  ],
  validateRequest,
  signUp
);

route.post(
  "/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 & 20 characters"),
  ],
  validateRequest,
  signIn
);

route.post("/signout", signOut);

route.get("/currentuser", currentUserMidd, requireAuth, currentUser);

export default route;
