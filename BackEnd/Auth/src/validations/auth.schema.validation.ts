import { NextFunction } from "express";
import { check, validationResult } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest";

var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

export const registerValidation = [
  check("username").not().isEmpty().withMessage("Username is required"),
  check("email").isEmail().withMessage("A valid email is required"),
  check("password")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be between 8 and 20 characters")
    .matches(passwordRegex)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
];

export const loginValidation = [
  check("email").isEmail().withMessage("A valid email is required"),
  check("password")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be between 8 and 20 characters")
    .matches(passwordRegex)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
];

export const refreshTokenValidation = [
  check("refreshToken")
    .not()
    .isEmpty()
    .withMessage("Refresh token is required"),
];
