import { Request, Response } from "express";
import { RegisterRequest } from "../interfaces/Request/RegisterRequest";
import { validationResult } from "express-validator";
import { LoginRequest } from "../interfaces/Request/LoginRequest";

import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../helpers/jwt_helper";
import bcrypt from "bcrypt";
import User from "../models/User.model";
import { responseHandler } from "../middlewares/handlers/responseHanlder";
import { IUser } from "../interfaces/IUser.interface";
import { RefreshTokenRequest } from "../interfaces/Request/RefreshTokenRequest";
import { setDataToRedis } from "../helpers/init_redis";
import redisKeyNames from "../common/rules";

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
        responseHandler<{}>(res, 400, "Logged in failed", {
          messageErr: "Invalid credentials",
        });
        return;
      }
      const accessToken = await createAccessToken(existingUser);
      const refreshToken = await createRefreshToken(existingUser);

      //Lưu Refresh Token vào cache.
      setDataToRedis(redisKeyNames.AUTH_REFRESH_TOKEN, refreshToken, 604800)
      responseHandler<{}>(res, 200, "Logged in successfully", {
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
      return;
      
    } else {
      responseHandler(res, 400, "Logged in failed", {
        messageErr: "Invalid credentials.",
      });
      return;
      
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    responseHandler(res, 500, "Logged in failed", {
      messageErr: "Server error",
    });
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
      responseHandler(res, 409, "Register failed", {
        messageErr: "User already exists.",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();

    const accessToken = await createAccessToken(newUser);
    const refreshToken = await createRefreshToken(newUser);

    //Lưu refreshToken vào cache
    setDataToRedis(redisKeyNames.AUTH_REFRESH_TOKEN, refreshToken, 604800)

    responseHandler<{}>(res, 201, "Registered successfully", {
      accessToken,
      refreshToken,
    });
    return;
  } catch (error) {
    console.error("Error registering user:", error);
    responseHandler(res, 500, "Register failed", {
      messageErr: "Server error",
    });
    return;
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
    return;
  }
  try {
    const { success, data, error } = verifyRefreshToken(refreshToken);
    if (!success) {
      responseHandler(res, 403, "Invalid refresh token", {
        messageErr: error,
      });
      return;
    }
    const existingUser = await User.findOne({ email: data!.email });
    if (!existingUser) {
      responseHandler(res, 403, "User not found", {
        messageErr: "No user found for the provided token",
      });
      return; 
    }

    const user = existingUser as IUser;

    const accessToken = await createAccessToken(user);
    const newRefreshToken = await createRefreshToken(user);

    responseHandler(res, 200, "Tokens refreshed successfully", {
      accessToken: accessToken,
      refreshToken: newRefreshToken,
    });
    return; 
  } catch (error) {
    console.error("Error refreshing token:", error);
    responseHandler(res, 403, "Invalid refresh token", {
      messageErr: "Refresh token verification failed",
    });
    return;
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  const exampleData = { message: "Hello, World!" };
  responseHandler(res, 200, "Data fetched successfully", exampleData);
  return;
  
};

export const getAllUser = async (req: Request, res: Response) => {
  const existingUser = await User.find();
  res.send(existingUser);
  return;
};
