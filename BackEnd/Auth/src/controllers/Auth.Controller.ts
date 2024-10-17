import { Request, Response } from "express";
import { RegisterRequest } from "../interfaces/Request/RegisterRequest";
import { validationResult } from "express-validator";
import { LoginRequest } from "../interfaces/Request/LoginRequest";

const { signAccessToken } = require("../helpers/jwt_helper");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");

export const login = async (
  req: Request<{}, {}, LoginRequest>,
  res: Response
) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (bcrypt.hash(password, 10) !== existingUser.Password) {
        res.status(400).json({ message: "Invalid credentials." });
      }
    } else {
      res.status(400).json({ message: "Invalid credentials." });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
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
    const accessToken = signAccessToken(newUser.userId);

    res.status(201).json({ message: accessToken });
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
