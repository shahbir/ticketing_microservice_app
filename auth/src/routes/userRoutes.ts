import express from "express";
import { body } from "express-validator";
// controllers
import { SignUp } from "../controller/userController";

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
  SignUp
);

route.post("/signin", (req, res) => {
  res.send("hello from signin");
});

route.post("/signout", (req, res) => {
  res.send("hello from signout");
});

route.get("/currentuser", (req, res) => {
  res.send("hello from current user");
});

export default route;
