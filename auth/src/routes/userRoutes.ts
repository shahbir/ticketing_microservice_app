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
import {
  validateRequest,
  // middleware
  currentUserMidd,
  requireAuth,
} from "@danishshafiq030/common";

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
