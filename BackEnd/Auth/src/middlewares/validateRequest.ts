// validateRequest.js
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import createError from "http-errors";
import { responseHandler } from "./handlers/responseHanlder";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    responseHandler(res, 400, "Validation errors", {
      errors: errors.array(),
    });
    return;
  }
  next();
};
