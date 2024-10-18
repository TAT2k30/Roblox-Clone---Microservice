import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../helpers/jwt_helper";

export const isRoleAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "No token provided." });
    return;
  }

  const { success, data, error } = verifyAccessToken(token);

  if (!success) {
    res.status(401).json({ message: error });
    return;
  }
  if (data?.role !== "admin") {
    res.status(403).json({ message: "Access denied. Admin role required." });
    return;
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
    res.status(401).json({ message: "Unauthorized: Token not found" });
    return;
  }

  const { success, data, error } = verifyAccessToken(token);

  if (!success) {
    res.status(401).json({ message: +`Unauthorized: ${error}` });
    return;
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
    res.status(401).json({ message: "No token provided." });
    return;
  }

  const { success, data, error } = verifyAccessToken(token);

  if (!success) {
    res.status(401).json({ message: error });
    return;
  }
  if (data?.role !== "user") {
    res.status(403).json({ message: "Access denied. User role required." });
    return;
  }
  next();
};
