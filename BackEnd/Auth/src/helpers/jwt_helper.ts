import { JwtPayload, sign, verify } from "jsonwebtoken";
import createError from "http-errors";
import { IUser } from "../interfaces/IUser.interface";
import { NextFunction, Request, Response } from "express";
import { IVerifyToken } from "../interfaces/IVerifyToken.interface";
import { IJWTPayload } from "../interfaces/IJWTPayload.interface";

const getAccessSecret = () => process.env.JWT_ACCESS_SECRET as string;
const getRefreshSecret = () => process.env.JWT_REFRESH_SECRET as string;

export const createAccessToken = async (user: IUser): Promise<string> => {
  const payload: IJWTPayload = {
    name: user.username,
    email: user.email,
    role: user.role,
  };

  const options = {
    expiresIn: "1h",
    audience: user.id,
  };

  return new Promise((resolve, reject) => {
    sign(payload, getAccessSecret(), options, (err, token) => {
      if (err) {
        return reject(createError(500, "Error signing token"));
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
    return {
      success: false,
      error: error instanceof Error ? error.message : "Invalid token",
    };
  }
};
