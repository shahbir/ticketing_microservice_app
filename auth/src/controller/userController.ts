import express, { Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from "jsonwebtoken";

import { Password } from "../services/password";

// models
import { User } from "../models/users";

export const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError("Email already in use");
  }

  const user = User.build({ email, password });
  await user.save();

  // Generating JWT
  const userJwt = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_KEY!
  );

  // store it on session object
  req.session = {
    jwt: userJwt,
  };

  res.status(201).send(user);
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new BadRequestError("User does not exists");
  }

  const passwordMatch = await Password.compare(existingUser.password, password);

  if (!passwordMatch) {
    throw new BadRequestError("email or password is invalid");
  }

  // Generating JWT
  const userJwt = jwt.sign(
    { id: existingUser.id, email: existingUser.email },
    process.env.JWT_KEY!
  );

  // store it on session object
  req.session = {
    jwt: userJwt,
  };

  res.status(200).send(existingUser);
};

export const currentUser = async (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
};

export const signOut = async (req: Request, res: Response) => {
  req.session = null;
  res.send({});
};
