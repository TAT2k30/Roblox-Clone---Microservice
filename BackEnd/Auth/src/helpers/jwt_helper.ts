import {
  JsonWebTokenError,
  JwtPayload,
  sign,
  TokenExpiredError,
  verify,
} from "jsonwebtoken";
import dotenv from "dotenv";
import createError from "http-errors";
import { IUser } from "../interfaces/IUser.interface";
import { IVerifyToken } from "../interfaces/IVerifyToken.interface";
import { IJWTPayload } from "../interfaces/IJWTPayload.interface";
dotenv.config();

const getAccessSecret = (): string => {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) throw new Error("JWT_ACCESS_SECRET is not defined");
  return secret;
};

const getRefreshSecret = (): string => {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) throw new Error("JWT_REFRESH_SECRET is not defined");
  return secret;
};

export const createAccessToken = async (user: IUser): Promise<string> => {
  const payload: IJWTPayload = {
    name: user.username,
    email: user.email,
    role: user.role,
  };

  const options = {
    expiresIn: "1d",
    audience: user.id,
  };

  return new Promise((resolve, reject) => {
    sign(payload, getAccessSecret(), options, (err, token) => {
      if (err) {
        return reject(createError(500, "Error signing access token"));
      }
      resolve(token as string);
    });
  });
};

export const verifyAccessToken = (token: string): IVerifyToken => {
  try {
    const decoded = verify(token, getAccessSecret()) as IJWTPayload;
    return { success: true, data: decoded };
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return {
        success: false,
        error: "Access token has expired",
      };
    } else if (error instanceof JsonWebTokenError) {
      return {
        success: false,
        error: "Invalid access token",
      };
    } else {
      return {
        success: false,
        error: "Access token verification failed",
      };
    }
  }
};

export const createRefreshToken = async (user: IUser): Promise<string> => {
  const payload: IJWTPayload = {
    name: user.username,
    email: user.email,
    role: user.role,
  };

  const options = {
    expiresIn: "1w",
    audience: user.id,
  };

  return new Promise((resolve, reject) => {
    sign(payload, getRefreshSecret(), options, (err, token) => {
      if (err) {
        return reject(createError(500, "Error signing refresh token"));
      }
      resolve(token as string);
    });
  });
};

export const verifyRefreshToken = (token: string): IVerifyToken => {
  try {
    const decoded = verify(token, getRefreshSecret()) as IJWTPayload;
    return { success: true, data: decoded };
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return {
        success: false,
        error: "Refresh token has expired",
      };
    } else if (error instanceof JsonWebTokenError) {
      return {
        success: false,
        error: "Invalid refresh token",
      };
    } else {
      return {
        success: false,
        error: "Refresh token verification failed",
      };
    }
  }
};
