import { Request, Response } from "express";
import { RegisterRequest } from "../interfaces/Request/RegisterRequest";
import { validationResult } from "express-validator";
import { LoginRequest } from "../interfaces/Request/LoginRequest";

import { createAccessToken } from "../helpers/jwt_helper";
import bcrypt = require("bcrypt");
import User from "../models/User.model";

export const login = async (
  req: Request<{}, {}, LoginRequest>,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch) {
        res.status(400).json({ message: "Invalid credentials." });
        return;
      }
      const accessToken = await createAccessToken(existingUser);
      res.status(200).json({ accessToken });
      return;
    } else {
      res.status(400).json({ message: "Invalid credentials." });
      return;
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error" });
    return;
  }
};

export const register = async (
  req: Request<{}, {}, RegisterRequest>,
  res: Response
): Promise<void> => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists." });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    const accessToken = createAccessToken(newUser);

    res.status(201).json({ accessToken: accessToken });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  res.send("refresh token page");
};

export const logout = async (req: Request, res: Response) => {
  res.send("logout page");
};

export const getAllUser = async (req: Request, res: Response) => {
  const existingUser = await User.find();

  res.send(existingUser);
};
