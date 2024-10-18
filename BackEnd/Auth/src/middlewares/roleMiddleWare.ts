import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../helpers/jwt_helper";
import createError from "http-errors";

export const isRoleAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return next(createError(403, "Access denied. No token found."));
  }
  const { success, data, error } = verifyAccessToken(token);
  if (!success) {
    return next(createError(401, { error }));
  }
  if (data?.role !== "admin") {
    return next(createError(403, "Access denied. Admin role required."));
  }
  next();
};

export const isRoleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return next(createError(401, "Access denied. No token provided."));
  }

  const { success, data, error } = verifyAccessToken(token);

  if (!success) {
    return next(createError(401, { error }));
  }
  if (data?.role !== "user") {
    return next(createError(403, "Access denied. User role required."));
  }
  next();
};

export const authenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return next(createError(401, "Unauthorized: Token not found"));
  }
  const { success, data, error } = verifyAccessToken(token);

  if (!success) {
    if (error === "Token has expired") {
      return next(createError(401, "Unauthorized: Token has expired"));
    } else if (error === "Invalid token") {
      return next(createError(401, "Unauthorized: Invalid token"));
    } else {
      return next(createError(401, `Unauthorized: ${error}`));
    }
  }
  next();
};
