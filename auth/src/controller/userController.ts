import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { BadRequestError } from "../errors/bad-request-error";

// models
import { User } from "../models/users";

export const SignUp = async (req: Request, res: Response) => {
  // validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  // controller logic part
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError("Email already in use");
  }

  const user = User.build({ email, password });
  await user.save();

  res.status(201).send(user);
};
