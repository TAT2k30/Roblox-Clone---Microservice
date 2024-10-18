import { Request, Response } from "express";
import { RegisterRequest } from "../interfaces/Request/RegisterRequest";
import { validationResult } from "express-validator";
import { LoginRequest } from "../interfaces/Request/LoginRequest";

import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../helpers/jwt_helper";
import bcrypt = require("bcrypt");
import User from "../models/User.model";
import { responseHandler } from "../middlewares/handlers/responseHanlder";
import { IUser } from "../interfaces/IUser.interface";
import { RefreshTokenRequest } from "../interfaces/Request/RefreshTokenRequest";

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
      }
      const accessToken = await createAccessToken(existingUser);
      const refreshToken = await createRefreshToken(existingUser);

      responseHandler<{}>(res, 200, "Logged in successfully", {
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      responseHandler(res, 400, "Logged in failed", {
        messageErr: "Invalid credentials.",
      });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    responseHandler(res, 500, "Logged in failed", {
      messageErr: "Server error",
    });
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
      responseHandler(res, 500, "Register failed", {
        messageErr: "User already exists.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    const accessToken = await createAccessToken(newUser);
    const refreshToken = await createRefreshToken(newUser);

    responseHandler<{}>(res, 201, "Registered successfully", {
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    responseHandler(res, 500, "Register failed", {
      messageErr: "Server error",
    });
  }
};

export const refreshToken = async (
  req: Request<{}, {}, RefreshTokenRequest>,
  res: Response
): Promise<void> => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    responseHandler(res, 401, "Refresh token not found", {
      messageErr: "Refresh token not provided",
    });
  }

  try {
    // Xác thực refresh token
    const { success, data, error } = verifyRefreshToken(refreshToken);
    if (!success) {
      responseHandler(res, 403, "Invalid refresh token", {
        messageErr: error,
      });
    }

    // Tìm người dùng từ payload của refresh token
    const existingUser = await User.findOne({ email: data!.email });
    if (!existingUser) {
      responseHandler(res, 403, "User not found", {
        messageErr: "No user found for the provided token",
      });
    }

    // Đảm bảo existingUser là kiểu IUser
    const user = existingUser as IUser;

    // Tạo mới access token và refresh token
    const accessToken = await createAccessToken(user);
    const newRefreshToken = await createRefreshToken(user);

    // Trả về access token và refresh token mới
    responseHandler(res, 200, "Tokens refreshed successfully", {
      accessToken: accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.error("Error refreshing token:", error);
    responseHandler(res, 403, "Invalid refresh token", {
      messageErr: "Refresh token verification failed",
    });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  const exampleData = { message: "Hello, World!" };
  responseHandler(res, 200, "Data fetched successfully", exampleData);
};

export const getAllUser = async (req: Request, res: Response) => {
  const existingUser = await User.find();

  res.send(existingUser);
};
